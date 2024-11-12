import { resolve } from "node:path";
import { lstatSync, readdirSync } from "fs";
import { join, relative } from "path";
import { promises as fs } from "node:fs";
import { describe } from "vitest";
import { setup } from "@nuxt/test-utils/e2e";
import { toArray } from "@antfu/utils";

interface FileFilter {
  startsWith?: string | string[];
  startsWithout?: string | string[];
  endsWith?: string | string[];
  endsWithout?: string | string[];
}

function* walkDir(
  directory: string,
  filter: FileFilter = {},
  rootDirectory?: string
): IterableIterator<{ file: string; directory: string; fullPath: string; relativePath: string }> {
  rootDirectory ||= directory;

  for (const file of readdirSync(directory)) {
    const fullPath = resolve(directory, file);
    const stats = lstatSync(fullPath);

    if (stats.isFile()) {
      if (
        (!filter.startsWith || toArray(filter.startsWith).some(v => file.startsWith(v)))
        && (!filter.startsWithout || toArray(filter.startsWithout).every(v => !file.startsWith(v)))
        && (!filter.endsWith || toArray(filter.endsWith).some(v => file.endsWith(v)))
        && (!filter.endsWithout || toArray(filter.endsWithout).every(v => !file.endsWith(v)))
      ) {
        yield { file, directory, fullPath, relativePath: join(relative(rootDirectory, directory), file) };
      }
    }
    else if (stats.isDirectory()) {
      yield * walkDir(fullPath, filter, rootDirectory);
    }
  }
}

describe("server", async () => {
  const resolved = resolve(process.cwd(), ".data", "test.db");
  await fs.rm(resolved, { force: true, recursive: true });

  await setup();

  for (const { fullPath } of walkDir("./tests/basic", { endsWith: ".test.ts" })) {
    await import(fullPath);
  }
});
