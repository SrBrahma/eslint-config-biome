import path from "node:path"
import { rootPath } from "./consts"

/** https://typescript-eslint.io/rules/#extension-rules */
export const getTsExtensionsForRules = (
  rules: Array<string>,
): Array<string> => {
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
/** The Biome docs has some rules just under the Typescript table, but we also need to disable the JS base rules. */
export const getJsBaseRules = (allRules: Array<string>): Array<string> => {
  const glob = new Bun.Glob("*.js")
  const jsRules = [
    ...glob.scanSync(path.resolve(rootPath, "node_modules/eslint/lib/rules")),
  ]
    .map((s) => s.replace(".js", ""))
    .toSorted() // Sort to avoid diffs

  const tsRules = allRules.filter((rule) => rule.includes("@typescript-eslint"))

  const baseRules = jsRules.filter((jsRule) =>
    tsRules.find((tsRule) => tsRule.includes(jsRule)),
  )

  return baseRules
}
