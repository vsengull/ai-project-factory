import { access, chmod, cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of ['bin', 'src', 'templates', 'package.json', 'README.md', 'LICENSE']) {
  const source = path.join(root, entry);
  await access(source);
  await cp(source, path.join(output, entry), { recursive: true });
}
await chmod(path.join(output, 'bin', 'ai-project-factory.js'), 0o755);
console.log('Built package in dist/');
