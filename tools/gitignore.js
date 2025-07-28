import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const gitignoreContent = `# Node
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# Logs
logs
*.log
*.log.*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Testing
coverage/
.nyc_output/
.vitest/

# Build
dist/
build/
*.tsbuildinfo

# Misc
.env
.env.*
.DS_Store
*.local
.cache/
.idea/
.vscode/
*.sublime-project
*.sublime-workspace

# Mac system files
Thumbs.db
.DS_Store
`;

export function generateGitignore() {
  const filePath = path.join(process.cwd(), '.gitignore');

  if (fs.existsSync(filePath)) {
    console.log(chalk.yellow('⚠️  .gitignore already exists. Skipping file creation.'));
    return;
  }

  fs.writeFileSync(filePath, gitignoreContent);
  console.log(chalk.green('✅ .gitignore file generated successfully.'));
}
