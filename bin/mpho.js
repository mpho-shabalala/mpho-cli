#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { runTreeTask } from '../tasks/custom/tree.js';
import { runTestTask } from '../tasks/gulp/test.js';
import { runLintTask } from '../tasks/gulp/lint.js';
import { runDocsTask } from '../tasks/custom/docs.js';
import { initProject } from '../tasks/custom/initProject.js';
import { generateReadme } from '../tasks/custom/readme.js';
import {generateGitignore} from '../tasks/custom/gitignore.js'
import {runGitTask} from '../tasks/custom/git.js'
import {runLintSetupTask} from '../tasks/gulp/lintSetup.js'

yargs(hideBin(process.argv))
  .command('tree', 'Generate file tree', {}, runTreeTask)
  .command('test', 'Run tests using Vitest', {}, runTestTask)
   .command(
    'lint',
    'Run ESLint on your project',
    () => {},
    () => runLintTask()
  )
  .command(
    'lint-setup',
    'Create default ESLint config file',
    () => {},
    () => runLintSetupTask()
  )
  .command('docs', 'Generate docs from comments', {}, runDocsTask)
  .command('init', 'Scaffold a new project', {}, initProject)
  .command('readme', 'Generate bare minimum README.md', {}, generateReadme)
  .command('gitignore','Generate a .gitignore file with standard rules',{},generateGitignore)
  .command('git [message]', 'Add, commit, and push to Git', {}, runGitTask)
  .demandCommand(1, 'Use one of the commands: tree, test, lint, docs, init')
  .help()
  .argv;
