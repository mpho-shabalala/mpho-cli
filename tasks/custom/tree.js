import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import stripAnsi from 'strip-ansi';
import chalk from 'chalk';
import { drawTree } from '../../utils/treeRenderer.js';
import {formatBytes} from '../../utils/formatBytes.js'


export async function runTreeTask() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'depth',
      message: 'Select tree depth:',
      choices: [
        { name: '0 - Only root folder', value: 0 },
        { name: '1 - Immediate children', value: 1 },
        { name: '2 - Children of children', value: 2 },
        { name: '3 - Three levels deep', value: 3 },
        { name: 'Full tree (no limit)', value: Infinity }
      ],
      default: 1
    },
    {
      type: 'confirm',
      name: 'includeNodeModules',
      message: 'Include files inside node_modules?',
      default: false
    },
    {
      type: 'confirm',
      name: 'excludeGit',
      message: 'Exclude .git and .gitignore files/folders?',
      default: true
    },
    {
      type: 'input',
      name: 'fileExtensions',
      message:
        'Filter files by extensions (comma separated, e.g. .js,.json), leave empty for all files:',
      filter: input => input.split(',').map(ext => ext.trim()).filter(Boolean)
    },
    {
      type: 'input',
      name: 'excludePatterns',
      message:
        'Exclude folders/files by name (comma separated, e.g. dist,temp,node_modules):',
      filter: input => input.split(',').map(pattern => pattern.trim()).filter(Boolean)
    },
    {
      type: 'confirm',
      name: 'exportToFile',
      message: 'Export tree output to a file?',
      default: false
    },
    {
      when: answers => answers.exportToFile,
      type: 'input',
      name: 'filePath',
      message: 'Enter the output filename (default: tree-output.txt):',
      default: 'tree-output.txt'
    },
    {
      when: answers => answers.exportToFile && fs.existsSync(answers.filePath),
      type: 'list',
      name: 'fileAction',
      message: 'File already exists. What do you want to do?',
      choices: [
        { name: 'Overwrite', value: 'overwrite' },
        { name: 'Append', value: 'append' },
        { name: 'Cancel', value: 'cancel' }
      ]
    }
  ]);

  if (answers.exportToFile && answers.fileAction === 'cancel') {
    console.log('Operation cancelled by user.');
    return;
  }

  // Build exclude patterns, adding git files if user wants to exclude them
  const excludes = answers.excludePatterns;
  if (answers.excludeGit) {
    excludes.push('.git', '.gitignore');
  }

  const root = process.cwd();
  const { treeStr, stats } = drawTree(root, {
    depthLimit: answers.depth,
    includeNodeModules: answers.includeNodeModules,
    fileExtensions: answers.fileExtensions,
    excludePatterns: excludes
  });

  console.log(
    `\n📁 Project Tree (depth: ${
      answers.depth === Infinity ? 'Full' : answers.depth
    }, node_modules: ${answers.includeNodeModules ? 'included' : 'excluded'}, git files: ${
      answers.excludeGit ? 'excluded' : 'included'
    })\n`
  );
  console.log(path.basename(root));
  console.log(treeStr);

  // Summary
  console.log(chalk.bold('\nSummary:'));
  console.log(`Directories: ${stats.dirs}`);
  console.log(`Files: ${stats.files}`);
  console.log(`Total size: ${formatBytes(stats.size)}\n`);

  if (answers.exportToFile) {
    const fileMode = answers.fileAction === 'append' ? 'a' : 'w';
    try {
      const fileContent = stripAnsi(treeStr);
      fs.writeFileSync(answers.filePath, fileContent + '\n', { flag: fileMode });
      console.log(
        `✅ Tree output successfully ${
          fileMode === 'w' ? 'written to' : 'appended to'
        } ${answers.filePath}`
      );
    } catch (err) {
      console.error(`❌ Failed to write to file: ${err.message}`);
    }
  }
}
