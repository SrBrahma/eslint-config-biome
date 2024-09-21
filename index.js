/**
 * File automatically created by scripts/index.ts.
 *
 * These are ESLint rules that have corresponding and recommended Biome rules.
 */
module.exports = {
  rules: {
    ...require("./eslint-config-prettier.js").rules,
    "constructor-super": "off",
    "default-case-last": "off",
    "default-param-last": "off",
    "dot-notation": "off",
    "eqeqeq": "off",
    "for-direction": "off",
    "getter-return": "off",
    "no-async-promise-executor": "off",
    "no-case-declarations": "off",
    "no-class-assign": "off",
    "no-compare-neg-zero": "off",
    "no-cond-assign": "off",
    "no-const-assign": "off",
    "no-constant-condition": "off",
    "no-constructor-return": "off",
    "no-control-regex": "off",
    "no-debugger": "off",
    "no-delete-var": "off",
    "no-dupe-args": "off",
    "no-dupe-class-members": "off",
    "no-dupe-keys": "off",
    "no-duplicate-case": "off",
    "no-else-return": "off",
    "no-empty": "off",
    "no-empty-character-class": "off",
    "no-empty-pattern": "off",
    "no-eval": "off",
    "no-ex-assign": "off",
    "no-extra-boolean-cast": "off",
    "no-extra-label": "off",
    "no-fallthrough": "off",
    "no-func-assign": "off",
    "no-global-assign": "off",
    "no-import-assign": "off",
    "no-inner-declarations": "off",
    "no-label-var": "off",
    "no-labels": "off",
    "no-lone-blocks": "off",
    "no-loss-of-precision": "off",
    "no-misleading-character-class": "off",
    "no-new-native-nonconstructor": "off",
    "no-new-symbol": "off",
    "no-nonoctal-decimal-escape": "off",
    "no-obj-calls": "off",
    "no-param-reassign": "off",
    "no-prototype-builtins": "off",
    "no-redeclare": "off",
    "no-regex-spaces": "off",
    "no-return-assign": "off",
    "no-self-assign": "off",
    "no-self-compare": "off",
    "no-sequences": "off",
    "no-setter-return": "off",
    "no-shadow-restricted-names": "off",
    "no-sparse-array": "off",
    "no-this-before-super": "off",
    "no-unneeded-ternary": "off",
    "no-unreachable": "off",
    "no-unsafe-finally": "off",
    "no-unsafe-negation": "off",
    "no-unsafe-optional-chaining": "off",
    "no-unused-labels": "off",
    "no-use-before-define": "off",
    "no-useless-catch": "off",
    "no-useless-computed-key": "off",
    "no-useless-constructor": "off",
    "no-useless-rename": "off",
    "no-var": "off",
    "no-with": "off",
    "one-var": "off",
    "prefer-arrow-callback": "off",
    "prefer-const": "off",
    "prefer-exponentiation-operator": "off",
    "prefer-numeric-literals": "off",
    "prefer-regex-literals": "off",
    "prefer-rest-params": "off",
    "prefer-template": "off",
    "require-yield": "off",
    "use-isnan": "off",
    "valid-typeof": "off",
    "@mysticatea/eslint-plugin/no-this-in-static": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/consistent-type-exports": "off",
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/default-param-last": "off",
    "@typescript-eslint/dot-notation": "off",
    "@typescript-eslint/no-dupe-class-members": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-extra-non-null-assertion": "off",
    "@typescript-eslint/no-extraneous-class": "off",
    "@typescript-eslint/no-import-type-side-effects": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-invalid-void-type": "off",
    "@typescript-eslint/no-loss-of-precision": "off",
    "@typescript-eslint/no-misused-new": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-redeclare": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-unnecessary-type-arguments": "off",
    "@typescript-eslint/no-unnecessary-type-constraint": "off",
    "@typescript-eslint/no-unsafe-declaration-merging": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-useless-constructor": "off",
    "@typescript-eslint/no-useless-empty-export": "off",
    "@typescript-eslint/no-useless-template-literals": "off",
    "@typescript-eslint/prefer-as-const": "off",
    "@typescript-eslint/prefer-enum-initializers": "off",
    "@typescript-eslint/prefer-function-type": "off",
    "@typescript-eslint/prefer-literal-enum-member": "off",
    "@typescript-eslint/prefer-namespace-keyword": "off",
    "@typescript-eslint/prefer-optional-chain": "off",
    "jest/max-nested-describe": "off",
    "jest/no-duplicate-hooks": "off",
    "jest/no-export": "off",
    "jest/no-focused-tests": "off",
    "jsx-a11y/alt-text": "off",
    "jsx-a11y/anchor-has-content": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/aria-activedescendant-has-tabindex": "off",
    "jsx-a11y/aria-props": "off",
    "jsx-a11y/aria-proptypes": "off",
    "jsx-a11y/aria-role": "off",
    "jsx-a11y/aria-unsupported-elements": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/heading-has-content": "off",
    "jsx-a11y/html-has-lang": "off",
    "jsx-a11y/iframe-has-title": "off",
    "jsx-a11y/img-redundant-alt": "off",
    "jsx-a11y/interactive-supports-focus": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/lang": "off",
    "jsx-a11y/media-has-caption": "off",
    "jsx-a11y/mouse-events-have-key-events": "off",
    "jsx-a11y/no-access-key": "off",
    "jsx-a11y/no-aria-hidden-on-focusable": "off",
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/no-distracting-elements": "off",
    "jsx-a11y/no-interactive-element-to-noninteractive-role": "off",
    "jsx-a11y/no-noninteractive-element-to-interactive-role": "off",
    "jsx-a11y/no-noninteractive-tabindex": "off",
    "jsx-a11y/no-redundant-roles": "off",
    "jsx-a11y/role-has-required-aria-props": "off",
    "jsx-a11y/scope": "off",
    "jsx-a11y/tabindex-no-positive": "off",
    "react/button-has-type": "off",
    "react/jsx-key": "off",
    "react/jsx-no-comment-textnodes": "off",
    "react/jsx-no-duplicate-props": "off",
    "react/jsx-no-target-blank": "off",
    "react/jsx-no-useless-fragment": "off",
    "react/no-array-index-key": "off",
    "react/no-children-prop": "off",
    "react/no-danger": "off",
    "react/no-danger-with-children": "off",
    "react/void-dom-elements-no-children": "off",
    "react-hooks/exhaustive-deps": "off",
    "simple-import-sort/imports": "off",
    "stylistic/jsx-self-closing-comp": "off",
    "unicorn/new-for-builtins": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-instanceof-array": "off",
    "unicorn/no-static-only-class": "off",
    "unicorn/no-thenable": "off",
    "unicorn/no-typeof-undefined": "off",
    "unicorn/no-useless-switch-case": "off",
    "unicorn/prefer-array-flat-map": "off",
    "unicorn/prefer-node-protocol": "off",
    "unicorn/prefer-number-properties": "off",
  }
}
