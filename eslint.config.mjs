import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated build output that is not in git. Without these, `npm run lint`
    // reports ~20k problems from compiled bundles and drowns out real findings.
    "**/.next/**",
    "dist/**",
    ".claude/**",
    "coverage/**",
  ]),
]);

export default eslintConfig;
