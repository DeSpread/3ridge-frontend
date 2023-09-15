/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
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
        primary: {
          main: "#F3F4F6",
          light: "#909BEF",
          dark: "#F3F4F6",
          contrastText: "#100e14",
        },
        secondary: {
          main: "#61E1FF",
          light: "#3FC79A",
          dark: "#374ae9",
          contrastText: "#F3F4F6",
        },
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
      },
      fontFamily: {
        "LINESeedKR-Rg": ["LINESeedKR-Rg", "sans-serif"],
        "LINESeedKR-Bd": ["LINESeedKR-Bd", "sans-serif"],
      },
      borderRadius: {
        8: "8px",
        24: "24px",
      },
      spacing: {
        3: "3px",
        8: "8px",
        15: "15px",
        16: "16px",
      },
      fontSize: {
        "0.75rem": "0.75rem",
        "0.875rem": "0.875rem",
        "0.9rem": "0.9rem",
        "1rem": "1rem",
        "1.125rem": "1.125rem",
        "1.5rem": "1.5rem",
        "2rem": "2rem",
        "2.25rem": "2.25rem",
        "3rem": "3rem",
        "4.1rem": "4.1rem",
      },
      borderWidth: {
        2: "2px",
        3: "3px",
      },
      lineHeight: {
        1: "1",
        1.375: "1.375",
        1.5: "1.5",
        1.57: "1.57",
        1.66: "1.66",
        1.75: "1.75",
        2.5: "2.5",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
