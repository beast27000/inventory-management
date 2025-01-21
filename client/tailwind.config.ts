// TAILWIND.CONFIG.TS HERE It allows you to customize Tailwind's default styles and extend its functionality to suit the specific needs of your projec
// what we have done below is to customize the tailwind default styles for our project 
// like ie we have customized tailwind to our needs 

import type { Config } from "tailwindcss";

import { createThemes } from "tw-colors";    // This function is typically used to create multiple customizable color themes for a Tailwind CSS project.

import colors, { white } from "tailwindcss/colors";    // This imports Tailwind's predefined color palette,

// the below are the base colours we are going to use in our project 

const baseColors =[
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

// const shaeMapping is to help  provides a simple way to transform light shades to dark shades or dark to light , especially since we are going to impliment dark and light mode together 


const shadeMapping = {
  "50":"900",
  "100":"800",
  "200":"700",
  "300":"600",
  "400":"500",
  "500":"400",
  "600":"300",
  "700":"200",
  "800":"100",
  "900":"50",
}


const generateThemeObjects = (colors:any,mapping:any,invert= false) =>{

  const theme:any={};
  baseColors.forEach((color) =>{
    theme[color] = {};
    Object.entries(mapping).forEach(([key,value]:any) =>{
      const shadeKey = invert ? value:key;
      theme[color][key] = colors[color][shadeKey];
    });
  });
  return theme;
}

/* explanation for above code snippet ( line 40 to 51)

The selected code snippet defines a function called generateThemeObjects. This function is designed to generate customizable color themes for a Tailwind CSS project. It takes three parameters: colors, mapping, and invert.

colors: This parameter is expected to be an object containing color names as keys and their corresponding shades as values.
mapping: This parameter is expected to be an object that maps shade keys to their corresponding values.
invert: This parameter is an optional boolean flag that, when set to true, inverts the shade mapping.


The function works as follows:

1.
It initializes an empty object called theme.
2.
It iterates over the baseColors array using forEach. For each color, it creates an empty object within the theme object.
3.
It then iterates over the entries of the mapping object using Object.entries. For each entry, it determines the shade key based on the invert flag.
4.
It creates a CSS variable within the color object of the theme object, using the color name, shade key, and the corresponding color value from the colors object.
5.
Finally, it returns the generated theme object.

*/

const lightTheme = generateThemeObjects(colors,shadeMapping);
const darkTheme = generateThemeObjects(colors,shadeMapping,true);  


/*
These two lines are creating two different theme objects using the generateThemeObjects function defined earlier in the file. Let's explain each line:

1.
const lightTheme = generateThemeObjects(colors, shadeMapping);
This creates the light theme.
It uses the colors object (imported from Tailwind's color palette) and the shadeMapping object defined earlier.
The invert parameter is not provided, so it defaults to false.
This means the light theme will use the original shade mapping.

2.
const darkTheme = generateThemeObjects(colors, shadeMapping, true);
This creates the dark theme.
It uses the same colors and shadeMapping objects.
The invert parameter is set to true.
This means the dark theme will use an inverted shade mapping, effectively swapping light and dark shades.


The purpose of creating these two themes is to provide a light and dark mode for the application. The generateThemeObjects function is used to automatically generate CSS variables for each color and shade combination, making it easy to switch between light and dark modes.

For example, in the light theme, a color like blue-100 might be a very light blue, while in the dark theme, blue-100 would be mapped to a much darker blue (specifically, the shade that corresponds to blue-800 in the light theme).

This approach allows for a consistent color palette across both light and dark modes, with the shades automatically adjusted to suit each mode. It's a powerful and flexible way to implement theming in a Tailwind CSS project.
*/


const themes ={
  light: {
    ...lightTheme,
    white: "#ffffff"
  },

  dark: {
    ...darkTheme,
    white: colors.gray["950"],
    black: colors.gray["50"],
  }
}

/*

1)The ...lightTheme spreads all the properties from the lightTheme object (created earlier) into this object.
  It then explicitly sets the white color to "#ffffff" (pure white).

2)The ...darkTheme spreads all the properties from the darkTheme object (created earlier) into this object.
 It then overrides or adds two specific colors:
 white is set to colors.gray["950"], which is likely a very dark gray (almost black).
 black is set to colors.gray["50"], which is likely a very light gray (almost white).

The purpose of this structure is to:
1.
Incorporate all the color variables generated by the generateThemeObjects function for both light and dark themes.
2.
Allow for easy switching between light and dark modes in your application.
3.
Provide a way to override or add specific colors that might not be part of the generated themes.

*/


const config: Config ={

  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [createThemes(themes)],
} ;

export default config;

/*
darkMode: "class": This enables dark mode in Tailwind CSS. The "class" value means that dark mode will be triggered by adding a class (typically "dark") to an HTML element.
2.
content: This array specifies the files that Tailwind should scan to find class names to include in the final CSS. It's looking for files in the src/pages, src/components, and src/app directories with various extensions (.js, .ts, .jsx, .tsx, .mdx).
3.
theme: This section is used to extend or override Tailwind's default theme.
extend: This allows you to add new values to the theme without replacing the entire theme object.
colors: Here, two new color variables are defined:
background: "var(--background)": This creates a 'background' color that uses a CSS variable.
foreground: "var(--foreground)": This creates a 'foreground' color that uses a CSS variable.
These variables allow for dynamic color changes, which is useful for implementing themes or dark mode.
4.
plugins: [createThemes(themes)]: This adds the createThemes plugin to Tailwind, passing in the themes object defined earlier in the file. This plugin is responsible for generating the CSS for the light and dark themes.
5.
export default config: This exports the configuration object so it can be used by Tailwind CSS when processing your styles.


This configuration sets up a flexible theming system for your project, allowing for easy switching between light and dark modes, and potentially other custom themes. It also ensures that Tailwind processes all the relevant files in your project structure.
*/