import { readFileSync } from 'fs';

export const getFileLines = (path: string): string[] => readFileSync(path, 'utf-8').split('\n');
