// tasks/git.js
import { exec } from 'child_process';

export function runGitTask(argv) {
  const message = argv._[1] || 'chore: generic commit';

  exec(`git add . && git commit -m "${message}" && git push`, (err, stdout, stderr) => {
    if (err) {
      console.error(`❌ Git Error:\n${stderr}`);
    } else {
      console.log(`✅ Git Commit & Push:\n${stdout}`);
    }
  });
}
