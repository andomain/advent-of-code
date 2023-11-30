/**
 * Thanks to https://github.com/tatupesonen/aoc-typescript-starter
 * for the reference
 */

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { exit } from 'process';

const ACTIONS = {
  RUN: 'run',
  TEST: 'test',
};

console.log(process.argv);
const action = process.argv[2];
const year = process.argv[3];
const day = process.argv[4];

const folder = `challenges/${year}/${day?.padStart(2, '0')}`;

if (action === ACTIONS.RUN) {
  if (existsSync(`${folder}/index.ts`)) {
    spawn('nodemon', ['-x', 'ts-node', `${folder}/index.ts`], {
      stdio: 'inherit',
      shell: true,
    });
  }
  exit();
}

if (action === ACTIONS.TEST) {
  spawn(`jest ${folder}/*.spec.ts`, { stdio: 'inherit', shell: true });
  exit();
}

console.error(`Unknown action ${action}`);
