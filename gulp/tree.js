import { exec } from 'child_process';
import { promisify } from 'util';
import { log } from '../utils/logger.js';

const execAsync = promisify(exec);

export async function runTreeTask() {
  try {
    const { stdout } = await execAsync('tree');
    log.success('Project Tree:');
    console.log(stdout);
  } catch (err) {
    log.error('Tree generation failed. Is "tree" installed on your system?');
  }
}
