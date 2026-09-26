import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const readFixture = (name: string): string => {
  const filePath = path.join(__dirname, '..', '__fixtures__', name);
  const content = readFileSync(filePath, 'utf-8');
  return content.replace(/\r\n/g, '\n');
};