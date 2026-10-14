/**
 * Массовая перекраска: циан -> неоново-красный.
 * Запуск: node scripts/recolor.mjs
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dirs = ["app", "components"];

const replacements = [
  ["rgba(0,229,255", "rgba(255,45,77"],
  ["rgba(0, 229, 255", "rgba(255, 45, 77"],
  ["#070d10", "#120709"],
];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (/\.(tsx|ts|css)$/.test(name)) yield p;
  }
}

let changed = 0;
for (const d of dirs) {
  for (const file of walk(join(root, d))) {
    let text = readFileSync(file, "utf8");
    const before = text;
    for (const [from, to] of replacements) text = text.split(from).join(to);
    if (text !== before) {
      writeFileSync(file, text, "utf8");
      changed++;
      console.log("recolored:", file.replace(root + "\\", ""));
    }
  }
}
console.log(`Done: ${changed} files updated`);
