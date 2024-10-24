import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends(
        "eslint:recommended",
        "plugin:node/recommended",
        "plugin:promise/recommended"
    ),
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
            ecmaVersion: 12,
            sourceType: "module",
        },
        rules: {
            "no-console": "warn",
            "promise/always-return": "error",
            "promise/no-return-wrap": "error",
            "node/no-exports-assign": "warn",
            "node/no-deprecated-api": "warn",
            "node/no-extraneous-require": "warn",
            "node/no-missing-require": "warn",
            "node/no-unpublished-require": "warn",
            "node/no-unpublished-import": "off",
            "node/no-unsupported-features/es-syntax": "off",
            "eqeqeq": ["error", "always"],
            "curly": ["error", "all"],
        },
    }
];
