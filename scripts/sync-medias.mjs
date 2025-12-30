import fs from 'node:fs';
import path from 'node:path';

function copyDir(from, to) {
  const entries = fs.readdirSync(from, { withFileTypes: true });
  fs.mkdirSync(to, { recursive: true });
  for (const entry of entries) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyDir(src, dest);
    } else if (entry.isFile()) {
      fs.copyFileSync(src, dest);
    }
  }
}

export function syncMedias(logger) {
  const srcDir = path.resolve('src/content/medias');
  const destDir = path.resolve('public/medias');

  if (!fs.existsSync(srcDir)) {
    logger?.warn?.('Pas de dossier src/content/medias à synchroniser.');
    return;
  }

  fs.rmSync(destDir, { recursive: true, force: true });
  copyDir(srcDir, destDir);
  logger?.info?.(`Médias copiés vers ${path.relative(process.cwd(), destDir)}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  syncMedias(console);
}
