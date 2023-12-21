import fs from "fs"
import { JSDOM } from "jsdom"

// Code based on https://github.com/biomejs/biome/discussions/3#discussioncomment-7910787
// Thanks, Dani Guardiola! - https://github.com/DaniGuardiola

const getTdString = (row: Element, column: number) =>
	(
		row.querySelector(`td:nth-child(${column})`) as HTMLTableCellElement
	).textContent?.trim()

/**
 * Returns the ESLint rules for the equivalent Biome's rules that are recommended (proof of concept for now)
 */
const getEslintEquivalentRulesForPlugin = (
	plugin: string,
	document: Document,
): Array<string> => {
	const table = (
		document.querySelector(`#user-content-${plugin}`)?.parentNode as Element
	).nextElementSibling as HTMLTableElement | null

	if (!table) throw new Error(`Missing table for plugin ${plugin}`)

	const rows = Array.from(table.querySelectorAll("tbody > tr"))

	const eslintRules: Array<string> = []

	rows.forEach((row) => {
		const eslintRule = getTdString(row, 1)
		const biomeRule = getTdString(row, 3)
		const isBiomeRecommended = getTdString(row, 4)?.includes("✅")

		if (eslintRule && biomeRule && isBiomeRecommended) {
			eslintRules.push(eslintRule)
		}
	})

	return eslintRules
}

const getEslintEquivalentRules = async (): Promise<Array<string>> => {
	const plugins = [
		"eslint",
		"typescript-eslint",
		"eslint-plugin-jest",
		"eslint-plugin-jsx-a11y",
		"eslint-plugin-react",
		"eslint-plugin-react-hooks",
		"eslint-plugin-unicorn",
		"rust-clippy",
	]

	const url = "https://github.com/biomejs/biome/discussions/3"
	const response = await fetch(url)
	const text = await response.text()
	const dom = new JSDOM(text)
	const document = dom.window.document

	const eslintRules: Array<string> = plugins.flatMap((plugin) =>
		getEslintEquivalentRulesForPlugin(plugin, document),
	)

	// console.log("ESLint rules:/n", eslintRules)
	return eslintRules
}

const writeFile = (rules: Array<string>) => {
	const text = `/**
 * File automatically created TODO write some here
 */
module.exports = {
  rules: {
${rules.map((rule) => `    "${rule}": "off",`).join("\n")}
  }
}
`

	fs.writeFileSync("index.js", text)

	// Lint it! This is mainly to remove non required quotes. We could do some regex check but whatever!
	Bun.spawnSync(["bunx", "biome", "check", "--apply-unsafe", "index.js"])
}

const main = async () => {
	writeFile(await getEslintEquivalentRules())
}

await main()
