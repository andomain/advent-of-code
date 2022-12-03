import { readFileSync } from 'fs';

export const getFileLines = (path: string, { separator = '\n', trim = true }: { separator?: string, trim?: boolean } = {}): string[] => {
  let contents = readFileSync(path, 'utf-8');

  if (trim) {
    contents = contents.trim();
  }

  return contents.split(separator);
}

export const groupLines = (lines: string[], size: number): string[][] => {
  const result = [];
  for (let i = 0; i < lines.length; i += size) {
    result.push(lines.slice(i, i + size));
  }

  return result;
}