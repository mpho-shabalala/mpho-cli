import { exec } from 'child_process';
import { promisify } from 'util';
import { log } from '../utils/logger.js';

const execAsync = promisify(exec);

export async function runTestTask() {
  try {
    const { stdout } = await execAsync('npx vitest run');
    log.success('Tests executed:');
    console.log(stdout);
  } catch (err) {
    log.error('Tests failed to run.');
  }
}
