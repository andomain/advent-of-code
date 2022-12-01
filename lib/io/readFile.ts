import { readFileSync } from 'fs';

export const getFileLines = (path: string, separator: string = '\n'): string[] => readFileSync(path, 'utf-8').split(separator);
