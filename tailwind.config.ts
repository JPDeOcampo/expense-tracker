const { nextui } = require("@nextui-org/react");
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1540px',
      },
      colors: {
        secondary: "#E0E0E0",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        // primary: {
        // 	DEFAULT: 'hsl(var(--primary))',
        // 	foreground: 'hsl(var(--primary-foreground))'
        // },
        // secondary: {
        // 	DEFAULT: 'hsl(var(--secondary))',
        // 	foreground: 'hsl(var(--secondary-foreground))'
        // },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        brand: {
          extend: "light",
          colors: {
            neutral: {
              light: "#FFFFFF",
              light80: "#FFFFFF80",
              dark: "#000000",
              dark80: "#00000080",
            },
            primary: {
              // Navy Blue
              25: "#A4B6CC", // Very light shade
              50: "#6A7C99", // Light shade
              100: "#4D647C", // Light-medium shade
              200: "#335A66", // Medium shade
              300: "#1F4D55", // Medium-dark shade
              400: "#1A3D48", // Darker shade
              500: "#142E3D", // Dark shade
              600: "#101F30", // Darker
              700: "#0B1724", // Very dark
              800: "#060F18", // Original color
              900: "#03060C", // Almost black
              DEFAULT: "#003366",
            },
            secondary: {
              // Soft Gray
              25: "#FFFFFF", // Very light shade
              50: "#F5F5F5", // Light shade
              100: "#EAEAEA", // Light-medium shade
              200: "#D5D5D5", // Medium shade
              300: "#BFBFBF", // Medium-dark shade
              400: "#AFAFAF", // Darker shade
              500: "#9E9E9E", // Dark shade
              600: "#8C8C8C", // Darker
              700: "#7A7A7A", // Very dark
              800: "#686868", // Original color
              900: "#545454", // Almost black
              DEFAULT: "#E0E0E0",
            },
            tertiary: {
              // Mint Green
              25: "#E5F9F6", // Very light shade
              50: "#C4EAE9", // Light shade
              100: "#A3E2DB", // Light-medium shade
              200: "#85D9CE", // Medium shade
              300: "#66D0C0", // Medium-dark shade
              400: "#4FC6B3", // Darker shade
              500: "#3BAA99", // Dark shade
              600: "#329D8B", // Darker
              700: "#2A8F7E", // Very dark
              800: "#227E70", // Original color
              900: "#1A6F64", // Almost black
              DEFAULT: "#B2E1D6",
            },
            quaternary: {
              // Charcoal
              25: "#B3B3B3", // Very light shade
              50: "#999999", // Light shade
              100: "#7F7F7F", // Light-medium shade
              200: "#666666", // Medium shade
              300: "#4D4D4D", // Medium-dark shade
              400: "#3C3C3C", // Darker shade
              500: "#2B2B2B", // Dark shade
              600: "#1C1C1C", // Darker
              700: "#0D0D0D", // Very dark
              800: "#0A0A0A", // Original color
              900: "#050505", // Almost black
              DEFAULT: "#333333",
            },
          },
        },
      },
    }),
    require("tailwindcss-animate"),
  ],
};
export default config;
