/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: {'max': '1364px'},
      // => @media (min-width: 640px) { ... }
      max950: {'max': '950px'},
      max951: {'max': '951px'},
      max467: {'max': '467px'},
      max400: {'max': '400px'},
      max500: {'max': '500px'},
      max550: {'max': '550px'},
      max1200: {'max': '1200px'},
      max767: {'max': '767px'},
      max1056: {'max': '1056px'},
      // min951: {'min': '952px'},
      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [],
};
