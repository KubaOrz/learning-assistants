const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#7e22ce",
        "primary-hover": "#6a1eac",
        "primary-light": "#ab5bf0",
        "secondary": "#86efac",
        "secondary-hover": "#6edc8f",
        "accent": "#d946ef",
        "accent-hover": "#c534db",
        "neutral": "#0b0d12",
        "neutral-hover": "#05070a",
        "base-100": "#f0fdfa",
        "base-100-hover": "#d6f5eb",
        "info": "#7dd3fc",
        "info-hover": "#58bef9",
        "success": "#22c55e",
        "success-hover": "#1fa14d",
        "warning": "#fbbf24",
        "warning-hover": "#d2a31e",
        "error": "#d60042",
        "error-hover": "#ad0035",
      }
    },
  },
  plugins: [
    // require('flowbite/plugin'),
    flowbite.plugin(),
  ],
}

