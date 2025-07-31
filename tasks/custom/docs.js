import fs from 'fs';
import path from 'path';
import { log } from '../../utils/logger.js';

export function runDocsTask() {
  const srcDir = path.resolve('src');
  const outputFile = path.resolve('DOCS.md');

  if (!fs.existsSync(srcDir)) {
    log.warn('No "src" directory found.');
    return;
  }

  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.js'));
  let docs = '# Project Documentation\n\n';

  for (const file of files) {
    const content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
    const matches = content.match(/\/\*\*([\s\S]*?)\*\//g);
    if (matches) {
      docs += `## ${file}\n\n`;
      matches.forEach(comment => {
        docs += comment.replace('/**', '').replace('*/', '').trim() + '\n\n';
      });
    }
  }

  fs.writeFileSync(outputFile, docs);
  log.success(`Documentation generated in ${outputFile}`);
}
