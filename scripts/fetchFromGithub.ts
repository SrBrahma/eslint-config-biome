import { JSDOM } from "jsdom"

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

export const getEslintEquivalentRulesFromGithub = async (): Promise<
  Array<string>
> => {
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
