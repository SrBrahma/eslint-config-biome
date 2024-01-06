import { expect, test } from "bun:test"
import fs from "fs"
import path from "path"
import { spawnSync } from "bun"

const rootPath = path.resolve(import.meta.dir, "..")
const indexPath = path.resolve(rootPath, "index.js")
const prettierPath = path.resolve(rootPath, "eslint-config-prettier.js")
const indexContent = fs.readFileSync(indexPath, "utf-8")
const prettierContent = fs.readFileSync(prettierPath, "utf-8")

test("index.js is a valid file and can be used by eslint", () => {
  // In the root there is a .eslintrc that uses the index.js in the extends.
  expect(
    spawnSync(["bunx", "--bun", "eslint", "scripts/index.ts"], {
      cwd: rootPath,
    }).success,
  ).toBeTrue()
})

test("index.js has rules from different plugins and includes extra rules", () => {
  const rulesToCheck = [
    "no-unsafe-optional-chaining",
    "@typescript-eslint/no-extra-non-null-assertion",
    "jsx-a11y/html-has-lang",
    "react/no-children-prop",
    "unicorn/no-instanceof-array",
    "simple-import-sort/imports",
  ]

  expect(rulesToCheck.every((rule) => indexContent.includes(rule))).toBeTrue()
})

test("TS extensions should be added to index.js", () => {
  const rulesToCheck = [
    "@typescript-eslint/no-redeclare",
    "@typescript-eslint/default-param-last",
  ]

  expect(rulesToCheck.every((rule) => indexContent.includes(rule))).toBeTrue()
})

test("eslint-config-prettier is used and is valid", () => {
  expect(indexContent).toContain('extends: ["./eslint-config-prettier.js"],')
  expect(prettierContent).toContain('"react/jsx-indent": "off"')
})
