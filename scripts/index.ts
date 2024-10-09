/** Attribution for eslint-config-prettier is available at the ATTRIBUTION.md and in the eslint-config-prettier.js. */

import { extraRulesToDisable, filenames } from "./consts"
import { getRulesFromJsonMetadata } from "./metadata.js"
import { createPrettierFile } from "./prettier"
import { getJsBaseRules, getTsExtensionsForRules } from "./tsExtensions"
import { sortRules, writeMainFile } from "./utils"

const main = async () => {
  const rules = [...(await getRulesFromJsonMetadata()), ...extraRulesToDisable]

  const rulesWithTsExtends = [
    ...rules,
    ...getJsBaseRules(rules),
    ...getTsExtensionsForRules(rules),
  ]

  const rulesNoDuplicates = [...new Set(rulesWithTsExtends)]
  const sortedRules = sortRules(rulesNoDuplicates)

  writeMainFile(sortedRules)
  await createPrettierFile()

  console.log(`Generated ${filenames.index} & ${filenames.prettier}!`)
}

main().catch((err) => {
  throw err
})
