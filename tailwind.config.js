/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        charcoal: {
          900: "#0E1110",
          800: "#161A18",
          700: "#232927",
          600: "#5C625F",
          500: "#8A918D",
          400: "#B6BCB8",
          300: "#E4E7E5",
          200: "#F7F8F6",
          100: "#FFFFFF"
        },
        emerald: {
          700: "#0F6D5B",
          600: "#2E7D5A",
          500: "#35A287",
          400: "#5BC9A3",
          300: "#D8ECE6",
          200: "#E8F5F0"
        },
        gold: {
          600: "#B9852B",
          500: "#D4A14A"
        },
        crimson: {
          600: "#A14C4C",
          500: "#C26B6B"
        },
        semantic: {
          background: {
            base: "#F7F8F6",
            surface: "#FFFFFF",
            elevated: "#FFFFFF"
          },
          text: {
            primary: "#0E1110",
            secondary: "#5C625F",
            muted: "#8A918D",
            inverse: "#FFFFFF",
            accent: "#0F6D5B"
          },
          border: {
            subtle: "#E4E7E5",
            accent: "#D8ECE6",
            focus: "#0F6D5B"
          },
          status: {
            success: "#2E7D5A",
            warning: "#B9852B",
            danger: "#A14C4C",
            info: "#0F6D5B"
          },
          accent: {
            primary: "#0F6D5B",
            primarySoft: "#D8ECE6",
            primaryHover: "#35A287"
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
    },
  },
  plugins: [],
}
