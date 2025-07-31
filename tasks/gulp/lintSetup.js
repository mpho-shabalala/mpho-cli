import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function runLintSetupTask() {
  const templatePath = path.join(__dirname, '../../templates/.eslintrc.cjs');
  const targetPath = path.join(process.cwd(), '.eslintrc.cjs');

  if (fs.existsSync(targetPath)) {
    console.log('[setup] ESLint config already exists.');
    return;
  }

  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  fs.writeFileSync(targetPath, templateContent, 'utf-8');
  console.log('[setup] ESLint config created at .eslintrc.cjs');
}
