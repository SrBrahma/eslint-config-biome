/** Attribution for eslint-config-prettier is available at the ATTRIBUTION.md and in the eslint-config-prettier.js. */

import { extraRulesToDisable, filenames } from "./consts.js"
import { getEquivalentRules, getRecommendedBiomeRules } from "./fetch.js"
import { createPrettierFile } from "./prettier.js"
import { getJsBaseRules, getTsExtensionsForRules } from "./tsExtensions.js"
import { sortRules, writeFile } from "./utils.js"

const main = async () => {
  const recommendedBiomeRules = await getRecommendedBiomeRules()
  const equivalentRules = await getEquivalentRules()

  const eslintRulesToDisable = recommendedBiomeRules
    .map(
      (biomeRule) =>
        equivalentRules.find(
          (equivalentRule) => equivalentRule.biome === biomeRule,
        )?.eslint,
    )
    .filter(Boolean) as Array<string>

  const rules = [...eslintRulesToDisable, ...extraRulesToDisable]
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

await main()
