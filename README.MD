# Pomo 20-20

A minimal, production-ready Pomodoro timer that incorporates the 20-20-20 eye break rule to help protect your eyes during focused work sessions. Available as both a web app and a cross-platform desktop application.

## The Cycle

1. **Focus**: 25 minutes of deep work
2. **Eye Break**: 20 seconds to look at something ~20 feet away
3. **Rest Break**: 5 minutes to stand up, stretch, and reset

Then the cycle repeats indefinitely.

## Quick Start (Web App)

```bash
npm install
npm run dev
```

Open your browser to the URL shown in the terminal (typically `http://localhost:5173`).

## Desktop Application

This app can be built as a native desktop application for macOS, Windows, and Linux using Tauri.

### Prerequisites

- Node.js and npm
- Rust toolchain (install from [rustup.rs](https://rustup.rs/))

### Development Mode

Run the desktop app in development mode:

```bash
npm run tauri:dev
```

This will:
1. Start the Vite dev server
2. Launch the Tauri desktop window
3. Hot-reload on code changes

### Building Desktop App

Build a production-ready desktop application:

```bash
npm run tauri:build
```

Built executables will be located in `src-tauri/target/release/`:

- **macOS**: `.app` bundle
- **Windows**: `.exe` installer
- **Linux**: `.AppImage` or `.deb` package

### Cross-Platform Builds

- Builds are platform-specific (build on Mac for macOS, Windows for Windows, etc.)
- For cross-platform distribution, use CI/CD services or build on each target platform
- First build may take longer as Rust dependencies compile

## Tech Stack

- React + TypeScript
- Vite
- TailwindCSS
- Tauri (for desktop app)

## Features

- Clean, minimal UI with glassmorphism design
- Low CPU overhead (single 1-second interval)
- Automatic phase transitions
- Pause/Resume functionality
- Skip phase option
- Progress tracking
- Cycle counter
- Fully responsive design
- Native desktop app support (macOS, Windows, Linux)

## Web Build

```bash
npm run build
```

## Preview Production Build (Web)

```bash
npm run preview
```
