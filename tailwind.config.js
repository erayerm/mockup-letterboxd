/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-gray": "#99AABB",
        "secondary-white": "#D8E0E8",
        green: {
          "100": "#00e054",
          "200": "#25B931",
          "300": "#23AE30",
          "400": "#00AC1D",
          "500": "#019C1B"
        },
        "hover-blue": "#3AA6D9"
      },
      boxShadow: {
        'custom-inset': 'inset 0 0 0 1px rgba(221,238,255,.1)',
      }
    },
  },
  plugins: [],
};
