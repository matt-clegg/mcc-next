import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>> {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Karla", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        "royal-blue": {
          50: "#eef4ff",
          100: "#e0eaff",
          200: "#c7d8fe",
          300: "#a6bdfb",
          400: "#8299f7",
          500: "#6475f0",
          600: "#474ee4",
          700: "#393cc9",
          800: "#3135a2",
          900: "#2f3480",
          950: "#1b1d4b"
        }
      }
    }
  }
};
