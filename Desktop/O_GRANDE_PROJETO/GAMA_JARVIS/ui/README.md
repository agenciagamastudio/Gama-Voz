# GAMA Jarvis UI

Voice Assistant UI - Next.js + Design System Gama

## Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Gama Design System** - Design tokens

## Setup

```bash
# Install dependencies
npm install

# Run development server (port 3014)
npm run dev

# Build for production
npm build

# Start production server
npm start
```

## Architecture

- **Backend API:** http://localhost:3018/api/jarvis/state
- **Frontend:** http://localhost:3014
- **Polling Interval:** 500ms

## Components

- **JarvisCircle** - 5-state pulsing circle (idle, listening, activated, processing, responding)
- **Transcript** - Real-time user input and Jarvis response
- **History** - Last 5 conversations
- **StatusBar** - Groq status, Monitor status, current time

## Design System

Imports tokens from:
```
../../GAMA_DESIGN_SYSTEM/gama-ds-platform/design-tokens/tokens.css
```

All colors are CSS variables (no hardcoded colors):
- `--color-primary` (#88CE11)
- `--color-background` (#0a0a0a)
- `--color-text-primary` (#FFFFFF)
- `--color-text-secondary` (#A1A1AA)
- `--color-surface` (#272727)

## Features

✅ Real-time state polling
✅ 5 circle states with animations
✅ Design System integration
✅ Responsive layout
✅ Accessibility focused

## Development

Start both the backend and frontend:

```bash
# Terminal 1: Backend (GAMA_JARVIS/)
python main.py --mode listen

# Terminal 2: Frontend (GAMA_JARVIS/ui/)
npm run dev
```

Then open http://localhost:3014 in your browser.
