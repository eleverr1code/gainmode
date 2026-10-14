/**
 * Массовая перекраска: красная палитра -> синяя (по новому референсу).
 * Запуск: node scripts/recolor.mjs
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dirs = ["app", "components", "public"];

const replacements = [
  ["rgba(255,45,77", "rgba(59,130,246"],
  ["rgba(255, 45, 77", "rgba(59, 130, 246"],
  ["#120709", "#0c1a2e"],
  ["#0a0507", "#0a1526"],
  ["rgba(10,5,7,", "rgba(10,21,38,"],
  ["rgba(5,9,12,", "rgba(10,21,38,"],
  ["#ff2d4d", "#3d8bfd"],
  ["#1e0d13", "#14263f"],
  ["#0d0609", "#0a1526"],
  ["#a3898f", "#8ba3bd"],
  ["#ffb3c0", "#a8c8f8"],
];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (/\.(tsx|ts|css|svg)$/.test(name)) yield p;
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

