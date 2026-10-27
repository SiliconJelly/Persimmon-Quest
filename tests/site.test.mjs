import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { products, productBySlug, RENAMED } from "../src/app/catalog.ts";

const root = new URL("..", import.meta.url).pathname;
const exists = (url) => existsSync(join(root, "public", decodeURI(url)));

// Every string inside the catalog that points at a picture or film
function mediaPaths(value, out = new Set(), seen = new WeakSet()) {
  if (typeof value === "string") { if (value.startsWith("/media/")) out.add(value); return out; }
  if (!value || typeof value !== "object" || seen.has(value)) return out;
  seen.add(value);
  for (const v of Object.values(value)) mediaPaths(v, out, seen);
  return out;
}

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? sourceFiles(path) : /\.(tsx?|css)$/.test(name) ? [path] : [];
  });
}

test("every product has a unique slug and at least one colourway", () => {
  const slugs = products.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const p of products) assert.ok(p.colorways.length > 0, p.slug);
});

test("older slugs, including the Brainwear names, still open a product", () => {
  for (const [from, to] of Object.entries(RENAMED)) assert.equal(productBySlug(from)?.slug, to, from);
  assert.equal(productBySlug("brainwear-duo")?.name, "Sage Duo");
});

test("every picture the catalog points to is in public/media", () => {
  const missing = [...mediaPaths(products)].filter((url) => !url.includes("<") && !exists(url));
  assert.deepEqual(missing, []);
});

test("every fixed media path written in the pages and styles is in public/media", () => {
  const missing = [];
  for (const file of sourceFiles(join(root, "src"))) {
    for (const [url] of readFileSync(file, "utf8").matchAll(/\/media\/[^"'`\s)${}]+\.(?:webp|avif|png|jpe?g|mp4|svg)/g)) {
      if (!url.includes("<") && !exists(url)) missing.push(`${url} (${file.slice(root.length)})`);
    }
  }
  assert.deepEqual(missing, []);
});
