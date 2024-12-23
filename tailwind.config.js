/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: "#B3E5FC",
        oldBlue: '#51558f',
        pink: "#fe1276"
      },
      fontFamily: {
        funnel: ["Funnel Sans", "sans-serif"],
        nunito: ["Nunito", "sans-serif"]
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-fast": "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        screen: {
          '2xl': '1536px'
        }
      },
    },
  },
  plugins: [],
}

