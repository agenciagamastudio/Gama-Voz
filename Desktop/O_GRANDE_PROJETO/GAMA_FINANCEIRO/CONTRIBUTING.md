# Contributing to Gama Financeiro

Thank you for contributing! Follow these guidelines to maintain code quality and consistency.

## Branch Naming

```
feature/description         # New feature
bugfix/description         # Bug fix
chore/description          # Maintenance
docs/description           # Documentation
refactor/description       # Code refactoring
```

## Commit Convention

```
feat: Add new feature [Story 1.2]
fix: Resolve bug in module [Story 2.3]
docs: Update README
chore: Update dependencies
refactor: Simplify component logic
```

Always reference the story ID when applicable.

## Code Standards

### Style
- Use ESLint: `npm run lint`
- Use Prettier formatting (auto on commit)
- Follow Gama Design System components

### Type Safety
- Always use TypeScript
- Run `npm run typecheck` before committing
- Define interfaces for all props

### Testing
- Write unit tests for new functions
- Write component tests for UI changes
- Run `npm test` before submitting PR

### Performance
- Avoid unnecessary re-renders
- Use React.memo for expensive components
- Check bundle size impact

## Pull Request Process

1. **Create branch** from `main`
2. **Make changes** and commit regularly
3. **Push branch** to GitHub
4. **Create PR** with:
   - Clear title (max 70 chars)
   - Description of changes
   - Reference to story/issue
   - Acceptance criteria checklist
5. **Address review comments** via new commits (don't amend)
6. **Wait for approval** — at least 1 review required
7. **Merge** when CI passes and approved

## Code Review Checklist

- [ ] Code follows style guide
- [ ] TypeScript types are complete
- [ ] Tests are added/updated
- [ ] No console.log or debug code
- [ ] Performance impact assessed
- [ ] Security implications reviewed
- [ ] Documentation updated

## Testing Requirements

### Unit Tests
```bash
npm test -- ComponentName
```

### E2E Tests
```bash
npm run test:e2e
```

### Coverage Target
- Functions: >= 80%
- Branches: >= 75%
- Statements: >= 80%

## Performance Standards

- First Contentful Paint (FCP) < 2s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Bundle size increase reviewed before merge

## Security Guidelines

- Never commit secrets or API keys
- Use environment variables
- Validate user input
- Sanitize output
- Review SQL/RLS policies
- Check OWASP Top 10

## Documentation

- Update `docs/` when adding features
- Include code examples
- Document breaking changes
- Keep README synchronized

## Questions?

- Check `docs/ARCHITECTURE.md` for system design
- See `docs/stories/` for feature context
- Ask in team channels for clarification

---

**Last Updated:** 2026-03-26
**Maintained by:** @devops (Gage)
