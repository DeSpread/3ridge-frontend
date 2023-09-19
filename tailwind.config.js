/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        sm: "600px",
        md: "960px",
        lg: "1280px",
        xl: "1920px",
      },
      colors: {
        neutral: {
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#bdbdbd",
          500: "#787687",
          600: "#646176",
          700: "#383742",
          800: "#18151d",
          900: "#100e14",
        },
        // TODO: check shadcn colors
        // primary: {
        //   main: "#F3F4F6",
        //   light: "#909BEF",
        //   dark: "#F3F4F6",
        //   contrastText: "#100e14",
        // },
        // secondary: {
        //   main: "#61E1FF",
        //   light: "#3FC79A",
        //   dark: "#374ae9",
        //   contrastText: "#F3F4F6",
        // },
        success: {
          main: "#14B8A6",
          light: "#43C6B7",
          dark: "#0E8074",
          contrastText: "#100e14",
        },
        info: {
          main: "#00FFDA",
          light: "#64B6F7",
          dark: "#0B79D0",
          contrastText: "#100e14",
        },
        warning: {
          main: "#f8810a",
          light: "#FFBF4C",
          dark: "#B27B16",
          contrastText: "#100e14",
        },
        error: {
          main: "#D14343",
          light: "#DA6868",
          dark: "#922E2E",
          contrastText: "#100e14",
        },
        text: {
          primary: "#EDF2F7",
          secondary: "#A0AEC0",
          disabled: "#646176",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
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
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  corePlugins: {
    preflight: false,
  },
};
