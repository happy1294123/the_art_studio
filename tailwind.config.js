/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],    
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        fontColor: "#403931",
        headingColor: "#947964",
        bgColor: "#FFF5ED",
        bgColorSecondary: "#D1C0AD",
        bgColorOther: "#EDDFCF",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "#B34744",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#B34744",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F1D5CD",
          foreground: "#6C370D",
        },
        destructive: {
          DEFAULT: "#B34744",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          // DEFAULT: "#D1C0AD",
          DEFAULT: "#BCB6B0",
          foreground: "#A89F96",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily:{
        sans: ['var(--font-LXGWWenKai)']
      }
    },
  },
  // plugins: [nextui()],
}