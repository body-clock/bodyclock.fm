// SVGs are the editable source of truth; PNG/ICO are generated distribution assets.
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const favicon = await readFile(new URL('public/favicon.svg', root));
const preview = await readFile(new URL('public/og-image.svg', root));
await sharp(preview).resize(1200, 630).png().toFile(new URL('public/og-image.png', root).pathname);

// ICO directory with one PNG payload for each common favicon size.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(size => sharp(favicon).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * images.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((image, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(image.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
await writeFile(new URL('public/favicon.ico', root), Buffer.concat([header, ...images]));
console.log('Generated 1200×630 social preview and 16/32/48px favicon fallback.');
