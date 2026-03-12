import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    ignores: ["dist/**", "node_modules/**"],
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.browser } 
  },
  {
    ...pluginReact.configs.flat.recommended,
    ignores: ["dist/**", "node_modules/**"],
     settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      "react/prop-types": "off",
    },
  },
]);
