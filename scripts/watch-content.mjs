import { watch } from 'fs';
import { readdir, stat } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const DEBOUNCE_MS = 350;
const rootDir = fileURLToPath(new URL('../', import.meta.url));
const contentDir = path.join(rootDir, 'src', 'content');
const mediasDir = path.join(contentDir, 'medias');
const watchers = new Map();
let buildTimer;
let buildInProgress = false;
let pendingBuild = false;
let lastTrigger = 'startup';

function log(...args) {
  console.log('[watch-content]', ...args);
}

async function watchDirectory(dir) {
  if (watchers.has(dir)) {
    return;
  }

  const watcher = watch(dir, { persistent: true }, (eventType, filename) => {
    const target = filename ? path.join(dir, filename) : dir;
    scheduleBuild(`${eventType} ${filename || ''}`.trim());
    if (eventType === 'rename') {
      void maybeWatchPath(target);
    }
  });

  watcher.on('error', (err) => {
    log(`watcher error (${dir}):`, err.message || err);
  });

  watchers.set(dir, watcher);
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      await watchDirectory(path.join(dir, entry.name));
    }
  }
}

async function maybeWatchPath(target) {
  try {
    const stats = await stat(target);
    if (stats.isDirectory()) {
      await watchDirectory(target);
    }
  } catch {
    // ignore files that no longer exist
  }
}

function runSyncMedias() {
  const sync = spawn('node', ['scripts/sync-medias.mjs'], {
    stdio: 'inherit',
    shell: false,
  });
  sync.on('exit', (code) => {
    if (code !== 0) {
      log('sync-medias failed with code', code);
    } else {
      log('media sync complete');
    }
  });
  sync.on('error', (err) => {
    log('unable to spawn sync-medias:', err.message || err);
  });
}

function scheduleBuild(reason = 'content change') {
  lastTrigger = reason;
  if (buildTimer) {
    clearTimeout(buildTimer);
  }
  buildTimer = setTimeout(executeBuild, DEBOUNCE_MS);
}

function executeBuild() {
  buildTimer = undefined;
  if (buildInProgress) {
    pendingBuild = true;
    return;
  }

  buildInProgress = true;
  log('triggering build because', lastTrigger);

  const child = spawn('npm', ['run', 'build'], {
    stdio: 'inherit',
    shell: false,
  });

  child.on('exit', (code, signal) => {
    if (code !== 0) {
      log('build failed with code', code, signal ? `signal ${signal}` : '');
    } else {
      log('build finished');
      runSyncMedias();
    }
    buildInProgress = false;
    if (pendingBuild) {
      pendingBuild = false;
      scheduleBuild('queued change');
    }
  });

  child.on('error', (err) => {
    log('unable to spawn build process:', err.message || err);
    buildInProgress = false;
  });
}

function closeWatchers() {
  for (const watcher of watchers.values()) {
    watcher.close();
  }
  watchers.clear();
}

async function ensureDirectory(target, label) {
  try {
    const stats = await stat(target);
    if (!stats.isDirectory()) {
      throw new Error('target exists but is not a directory');
    }
  } catch (err) {
    log('missing', target, `— please create your ${label} directory before starting.`);
    process.exit(1);
  }
}

async function start() {
  await ensureDirectory(contentDir, 'content');
  await ensureDirectory(mediasDir, 'content/medias');
  await watchDirectory(contentDir);
  await watchDirectory(mediasDir);
  scheduleBuild('initial scan');
  log('watching', contentDir, 'and', mediasDir);
}

process.on('SIGINT', () => {
  log('shutting down');
  closeWatchers();
  process.exit(0);
});

start().catch((err) => {
  console.error('[watch-content] fatal error:', err);
  closeWatchers();
  process.exit(1);
});
