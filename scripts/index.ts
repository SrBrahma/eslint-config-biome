/**
 * Code initially based on the html tables extraction: https://github.com/biomejs/biome/discussions/3#discussioncomment-7910787.
 * Thanks, Dani Guardiola!
 *
 * Attribution for eslint-config-prettier is available at the ATTRIBUTION.md and in the eslint-config-prettier.js.
 */

import fs from "fs"
import path from "path"
import { JSDOM } from "jsdom"

const extraRulesToDisable = ["simple-import-sort/imports"]
const rootPath = path.resolve(import.meta.dir, "..")

const filenames = {
  index: "index.js",
  prettier: "eslint-config-prettier.js",
}

const getTdString = (row: Element, column: number) =>
  (
    row.querySelector(`td:nth-child(${column})`) as HTMLTableCellElement
  ).textContent?.trim()

type Plugin = { id: string; prefix: string }

/** Returns the ESLint rules for the equivalent Biome's rules that are recommended */
const getEslintEquivalentRulesForPlugin = (
  plugin: Plugin,
  document: Document,
): Array<string> => {
  const table = (
    document.querySelector(`#user-content-${plugin.id}`)?.parentNode as Element
  ).nextElementSibling as HTMLTableElement | null

  if (!table) throw new Error(`Missing table for plugin ${plugin.id}`)

  const rows = Array.from(table.querySelectorAll("tbody > tr"))

  const eslintRules: Array<string> = []

  rows.forEach((row) => {
    const eslintRule = getTdString(row, 1)
    const biomeRule = getTdString(row, 3)
    const isBiomeRecommended = getTdString(row, 4)?.includes("✅")

    if (eslintRule && biomeRule && isBiomeRecommended) {
      eslintRules.push(plugin.prefix + eslintRule)
    }
  })

  return eslintRules
}

const getEslintEquivalentRules = async (): Promise<Array<string>> => {
  const plugins: Array<{ id: string; prefix: string }> = [
    { id: "eslint", prefix: "" },
    { id: "typescript-eslint", prefix: "@typescript-eslint/" },
    { id: "eslint-plugin-jest", prefix: "jest/" },
    { id: "eslint-plugin-jsx-a11y", prefix: "jsx-a11y/" },
    { id: "eslint-plugin-react", prefix: "react/" },
    { id: "eslint-plugin-react-hooks", prefix: "react-hooks/" },
    { id: "eslint-plugin-unicorn", prefix: "unicorn/" },
  ]

  const response = await fetch("https://github.com/biomejs/biome/discussions/3")
  const text = await response.text()
  const dom = new JSDOM(text)
  const document = dom.window.document

  return plugins.flatMap((plugin) =>
    getEslintEquivalentRulesForPlugin(plugin, document),
  )
}

/** https://typescript-eslint.io/rules/#extension-rules */
const getTsExtensionsForRules = (rules: Array<string>): Array<string> => {
  const glob = new Bun.Glob("*.js")
  const tsExtensionRules = [
    ...glob.scanSync(
      path.resolve(
        rootPath,
        "node_modules/@typescript-eslint/eslint-plugin/dist/rules",
      ),
    ),
  ]
    .map((s) => s.replace(".js", ""))
    .toSorted() // Sort to avoid diffs

  const rulesToExtend = tsExtensionRules.filter((tsExtensionRule) =>
    rules.includes(tsExtensionRule),
  )

  return rulesToExtend.map(
    (ruleToExtend) => `@typescript-eslint/${ruleToExtend}`,
  )
}

const writeFile = (rules: Array<string>) => {
  fs.writeFileSync(
    filenames.index,
    `/**
 * File automatically created by scripts/index.ts.
 *
 * These are ESLint rules that have corresponding and recommended Biome rules.
 */
module.exports = {
  extends: ["./${filenames.prettier}"],
  rules: {
${rules.map((rule) => `    "${rule}": "off",`).join("\n")}
  }
}
`,
  )
}

const createPrettierFile = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/prettier/eslint-config-prettier/main/index.js",
  )
  const attribution = `/**
 * eslint-config-prettier © 2017-2023 Simon Lydell and contributors
 * https://github.com/prettier/eslint-config-prettier
 *
 * This code is licensed under the MIT License (MIT).
 *
 * File automatically created by scripts/index.ts.
 */
`
  const text = attribution + (await response.text())

  fs.writeFileSync(filenames.prettier, text)
}

const main = async () => {
  const rules = [...(await getEslintEquivalentRules()), ...extraRulesToDisable]
  const rulesWithTsExtends = [...rules, ...getTsExtensionsForRules(rules)]
  const rulesNoDuplicates = [...new Set(rulesWithTsExtends)]

  writeFile(rulesNoDuplicates)
  await createPrettierFile()

  console.log(`Generated ${filenames.index} & ${filenames.prettier}!`)
}

await main()
