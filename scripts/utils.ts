import fs from "node:fs"
import { filenames } from "./consts"

// Done by GPT. No way I would do that boring shit by hand.
export const sortRules = (rules: Array<string>) =>
  rules.toSorted((a, b) => {
    // Split rule names by '/' to separate potential plugin prefix from rule name
    const splitA = a.split("/")
    const splitB = b.split("/")

    // Compare plugin prefixes if both rules have them
    if (splitA.length > 1 && splitB.length > 1) {
      if (splitA[0] === splitB[0]) {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        return splitA[1]!.localeCompare(splitB[1]!)
      }

      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      return splitA[0]!.localeCompare(splitB[0]!)
    }

    // If one rule has a plugin prefix and the other doesn't, the one without prefix comes first
    if (splitA.length < splitB.length) {
      return -1
    }
    if (splitA.length > splitB.length) {
      return 1
    }

    // If both rules don't have plugin prefixes, compare them directly
    return a.localeCompare(b)
  })

export const writeMainFile = (rules: Array<string>) => {
  fs.writeFileSync(
    filenames.index,
    `/**
 * File automatically created by scripts/index.ts.
 *
 * These are ESLint rules that have corresponding and recommended Biome rules.
 */
module.exports = {
  rules: {
    ...require("./eslint-config-prettier.js").rules,
${rules.map((rule) => `    "${rule}": "off",`).join("\n")}
  }
}
`,
  )
}
