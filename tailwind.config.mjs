/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brown: "#53423e",
        lightBrown: "#645550",
        bg1: "#0f0f0f",
        black: "#0f0f0f",
        white: "#f1e1d9",
        green: "#00FF00", // Classic terminal green
        lightGreen: "#33ff33",
        darkGreen: "#007f00",
        cyan: "#00BFFF", // Cool accent
        lightCyan: "#88e5f0",
        darkCyan: "#009fb3",
        red: "#FF5555", // Error or alert
        yellow: "#FFFF00", // Warning or highlight
        magenta: "#FF00FF",
        orange: "#FFA500", // Use sparingly, breaks monotone
        lightOrange: "#fac27b",
        darkOrange: "#d28422",
        grey: "#33ff33",
        lightGrey: "#C0C0C0",
        darkGrey: "#C0C0C0",
        // Additional modern colors
        neon: "#39ff14",
        electric: "#00ffff",
        matrix: "#008000",
        transparent: "transparent",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'matrix': 'matrix 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        matrix: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '10%': { opacity: '1', transform: 'translateY(0px)' },
          '90%': { opacity: '1', transform: 'translateY(0px)' },
          '100%': { opacity: '0', transform: 'translateY(20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 255, 0, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 255, 0, 0.4), 0 0 30px rgba(0, 255, 0, 0.2)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
