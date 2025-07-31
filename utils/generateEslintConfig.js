import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateEslintConfig() {
  const sourcePath = path.join(__dirname, '../templates/.eslintrc.cjs');
  const destPath = path.join(process.cwd(), '.eslintrc.cjs');

  const content = fs.readFileSync(sourcePath, 'utf-8');
  fs.writeFileSync(destPath, content, 'utf-8');
}
