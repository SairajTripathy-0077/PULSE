/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        player: {
          base: '#121212',
          highlight: '#1a1a1a',
          press: '#000000',
          elevated: '#242424',
          accent: '#1db954', // Spotify green as a familiar accent
        }
      }
    },
  },
  plugins: [],
}
