/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { expect, test } from "bun:test"
import fs from "node:fs"
import path from "node:path"
import { spawnSync } from "bun"

const rootPath = path.resolve(__dirname, "..")
const indexPath = path.resolve(rootPath, "index.js")
const prettierPath = path.resolve(rootPath, "eslint-config-prettier.js")
const indexContent = fs.readFileSync(indexPath, "utf-8")
const disabledRules = Object.keys(
  (require(indexPath) as { rules: Record<string, string> }).rules,
)
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

  expect(disabledRules).toEqual(expect.arrayContaining(rulesToCheck))
  expect(disabledRules.length).toBeGreaterThan(150) // 165 last time
})

test("TS extensions should be added to index.js", () => {
  const rulesToCheck = [
    "@typescript-eslint/no-redeclare",
    "@typescript-eslint/default-param-last",
  ]

  expect(disabledRules).toEqual(expect.arrayContaining(rulesToCheck))
})

test("eslint-config-prettier is used and is valid", () => {
  expect(indexContent).toContain('extends: ["./eslint-config-prettier.js"],')
  expect(prettierContent).toContain('"react/jsx-indent": "off"')
})

test("doesnt include clippy rules", () => {
  expect(disabledRules).not.toContain("if_not_else")
  expect(disabledRules).not.toContain("eq_op")
})
