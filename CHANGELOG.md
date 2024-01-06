# Changelog

## 1.4.1

- Missing eslint-config-prettier.js file in bundle

## 1.4.0

- `eslint-config-prettier` is now added automatically. You can remove it from your dependencies and your eslint config.

- Updated README so setups using .eslintrc.* suggests `"overrides"` instead of `"extends"`

## 1.3.0

- Now relevant [TS Extension rules](https://typescript-eslint.io/rules/#extension-rules) are added automatically to the index.js. These were added:

    ```json
    "@typescript-eslint/dot-notation": "off",
    "@typescript-eslint/no-loss-of-precision": "off",
    "@typescript-eslint/no-dupe-class-members": "off",
    "@typescript-eslint/default-param-last": "off",
    "@typescript-eslint/no-useless-constructor": "off",
    "@typescript-eslint/no-redeclare": "off",
    ```

    Thank you [Nicolas](https://discord.com/channels/1132231889290285117/1132231889911029825/1187781046167666790) for the idea!
- Added an awesome logo to the project ;)

## 1.2.0

- Added `"simple-import-sort/imports": "off"`.
- Added some tests for improved maturity of this package

## 1.1.0

- Fix missing plugin name in the start of the rule name.
- Remove Rust Clippy rules from output as they aren't related.

## 1.0.5-6

- Fix wrong command to install the package in the README. It was written `eslint-plugin-biome` instead of `eslint-config-biome`.

## 1.0.4

- Change description and repository in package.json

## 1.0.3

- Improve generated comment

## 1.0.2

- Improve Readme

## 1.0.1

- Remove unused deps

## 1.0.0

- Published

## 0.1.0

- Started project
