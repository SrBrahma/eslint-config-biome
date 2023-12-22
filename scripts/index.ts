// Code based on https://github.com/biomejs/biome/discussions/3#discussioncomment-7910787. Thanks, Dani Guardiola!

import fs from "fs"
import { JSDOM } from "jsdom"

const getTdString = (row: Element, column: number) =>
  (
    row.querySelector(`td:nth-child(${column})`) as HTMLTableCellElement
  ).textContent?.trim()

type Plugin = { id: string; prefix: string }

/**
 * Returns the ESLint rules for the equivalent Biome's rules that are recommended (proof of concept for now)
 */
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

  const url = "https://github.com/biomejs/biome/discussions/3"
  const response = await fetch(url)
  const text = await response.text()
  const dom = new JSDOM(text)
  const document = dom.window.document

  return plugins.flatMap((plugin) =>
    getEslintEquivalentRulesForPlugin(plugin, document),
  )
}

const writeFile = (rules: Array<string>) => {
  const text = `/**
 * File automatically created by scripts/index.ts.
 *
 * These are ESLint rules that have corresponding and recommended Biome rules.
 */
module.exports = {
  rules: {
${rules.map((rule) => `    "${rule}": "off",`).join("\n")}
  }
}
`

  fs.writeFileSync("index.js", text)
}

const extraRulesToDisable = ["simple-import-sort/imports"]

const main = async () => {
  const rules = [...(await getEslintEquivalentRules()), ...extraRulesToDisable]

  writeFile(rules)

  console.log("Generated index.js!")
}

await main()
