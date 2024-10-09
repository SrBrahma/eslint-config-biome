/**
 * For future references:
 *
 * Origin: https://github.com/SrBrahma/eslint-config-biome/issues/5#issuecomment-2399547365
 * Rules Metadata: https://biomejs.dev/metadata/rules.json
 * Json Schema: https://biomejs.dev/metadata/schema.json
 * Tool to TS type, then requires manual changes: https://transform.tools/json-schema-to-typescript
 * Helper: https://10015.io/tools/json-tree-viewer
 */

type FixKind = "none" | "safe" | "unsafe"

type RuleSourceKind = "sameLogic" | "inspired"

type Languages = "css" | "js" | "json" | "jsx" | "ts"

const ruleSourceToPrefix: Record<string, string> = {
  eslint: "",
  eslintGraphql: "graphql/",
  eslintImport: "import/",
  eslintImportAccess: "import-access/",
  eslintJest: "jest/",
  eslintJsxA11y: "jsx-a11y/",
  eslintReact: "react/",
  eslintReactHooks: "react-hooks/",
  eslintReactRefresh: "react-refresh/",
  eslintSolid: "solid/",
  eslintSonarJs: "sonarjs/",
  eslintStylistic: "stylistic/",
  eslintTypeScript: "@typescript-eslint/",
  eslintUnicorn: "unicorn/",
  eslintUnusedImports: "unused-imports/",
  eslintMysticatea: "@eslint-community/eslint-plugin-mysticatea/",
  eslintBarrelFiles: "barrel-files/",
  eslintN: "n/",
  eslintNext: "@next/eslint-plugin-next/",
  eslintNoSecrets: "no-secrets/",
}

const skippedRulesSources = new Set<string>()

const usedRulesSources = new Set<string>()

const getEslintRulePrefix = (
  ruleSource: string,
  ruleName: string,
): string | undefined => {
  const rulePrefix = ruleSourceToPrefix[ruleSource]

  if (rulePrefix === undefined) {
    skippedRulesSources.add(ruleSource)

    return undefined
  }

  usedRulesSources.add(ruleSource)

  return `${rulePrefix}${ruleName}`
}

export type RuleMetadata = {
  /**
   * It marks if a rule is deprecated, and if so a reason has to be provided.
   */
  deprecated?: boolean
  docs?: string
  /**
   * The kind of fix
   */
  fixKind?: FixKind
  /**
   * The rule's documentation URL
   */
  link?: string
  /**
   * The name of this rule, displayed in the diagnostics it emits
   */
  name?: string
  /**
   * Whether a rule is recommended or not
   */
  recommended?: boolean
  /**
   * The source kind of the rule
   */
  sourceKind?: RuleSourceKind | null
  /**
   * The source metadata of the rule
   */
  sources?: Array<Record<string, string>>
  /**
   * The version when the rule was implemented
   */
  version?: string
}

export type RulesGroup = {
  languages: Record<
    Languages,
    {
      [ruleSubSet: string]: {
        [biomeRule: string]: RuleMetadata
      }
    }
  >
  numberOrRules?: number
}

export type RulesMetadata = Record<string, RulesGroup>

const getAllRules = async (): Promise<Array<RuleMetadata>> => {
  const response = await fetch("https://biomejs.dev/metadata/rules.json")
  const metadata = (await response.json()) as RulesMetadata

  const rules: Array<RuleMetadata> = []

  Object.values(metadata).forEach((ruleGroup) => {
    Object.values(ruleGroup.languages).forEach((language) => {
      Object.values(language).forEach((ruleSubSet) => {
        Object.values(ruleSubSet).forEach((rule) => {
          rules.push(rule)
        })
      })
    })
  })

  return rules
}

export const getRulesFromJsonMetadata = async (): Promise<Array<string>> => {
  const allRules = await getAllRules()

  const filteredRules = allRules.filter(
    (rule) => rule.recommended && rule.sources?.length,
  )

  const rulesToDisable: Array<string> = []

  filteredRules.forEach((rule) => {
    rule.sources?.forEach((ruleSource) => {
      if (Object.keys(ruleSource).length > 1)
        throw new Error("Rule source has more than one key!")
      const key = Object.keys(ruleSource)[0]

      if (!key) throw new Error("Rule source has no key!")

      const val = ruleSource[key]

      if (!val) throw new Error("Rule source has no value!")

      const ruleToDisable = getEslintRulePrefix(key, val)

      if (ruleToDisable) rulesToDisable.push(ruleToDisable)
    })
  })

  console.warn(
    "Skipped the following rule sources:",
    [...skippedRulesSources.values()].sort(),
    "Expected: clippy, stylelint.",
  )

  console.info(
    "Used the following rule sources:",
    [...usedRulesSources.values()].sort(),
  )

  return rulesToDisable
}
