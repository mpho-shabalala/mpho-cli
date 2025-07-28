import fs from 'fs';
import path from 'path';
import { log } from '../utils/logger.js';

export function initProject() {
  const folders = ['src', 'tests', 'docs'];

  folders.forEach(folder => {
    const dir = path.resolve(folder);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      log.success(`Created: ${folder}/`);
    } else {
      log.warn(`Already exists: ${folder}/`);
    }
  });

  const entryFile = path.resolve('src', 'index.js');
  if (!fs.existsSync(entryFile)) {
    fs.writeFileSync(entryFile, '// Entry file\n');
    log.success('Created: src/index.js');
  }
}
