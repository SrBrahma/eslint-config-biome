import { expect, test } from "bun:test"
import fs from "fs"
import path from "path"
import { spawnSync } from "bun"

const rootPath = path.resolve(import.meta.dir, "..")
const indexJsPath = path.resolve(rootPath, "index.js")

test("index.js exists", () => {
  expect(fs.existsSync(indexJsPath)).toBeTrue()
})

test("index.js is a valid file and can be used by eslint", () => {
  // In the root there is a .eslintrc that uses the index.js in the extends.
  expect(
    spawnSync(["bunx", "eslint", "./scripts/index.ts"], {
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
  const indexJsContent = fs.readFileSync(indexJsPath, "utf-8")

  expect(rulesToCheck.every((rule) => indexJsContent.includes(rule))).toBeTrue()
})
