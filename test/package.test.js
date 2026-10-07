import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

describe('package manifest', () => {
  it('ships a valid CLI executable mapping', async () => {
    const manifest = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
    const executable = manifest.bin['ai-project-factory'];

    expect(executable).toBe('bin/ai-project-factory.js');
    await expect(access(path.join(root, executable))).resolves.toBeUndefined();
  });
});
