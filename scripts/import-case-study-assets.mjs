#!/usr/bin/env node
/**
 * Imports the original public case-study artwork into production-safe local files.
 *
 * Source: the legacy Adelogix deployment that hosts the exact screenshots named
 * in public/images/case-studies/_manifest.json. The images are converted once to
 * high-quality WebP files and committed so the website never depends on that
 * external deployment at runtime.
 */
import { mkdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const manifestPath = join(root, "public/images/case-studies/_manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const legacyBase = "https://adelogics.vercel.app/assets/case-studies";
const failures = [];

async function download(url, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { "User-Agent": "Adelogix asset migration" } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }
  throw lastError;
}

for (const item of manifest) {
  const url = `${legacyBase}/${item.project}/${encodeURIComponent(item.source_file)}`;
  const destination = join(root, "public/images/case-studies", item.project, item.file);
  try {
    const source = await download(url);
    const image = sharp(source, { failOn: "error" }).rotate();
    const metadata = await image.metadata();
    if (metadata.width !== item.width || metadata.height !== item.height) {
      throw new Error(`Unexpected dimensions ${metadata.width}×${metadata.height}; expected ${item.width}×${item.height}`);
    }
    await mkdir(dirname(destination), { recursive: true });
    await image.webp({ quality: 92, effort: 5, smartSubsample: true }).toFile(destination);
    console.log(`✓ ${item.project}/${item.file}`);
  } catch (error) {
    failures.push(`${item.project}/${item.source_file}: ${error instanceof Error ? error.message : String(error)}`);
    console.error(`✗ ${failures.at(-1)}`);
  }
}

if (failures.length) {
  console.error(`\n${failures.length} original assets could not be imported.`);
  process.exit(1);
}

console.log(`\nImported ${manifest.length} original case-study images.`);
