import fs from "node:fs"
import { filenames } from "./consts"

export const createPrettierFile = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/prettier/eslint-config-prettier/main/index.js",
  )
  const attribution = `/**
 * eslint-config-prettier © 2017-2023 Simon Lydell and contributors
 * https://github.com/prettier/eslint-config-prettier
 *
 * This code is licensed under the MIT License (MIT).
 *
 * File automatically created by scripts/index.ts.
 */
`
  const text = attribution + (await response.text())

  fs.writeFileSync(filenames.prettier, text)
}
