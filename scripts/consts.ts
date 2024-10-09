import path from "node:path"

export const filenames = {
  index: "index.js",
  prettier: "eslint-config-prettier.js",
}
export const rootPath = path.resolve(__dirname, "..")

/**
 * Some ESLint rules are already taken care by Biome but it's not specified from the used sources of information that they do.
 * So we manually disable them here.
 */
export const extraRulesToDisable = [
  "simple-import-sort/imports",
  // Not being added for some reason, TODO check it and fix it
  "no-new-symbol",
  // https://github.com/biomejs/biome/pull/1801
  "no-delete-var",
  "no-return-assign",
  "no-useless-computed-key",
  "unicorn/no-typeof-undefined",
  "@typescript-eslint/no-useless-template-literals",
  // There are two packages for mysticatea. One is already handled by the code, this handles the other package.
  "eslint-plugin-mysticatea/no-this-in-static",
  // https://biomejs.dev/linter/rules/use-import-type/
  "@typescript-eslint/no-import-type-side-effects",
  // https://biomejs.dev/linter/rules/no-useless-type-constraint/
  "@typescript-eslint/no-unnecessary-type-arguments",
]
