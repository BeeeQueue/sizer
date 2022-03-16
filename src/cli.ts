import { format } from "bytes"
import { program } from "commander"
import glob from "fast-glob"

import { getCompressedFileSizes } from "./compress"

type Options = {
  brotli?: boolean
}

void (async () => {
  const command = program
    .name("sizer")
    .version(`sizer v${PKG_VERSION}`)
    .argument("<glob>", "File path glob to analyze")
    .option("-B, --brotli", "Compress using Brotli (slow!)")
    .action(async (fileGlob: string, { brotli }: Options) => {
      const filePaths = await glob(fileGlob, { onlyFiles: true, unique: true })

      const entries = await getCompressedFileSizes(filePaths, brotli)

      for (const [filePath, sizes] of entries) {
        console.log(`${filePath}: ${format(sizes[0])} / ${format(sizes[1])}`)
      }
    })
    .showSuggestionAfterError()
    .exitOverride()

  await command.parseAsync(process.argv).catch(() => null)
})()