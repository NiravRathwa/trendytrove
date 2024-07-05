// theme.ts
import { createTheme, ThemeOptions } from "@mui/material/styles";

interface CustomPaletteColor {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}
interface cutstomColors {
  text: string;
  background: string;
  primary: string;
  secondary: string;
  accent: string;
}
declare module "@mui/material/styles" {
  interface Palette {
    customColors: cutstomColors;
    customText: CustomPaletteColor;
    customBackground: CustomPaletteColor;
    customPrimary: CustomPaletteColor;
    customSecondary: CustomPaletteColor;
    customAccent: CustomPaletteColor;
  }

  interface PaletteOptions {
    customColors: Partial<cutstomColors>;
    customText?: Partial<CustomPaletteColor>;
    customBackground?: Partial<CustomPaletteColor>;
    customPrimary?: Partial<CustomPaletteColor>;
    customSecondary?: Partial<CustomPaletteColor>;
    customAccent?: Partial<CustomPaletteColor>;
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    customColors: {
      text: 'var(--text)',
      background: 'var(--background)',
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      accent: 'var(--accent)',
    },
    customText: {
      50: "var(--text-50)",
      100: "var(--text-100)",
      200: "var(--text-200)",
      300: "var(--text-300)",
      400: "var(--text-400)",
      500: "var(--text-500)",
      600: "var(--text-600)",
      700: "var(--text-700)",
      800: "var(--text-800)",
      900: "var(--text-900)",
      950: "var(--text-950)",
    },
    customBackground: {
      50: "var(--background-50)",
      100: "var(--background-100)",
      200: "var(--background-200)",
      300: "var(--background-300)",
      400: "var(--background-400)",
      500: "var(--background-500)",
      600: "var(--background-600)",
      700: "var(--background-700)",
      800: "var(--background-800)",
      900: "var(--background-900)",
      950: "var(--background-950)",
    },

    customPrimary: {
      50: "var(--primary-50)",
      100: "var(--primary-100)",
      200: "var(--primary-200)",
      300: "var(--primary-300)",
      400: "var(--primary-400)",
      500: "var(--primary-500)",
      600: "var(--primary-600)",
      700: "var(--primary-700)",
      800: "var(--primary-800)",
      900: "var(--primary-900)",
      950: "var(--primary-950)",
    },
    customSecondary: {
      50: "var(--secondary-50)",
      100: "var(--secondary-100)",
      200: "var(--secondary-200)",
      300: "var(--secondary-300)",
      400: "var(--secondary-400)",
      500: "var(--secondary-500)",
      600: "var(--secondary-600)",
      700: "var(--secondary-700)",
      800: "var(--secondary-800)",
      900: "var(--secondary-900)",
      950: "var(--secondary-950)",
    },
    customAccent: {
      50: "var(--accent-50)",
      100: "var(--accent-100)",
      200: "var(--accent-200)",
      300: "var(--accent-300)",
      400: "var(--accent-400)",
      500: "var(--accent-500)",
      600: "var(--accent-600)",
      700: "var(--accent-700)",
      800: "var(--accent-800)",
      900: "var(--accent-900)",
      950: "var(--accent-950)",
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
