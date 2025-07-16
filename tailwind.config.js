/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nothing-inspired color palette
        background: {
          DEFAULT: "#FAFAFA",
          secondary: "#F5F5F5",
          tertiary: "#FFFFFF",
        },
        foreground: {
          DEFAULT: "#0A0A0A",
          secondary: "#525252",
          tertiary: "#A3A3A3",
        },
        primary: {
          DEFAULT: "#0A0A0A",
          foreground: "#FAFAFA",
        },
        secondary: {
          DEFAULT: "#F5F5F5",
          foreground: "#0A0A0A",
        },
        accent: {
          DEFAULT: "#FF4444",
          foreground: "#FFFFFF",
          light: "#FF6B6B",
          dark: "#CC3333",
        },
        muted: {
          DEFAULT: "#F5F5F5",
          foreground: "#737373",
        },
        border: "#E5E5E5",
        input: "#F5F5F5",
        ring: "#0A0A0A",
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FAFAFA",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "bounce-subtle": "bounceSubtle 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        bounceSubtle: {
          "0%, 20%, 53%, 80%, 100%": { transform: "translate3d(0,0,0)" },
          "40%, 43%": { transform: "translate3d(0, -8px, 0)" },
          "70%": { transform: "translate3d(0, -4px, 0)" },
          "90%": { transform: "translate3d(0, -2px, 0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
