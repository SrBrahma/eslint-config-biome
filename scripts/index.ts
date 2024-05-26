/** Attribution for eslint-config-prettier is available at the ATTRIBUTION.md and in the eslint-config-prettier.js. */

import { extraRulesToDisable, filenames } from "./consts"
import { getEquivalentRulesFromDocs } from "./fetchFromDocs"
import { getEslintEquivalentRulesFromGithub } from "./fetchFromGithub.js"
import { createPrettierFile } from "./prettier"
import { getJsBaseRules, getTsExtensionsForRules } from "./tsExtensions"
import { sortRules, writeFile } from "./utils"

const main = async () => {
  const rules = [
    ...(await getEquivalentRulesFromDocs()),
    ...extraRulesToDisable,
    ...(await getEslintEquivalentRulesFromGithub()),
  ]

  const rulesWithTsExtends = [
    ...rules,
    ...getJsBaseRules(rules),
    ...getTsExtensionsForRules(rules),
  ]

  const rulesNoDuplicates = [...new Set(rulesWithTsExtends)]

  writeFile(sortRules(rulesNoDuplicates))
  await createPrettierFile()

  console.log(`Generated ${filenames.index} & ${filenames.prettier}!`)
}

main().catch((err) => {
  throw err
})
