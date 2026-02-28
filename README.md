# Pulse Music Player

Pulse is a modern, highly aesthetic web-based music player built with React and Tailwind CSS. It features a stunning "Glassmorphism" UI with vibrant gradients and floating components, providing a premium listening experience.

## Features

- **Real Audio Playback**: Seamlessly stream high-quality audio previews of millions of tracks using the open iTunes Search API. No API keys or authentication required!
- **Dynamic Search**: Search for any artist, song, or album in real-time.
- **Custom Playlists**: Create your own playlists and add songs directly from anywhere in the app using the universal context menu. Playlists are continuously saved to your browser's local storage.
- **Glassmorphism UI**: A premium aesthetic featuring frosted glass panels, ambient blur-gradients, and fluid CSS animations.
- **Global Music Player**: A persistent, floating player bar giving you full control over playback across all views.

## Tech Stack

- **Frontend Framework**: React (with hooks and Context API for state management)
- **Build Tool**: Vite for blazing fast development
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for crisp vector icons
- **Routing**: React Router DOM
- **Data Source**: iTunes Search API for fetching music metadata, high-resolution album art, and `.m4a` audio streams

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Navigate to the project directory:
   ```bash
   cd music-player
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to the local URL provided in your terminal (e.g., `http://localhost:5173`).
