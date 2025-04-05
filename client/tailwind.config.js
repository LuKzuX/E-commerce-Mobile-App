/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          "bg-gray": "var(--bg-gray)",
          "bg-yellow": "var(--bg-yellow)",
          "bg-red": "var(--bg-red)"
        },
        fontSize: {
          "text-small": "var(--text-small)",
          "text-small-medium": "var(--text-small-medium)",
          "text-medium": "var(--text-medium)",
          "text-medium-large": "var(--text-medium-large)",
          "text-large": "var(--text-large)",
        }
      },
    },
    plugins: [],
  }