import { JSDOM } from "jsdom"

export const getRecommendedBiomeRules = async (): Promise<Array<string>> => {
  const response = await fetch("https://biomejs.dev/linter/rules/")
  const html = await response.text()

  const dom = new JSDOM(html)
  const document = dom.window.document

  const rows = document.querySelectorAll("table tr")

  const recommendedRules = [...rows]
    .map((row) => {
      const cells = row.querySelectorAll("td")
      const rowTexts = [...cells].map((cell) => cell.textContent?.trim() ?? "")

      return rowTexts
    })
    .filter((rowTexts) => rowTexts[2]?.includes("✅"))
    .map((recommendedRowTexts) => recommendedRowTexts[0] ?? "")

  return recommendedRules
}

type Equivalency = { eslint: string; biome: string }

export const getEquivalentRules = async (): Promise<Array<Equivalency>> => {
  const response = await fetch("https://biomejs.dev/linter/rules-sources/")
  const html = await response.text()

  const dom = new JSDOM(html)
  const document = dom.window.document

  const tables = document.querySelectorAll("table")

  const rowsTexts = [...tables].flatMap((table) => {
    const tableHeaders = Array.from(table.querySelectorAll("th")).map(
      (th) => th.textContent?.trim() ?? "",
    )
    const pluginName = tableHeaders[0]
      ?.split(" ")[0]
      ?.replace("eslint-plugin-", "")
      ?.replace("typescript", "@typescript-eslint")

    if (!pluginName) throw new Error("Invalid plugin")

    const prefix = ["Clippy", "ESLint"].includes(pluginName)
      ? ""
      : `${pluginName}/`

    const rows = [...table.querySelectorAll("tr")].filter((tr) =>
      tr.querySelector("td"),
    )

    const rowsTexts = rows.map((row) => {
      const rowTexts = [...row.querySelectorAll("td, td")].map(
        (cell) => cell.textContent?.trim() ?? "",
      )

      rowTexts[0] = prefix + rowTexts[0]
      // Sometimes they have `${biomeRuleName} (inspired)`. We get just the first word.
      rowTexts[1] = rowTexts[1]?.split(" ")[0] ?? ""

      return rowTexts
    })

    return rowsTexts
  })

  const equivalentRules: Array<Equivalency> = rowsTexts.flatMap((rowTexts) => ({
    eslint: rowTexts[0] ?? "",
    biome: rowTexts[1] ?? "",
  }))

  return equivalentRules
}
