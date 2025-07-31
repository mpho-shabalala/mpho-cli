import fs from 'fs';
import path from 'path';
import { log } from '../../utils/logger.js';

const template = `# Project Title

One-liner description of your project.

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`bash
npm start
\`\`\`

## License

MIT License
`;

export function generateReadme() {
  const filePath = path.resolve('README.md');

  if (fs.existsSync(filePath)) {
    log.error('README.md already exists in this folder.');
    return;
  }

  fs.writeFileSync(filePath, template, 'utf-8');
  log.success('README.md has been generated.');
}
