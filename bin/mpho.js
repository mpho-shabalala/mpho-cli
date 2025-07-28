#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { runTreeTask } from '../gulp/tree.js';
import { runTestTask } from '../gulp/test.js';
import { runLintTask } from '../gulp/lint.js';
import { runDocsTask } from '../gulp/docs.js';
import { initProject } from '../tasks/initProject.js';
import { generateReadme } from '../gulp/readme.js';
import {generateGitignore} from '../tools/gitignore.js'
import {runGitTask} from '../tasks/git.js'

yargs(hideBin(process.argv))
  .command('tree', 'Generate file tree', {}, runTreeTask)
  .command('test', 'Run tests using Vitest', {}, runTestTask)
  .command('lint', 'Run linting with ESLint', {}, runLintTask)
  .command('docs', 'Generate docs from comments', {}, runDocsTask)
  .command('init', 'Scaffold a new project', {}, initProject)
  .command('readme', 'Generate bare minimum README.md', {}, generateReadme)
  .command('gitignore','Generate a .gitignore file with standard rules',{},generateGitignore)
  .demandCommand(1, 'Use one of the commands: tree, test, lint, docs, init')
  .command('git [message]', 'Add, commit, and push to Git', {}, runGitTask)
  .help()
  .argv;
