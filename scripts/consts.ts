import path from "node:path"

export const filenames = {
  index: "index.js",
  prettier: "eslint-config-prettier.js",
}
export const rootPath = path.resolve(__dirname, "..")

export const extraRulesToDisable = [
  "simple-import-sort/imports",
  // Not being added for some reason, TODO check it and fix it
  "no-new-symbol",
  // https://github.com/biomejs/biome/pull/1801
  "no-delete-var",
  "no-return-assign",
  "no-useless-computed-key",
  "unicorn/no-static-only-class",
  "unicorn/no-typeof-undefined",
]
