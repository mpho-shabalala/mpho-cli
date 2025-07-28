import { exec } from 'child_process';
import { promisify } from 'util';
import { log } from '../utils/logger.js';

const execAsync = promisify(exec);

export async function runLintTask() {
  try {
    const { stdout } = await execAsync('npx eslint .');
    log.success('Lint Results:');
    console.log(stdout);
  } catch (err) {
    log.error('Linting failed or returned errors.');
    console.log(err.stdout || err.message);
  }
}
