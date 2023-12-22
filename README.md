# eslint-config-biome

<div align="center">

[![npm](https://img.shields.io/npm/v/eslint-config-biome)](https://www.npmjs.com/package/eslint-config-biome)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
<!--- [![npm](https://img.shields.io/npm/dm/eslint-config-biome)](https://www.npmjs.com/package/eslint-config-biome) -->

</div>

<br/>

Disables ESLint rules that have an [**equivalent and recommended**](https://github.com/biomejs/biome/discussions/3) [Biome](https://biomejs.dev/), allowing the simultaneous use of ESLint and Biome. 

The disabled rules include 

## 💿 Installation

```bash
npm install -D eslint-config-biome
```

- `.eslintrc.*`: Add `"biome"` as the last item in the `extends` field.

    ```json
    {
      "extends": [
        "other-configs",
        "biome"
      ]
    }
    ```

- `eslint.config.js`: Import `eslint-config-biome` and have it as the last item in the configuration array

    ```js
    import eslintConfigBiome from "eslint-config-biome";
    
    export default [
      otherConfigs,
      eslintConfigBiome,
    ];
    ```

## ℹ️ Info

- In your .eslintrc, you can instead have this in `overrides`:

    ```
    "overrides": [{
      files: ["*.ts", "*.js", "*.tsx", "*.jsx"],
      extends: ["biome"],
    }],
    ```

    - Being it the last item in the array, this makes other existing overrides to have this patch applied. This also overrides any rules that may lie in the root of your .eslintrc under `rules`.

- You should use it together with [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) so formatting rules are also disabled as Biome has almost 100% compatibility with prettier. It may eventually be integrated into this package, so you won't need to also install it.

- In VSCode, to apply Biome and ESLint on save, you should have these in your settings.json:

    ```json
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit",
      "source.organizeImports.biome": "explicit",
      "quickfix.biome": "explicit"
    },
    "editor.defaultFormatter": "biomejs.biome"
    ```

- Soon there will be a npx tool to disable ESLint rules based on your biome config file, so non-recommended biome rules will also be considered.
  
This package had its origin [in this discussion](https://github.com/biomejs/biome/discussions/3#discussioncomment-7876363). Thanks [DaniGuardiola
](https://github.com/DaniGuardiola) for [your initial code](https://github.com/biomejs/biome/discussions/3#discussioncomment-7910787)!


## 📰 [Changelog](CHANGELOG.md)
