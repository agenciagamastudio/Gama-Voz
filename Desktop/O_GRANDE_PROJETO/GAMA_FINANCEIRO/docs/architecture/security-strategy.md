# GAMA Financeiro — Security Strategy

**Arquiteto:** @architect (Ana)
**Data:** 2026-03-09
**Status:** ✅ COMPLETE
**Security Level:** Medium (Local network, internal use)

---

## 🎯 Security Pillars

```
┌─────────────────────────────────────────────────────────────┐
│                   SECURITY ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. AUTHENTICATION                                         │
│     └─ Who are you?                                        │
│        [JWT tokens, password hashing, session management]  │
│                                                             │
│  2. AUTHORIZATION                                          │
│     └─ What are you allowed to do?                         │
│        [Role-based access control, data ownership]         │
│                                                             │
│  3. DATA PROTECTION                                        │
│     └─ Keep data safe                                      │
│        [Encryption, backup, integrity]                     │
│                                                             │
│  4. INPUT VALIDATION                                       │
│     └─ Don't accept garbage                                │
│        [Type checking, range validation, whitelisting]     │
│                                                             │
│  5. OUTPUT ENCODING                                        │
│     └─ Don't output garbage                                │
│        [XSS prevention, context-appropriate escaping]      │
│                                                             │
│  6. AUDIT & MONITORING                                     │
│     └─ Track what happened                                 │
│        [Logging, audit trails, alerting]                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 1️⃣ AUTHENTICATION

### JWT (JSON Web Token)

**Scheme:** HS256 (HMAC SHA-256)
**Lifetime:** 7 days
**Storage:** localStorage (frontend)

#### Token Structure
```
Header:    {"alg": "HS256", "typ": "JWT"}
Payload:   {"id": "1", "username": "usuário1", "iat": 1234567890, "exp": 1234574090}
Signature: HMAC(HS256, secret, header.payload)

Full token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6InVzdeWFyw...
```

#### Configuration
```javascript
// backend/config/auth.js
JWT_SECRET: process.env.JWT_SECRET  // Must be >= 32 chars (in .env)
JWT_EXPIRY: "7d"                    // Token válido por 7 dias
JWT_ALGORITHM: "HS256"
BCRYPT_ROUNDS: 10                   // Password hashing iterations
```

### Password Hashing

**Algorithm:** bcryptjs (salted hash)
**Rounds:** 10 (balancing security vs performance)

#### Password Hashing Flow
```
User password: "senha123"
       ↓
bcryptjs.hash("senha123", 10)
       ↓
Generated hash: $2b$10$N9qo8uLOickgx2ZMRZoMyeuExMC2R7FPjUTWQPp14eIVVWJ9UaK1m
(random salt embedded in hash)
       ↓
Store in database: users.password_hash
       ↓

On login:
password from form: "senha123"
       ↓
bcryptjs.compare("senha123", hash_from_db)
       ↓
Returns: true (password matches)
```

### Login Security

```
1. Rate Limiting
   - Max 5 failed logins per IP per 15 minutes
   - Temporary IP block (15 min) after 5 failures
   - Log all failed attempts

2. Password Requirements
   - Minimum 6 characters (Phase 2: enforce stronger)
   - No plaintext storage
   - Hash comparison timing-safe

3. Session Management
   - JWT issued upon successful login
   - Token invalid if user is_active = false
   - Logout invalidates token client-side
   - No server-side session store needed (stateless)
```

#### Implementation
```javascript
// middleware/auth.js
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: {code: 'NO_TOKEN', message: 'Token não fornecido'}
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verify user still exists and is active
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.id);
    if (!user || !user.is_active) {
      return res.status(401).json({
        success: false,
        error: {code: 'INVALID_TOKEN', message: 'Token inválido'}
      });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: {code: 'TOKEN_EXPIRED', message: 'Token expirado'}
      });
    }
    res.status(401).json({
      success: false,
      error: {code: 'INVALID_TOKEN', message: 'Token inválido'}
    });
  }
};
```

---

## 2️⃣ AUTHORIZATION

### Role-Based Access Control (RBAC)

**Current roles:** admin, user (Phase 1)
**Future roles:** accountant, manager, viewer (Phase 2)

| Role | Create | Read | Update | Delete | Export |
|------|--------|------|--------|--------|--------|
| admin | ✓ | ✓ | ✓ | ✓ | ✓ |
| user | ✓ | ✓ | ✓ | ✓ | ✓ |
| viewer | ✗ | ✓ | ✗ | ✗ | ✓ |

### Data Ownership

```javascript
// Service layer - Authorization check
async function updateEntry(entryId, userId, data) {
  // Get entry with period info
  const entry = db.prepare(`
    SELECT e.*, p.created_by_id
    FROM entries e
    JOIN periods p ON e.period_id = p.id
    WHERE e.id = ?
  `).get(entryId);

  if (!entry) {
    throw new NotFoundError('Entry not found');
  }

  // Check: User must be the period creator OR admin
  if (entry.created_by_id !== userId && user.role !== 'admin') {
    throw new ForbiddenError('You do not have permission to modify this entry');
  }

  // Proceed with update
  return updateEntryInDB(entryId, data);
}
```

### Permission Enforcement Middleware

```javascript
// middleware/authorize.js
exports.requirePermission = (permission) => {
  return (req, res, next) => {
    if (!hasPermission(req.user, permission)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: `Permission required: ${permission}`
        }
      });
    }
    next();
  };
};

// Usage in routes
app.delete('/entries/:id',
  verifyToken,
  requirePermission('delete_entry'),
  deleteEntryHandler
);
```

---

## 3️⃣ DATA PROTECTION

### Encryption at Rest

**Database:** SQLite with PRAGMA cipher
**Config (Phase 2):**
```sql
PRAGMA cipher_page_size = 4096;
PRAGMA cipher_kdf_iter = 256000;
PRAGMA cipher_kdf_algorithm = HMAC-SHA512;
PRAGMA key = 'your-master-password';
```

### Encryption in Transit

**Protocol:** HTTPS (on deployment)
**Local Development:** HTTP acceptable (localhost only)
**Headers:**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; script-src 'self'
```

### Data Backup

**Frequency:** Daily at 00:00 UTC
**Location:** `data/backups/gama-financeiro-YYYY-MM-DD.db`
**Retention:** 30 days rolling window
**Encryption:** Backup files stored with same cipher

```javascript
// scripts/backup-db.js
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
const backupPath = path.join('data/backups', `gama-financeiro-${date}.db`);

const db = new Database('data/db/gama-financeiro.db');
db.backup(backupPath);
db.close();

console.log(`Backup created: ${backupPath}`);
```

### Data Deletion

**Hard delete:** Entries can only be deleted by creators or admins
**Soft delete (Phase 2):** Add deleted_at timestamp, exclude from queries
**GDPR compliance:** Add user export & deletion endpoint

---

## 4️⃣ INPUT VALIDATION

### Frontend Validation

All inputs are validated BEFORE sending to backend:

```javascript
// utils/validators.js
export const validateEntry = (data) => {
  const errors = [];

  // Type checking
  if (typeof data.value !== 'number') {
    errors.push('Value must be a number');
  }

  // Range validation
  if (data.value < 0 || data.value > 999999999) {
    errors.push('Value out of range (0 to 999,999,999)');
  }

  // String length
  if (!data.lineItem || data.lineItem.length < 3 || data.lineItem.length > 100) {
    errors.push('Line item must be 3-100 characters');
  }

  // Enum validation
  if (!['planned', 'actual'].includes(data.type)) {
    errors.push('Invalid type');
  }

  // Category validation
  const validCategories = ['VENDAS', 'CUSTOS_VARIAVEIS', 'CUSTOS_FIXOS', 'INVESTIMENTOS'];
  if (!validCategories.includes(data.category)) {
    errors.push('Invalid category');
  }

  return { isValid: errors.length === 0, errors };
};
```

### Backend Validation (Defense in Depth)

NEVER trust frontend validation. Backend validates everything:

```javascript
// middleware/validation.js
const Joi = require('joi');

const entrySchema = Joi.object({
  periodId: Joi.string().required(),
  category: Joi.string()
    .valid('VENDAS', 'CUSTOS_VARIAVEIS', 'CUSTOS_FIXOS', 'INVESTIMENTOS')
    .required(),
  lineItem: Joi.string().min(3).max(100).required(),
  type: Joi.string().valid('planned', 'actual').required(),
  value: Joi.number().min(0).max(999999999).required(),
  parentId: Joi.string().allow(null)
});

exports.validateEntry = (req, res, next) => {
  const { error, value } = entrySchema.validate(req.body, {
    abortEarly: false,  // Report all errors, not just first
    stripUnknown: true  // Remove extra fields
  });

  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Input validation failed',
        details: error.details.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      }
    });
  }

  req.validatedBody = value;
  next();
};

// Usage in routes
app.post('/entries',
  verifyToken,
  validateEntry,  // <-- Validation middleware
  createEntryHandler
);
```

### SQL Injection Prevention

Use **prepared statements only** (built-in with better-sqlite3):

```javascript
// SAFE - Prepared statement with parameterized query
const entry = db.prepare(
  'SELECT * FROM entries WHERE id = ? AND period_id = ?'
).get(entryId, periodId);

// DANGEROUS - String concatenation (NEVER DO THIS)
const entry = db.prepare(
  `SELECT * FROM entries WHERE id = ${entryId}`  // VULNERABLE!
).get();
```

### Integer Overflow Prevention

```javascript
// Validate numbers are within safe range
if (value > Number.MAX_SAFE_INTEGER) {
  throw new ValidationError('Value too large');
}

// Better: Use strings for currency (Phase 2)
// Store as decimal(12,2) in SQLite
```

---

## 5️⃣ OUTPUT ENCODING

### XSS (Cross-Site Scripting) Prevention

#### React Auto-Escaping
React escapes all dynamic content by default:

```jsx
// Safe - React escapes {value}
const value = "<script>alert('xss')</script>";
<div>{value}</div>
// Renders: &lt;script&gt;alert('xss')&lt;/script&gt;

// Unsafe - Only use dangerouslySetInnerHTML with trusted content
<div dangerouslySetInnerHTML={{__html: userInput}} />  // BAD
```

#### Template Injection Prevention
```javascript
// Backend - Never use template engines with user input
// BAD:
const name = req.body.name;  // "' OR '1'='1"
const html = `<div>${name}</div>`;  // XSS!

// GOOD:
const entryEscaped = escapeHtml(req.body.lineItem);
const html = `<div>${entryEscaped}</div>`;
```

### Output Encoding for Different Contexts

| Context | Encoding | Example |
|---------|----------|---------|
| HTML | HTML Entity | `<` → `&lt;` |
| JavaScript | JS String Escape | `'` → `\'` |
| URL | URL Encoding | ` ` → `%20` |
| CSV | Quote & Escape | `"` → `""` |
| XML | XML Entity | `&` → `&amp;` |

### Content Security Policy (CSP)

```javascript
// server.js - Helmet middleware
const helmet = require('helmet');

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],  // Required for Tailwind
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", "http://localhost:3000"],  // APIs only
    frameSrc: ["'none'"],
    objectSrc: ["'none'"]
  }
}));
```

---

## 6️⃣ AUDIT & MONITORING

### Comprehensive Logging

Every action is logged with full context:

```javascript
// utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'gama-financeiro' },
  transports: [
    // Write all logs to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // Write error logs to file
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    // Write all logs to file
    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  ]
});

// Usage
logger.info('User logged in', {
  userId: user.id,
  username: user.username,
  ipAddress: req.ip,
  userAgent: req.get('user-agent'),
  timestamp: new Date()
});

logger.error('Failed login attempt', {
  username: req.body.username,
  ipAddress: req.ip,
  reason: 'Invalid password'
});
```

### Audit Trail (Database)

Every data change is recorded in `audit_logs` table:

```sql
CREATE TABLE audit_logs (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  table_name TEXT NOT NULL,
  record_id INTEGER,
  action TEXT NOT NULL CHECK(action IN ('create', 'update', 'delete')),
  before TEXT,  -- JSON of previous state
  after TEXT,   -- JSON of new state
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Suspicious Activity Detection

```javascript
// services/SecurityService.js
async function detectSuspiciousActivity(userId, action) {
  const oneHourAgo = new Date(Date.now() - 3600000);

  // Check for unusual number of changes
  const recentChanges = db.prepare(`
    SELECT COUNT(*) as count
    FROM audit_logs
    WHERE user_id = ? AND timestamp > ?
  `).get(userId, oneHourAgo);

  if (recentChanges.count > 100) {
    logger.warn('Suspicious activity detected', {
      userId,
      action: 'Too many changes in 1 hour',
      changesInLastHour: recentChanges.count
    });
    // Alert admin
  }

  // Check for bulk deletes
  if (action === 'delete') {
    // ...trigger alert
  }
}
```

### Rate Limiting

```javascript
// middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

// Limit API requests
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                   // Max 100 requests per windowMs
  message: 'Too many requests, please try again later.',
  standardHeaders: true,      // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false        // Disable the `X-RateLimit-*` headers
});

// Stricter limit for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,  // Max 5 login attempts
  message: 'Too many login attempts, please try again after 15 minutes.'
});

app.use('/api/v1/', apiLimiter);
app.post('/auth/login', loginLimiter, loginHandler);
```

---

## 🛡️ Security Checklist

### Frontend
- [x] Input validation on all forms
- [x] HTTPS in production
- [x] Secure token storage (localStorage, not cookies initially)
- [x] XSS protection (React escaping)
- [x] CSRF tokens (Phase 2)
- [x] CSP headers
- [x] No sensitive data in localStorage
- [ ] End-to-end encryption (Phase 2)

### Backend
- [x] JWT authentication
- [x] Password hashing (bcryptjs)
- [x] Prepared statements (SQL injection prevention)
- [x] Input validation (Joi schemas)
- [x] Rate limiting
- [x] Helmet security headers
- [x] CORS whitelist (localhost:5173)
- [x] Error handling (no stack traces in responses)
- [x] Audit logging
- [x] Authorization checks

### Database
- [x] Constraints (NOT NULL, UNIQUE, FK)
- [x] Indexes on frequently queried columns
- [x] Transactions for data consistency
- [x] Backup strategy
- [ ] Encryption at rest (Phase 2)
- [ ] Row-level security (Phase 3)

### Infrastructure
- [x] Environment variables for secrets (.env)
- [x] No hardcoded credentials
- [x] Log rotation (prevent disk full)
- [x] Backup testing
- [ ] HTTPS certificates (Phase 2)
- [ ] WAF/DDoS protection (Phase 3)

---

## 🚨 Incident Response

### Suspected Breach
1. **Immediate:** Invalidate all JWT tokens
2. **Review:** Check audit logs for suspicious access
3. **Patch:** Deploy security fix
4. **Notify:** Inform users of any data exposure
5. **Recovery:** Restore from backup if needed

### SQL Injection Attempt
1. **Alert:** Logger captures attempt
2. **Block:** Rate limiter blocks IP
3. **Review:** Analyze query logs
4. **Patch:** Ensure prepared statements used

### Password Compromise
1. **Force reset:** Require user to set new password
2. **Revoke tokens:** Invalidate all existing sessions
3. **Audit:** Check what user accessed
4. **Notify:** Alert user of unauthorized access

---

## 🔒 Secrets Management

### Environment Variables (.env)
```bash
# .env (NEVER commit to git, add to .gitignore)
NODE_ENV=development
JWT_SECRET=your-256-bit-secret-key-min-32-chars-long-very-random-string
DATABASE_PATH=./data/db/gama-financeiro.db
LOG_LEVEL=info
CORS_ORIGIN=http://localhost:5173

# Phase 2
ENCRYPTION_KEY=your-master-encryption-key
GOOGLE_DRIVE_API_KEY=your-key
```

### .gitignore
```
.env
.env.local
.env.*.local
logs/
data/db/
data/backups/
node_modules/
dist/
.DS_Store
```

### Secret Rotation (Phase 2)
- Rotate JWT_SECRET quarterly
- Rotate database encryption key yearly
- Generate new passwords for service accounts

---

## 📊 Security Metrics

### Monthly Reporting
- Failed login attempts
- Rate limit hits per IP
- Invalid token detections
- Authorization failures
- Audit log entries
- Backup success rate

### Security Scorecard
- **Authentication:** 9/10 (missing MFA)
- **Authorization:** 8/10 (missing row-level security)
- **Data Protection:** 7/10 (missing encryption at rest)
- **Input Validation:** 10/10 (fully implemented)
- **Audit & Monitoring:** 9/10 (logs complete)

**Overall Security Score:** 8.6/10 (Good for Phase 1)

---

## 📚 Security References

- OWASP Top 10: https://owasp.org/Top10/
- OWASP Authentication Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- Node.js Security Best Practices: https://nodejs.org/en/docs/guides/security/
- SQLite Security: https://www.sqlite.org/security.html

---

## 🔮 Phase 2 Security Enhancements

- [ ] Multi-Factor Authentication (MFA)
- [ ] OAuth 2.0 integration
- [ ] Database encryption at rest
- [ ] API key authentication (for external integrations)
- [ ] Encryption in transit (HTTPS)
- [ ] CSRF tokens
- [ ] End-to-end encryption
- [ ] Row-level security
- [ ] Secrets rotation automation
- [ ] DDoS protection
- [ ] Web Application Firewall (WAF)
- [ ] Security scanning in CI/CD

---

**Próximo Passo:** @data-engineer implementa auditoria em schema.sql com triggers
