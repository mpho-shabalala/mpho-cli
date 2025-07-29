import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export function drawTree(
  dir,
  options,
  prefix = '',
  currentDepth = 0,
  isLast = true
) {
  const {
    depthLimit = Infinity,
    includeNodeModules = false,
    fileExtensions = [],
    excludePatterns = []
  } = options;

  if (currentDepth > depthLimit) return { treeStr: '', stats: { files: 0, dirs: 0, size: 0 } };

  let items;
  try {
    items = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return { treeStr: '', stats: { files: 0, dirs: 0, size: 0 } };
  }

  // Filter items
  items = items.filter(item => {
    if (!includeNodeModules && item.name === 'node_modules') return false;
    if (excludePatterns.includes(item.name)) return false;
    return true;
  });

  // Separate folders and files
  const folders = items.filter(i => i.isDirectory());
  const files = items.filter(i => i.isFile());

  // Filter files by extension
  const filteredFiles = fileExtensions.length
    ? files.filter(f => fileExtensions.includes(path.extname(f.name)))
    : files;

  const children = [...folders, ...filteredFiles];

  let treeStr = '';
  let totalFiles = 0;
  let totalDirs = 0;
  let totalSize = 0;

  children.forEach((item, index) => {
    const lastChild = index === children.length - 1;
    const connector = lastChild ? '└── ' : '├── ';

    const itemPath = path.join(dir, item.name);
    let stats;
    try {
      stats = fs.statSync(itemPath);
    } catch {
      stats = null;
    }

    let displayName = item.name;

    // Format size and date for files
    let sizeStr = '';
    let mtimeStr = '';
    if (stats && item.isFile()) {
      sizeStr = ` [${formatBytes(stats.size)}]`;
      mtimeStr = ` (${stats.mtime.toLocaleDateString()} ${stats.mtime.toLocaleTimeString()})`;
      totalFiles += 1;
      totalSize += stats.size;
    } else if (item.isDirectory()) {
      totalDirs += 1;
    }

    // Color coding
    if (item.isDirectory()) {
      displayName = chalk.cyan(displayName);
      if (item.name === 'node_modules') displayName = chalk.yellow(displayName);
    } else {
      displayName = chalk.gray(displayName);
    }

    treeStr += prefix + connector + displayName + sizeStr + mtimeStr + '\n';

    if (item.isDirectory()) {
      const { treeStr: childTree, stats: childStats } = drawTree(
        itemPath,
        options,
        prefix + (lastChild ? '    ' : '│   '),
        currentDepth + 1,
        lastChild
      );
      treeStr += childTree;
      totalFiles += childStats.files;
      totalDirs += childStats.dirs;
      totalSize += childStats.size;
    }
  });

  return {
    treeStr,
    stats: {
      files: totalFiles,
      dirs: totalDirs,
      size: totalSize
    }
  };
}

// Helper function for human-readable file sizes
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}
