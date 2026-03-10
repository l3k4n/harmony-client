import path from 'node:path';
import { spawnSync } from 'node:child_process';

function error(msg) {
  const RED = '\x1b[31m';
  const RESET = '\x1b[0m';
  console.error(`${RED}❌ Error: ${msg}${RESET}`);
}

function checkJava() {
  const javaHome = process.env.JAVA_HOME;

  if (javaHome) {
    const result = spawnSync(path.join(javaHome, 'bin', 'java'), ['-version']);
    if (result.status != 0) return true;
  }

  if (spawnSync('java', ['-version']).status == 0) return true;

  error('JAVA_HOME is not set and java is not in path');
  return false;
}

function checkAndroid() {
  if (process.env.ANDROID_HOME) return true;
  error('ANDROID_HOME is not set');
  return false;
}

const tests = [checkJava(), checkAndroid()];

if (tests.some((passed) => !passed)) process.exit(1);
