import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { afterEach, describe, expect, it } from 'vitest';

const execFileAsync = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = path.join(root, 'bin/ai-project-factory.js');
const temporaryDirectories = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

describe('CLI', () => {
  it('prints command help', async () => {
    const { stdout } = await execFileAsync(process.execPath, [cli, '--help']);
    expect(stdout).toContain('Bootstrap AI-agent-ready software projects');
    expect(stdout).toContain('init');
  });

  it('generates a project non-interactively', async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), 'ai-project-factory-cli-'));
    temporaryDirectories.push(directory);

    const { stdout } = await execFileAsync(process.execPath, [
      cli,
      'init',
      'cli-project',
      '--stack',
      'nextjs',
      '--directory',
      directory,
    ]);

    expect(stdout).toContain('Created Next.js project');
    const manifest = JSON.parse(
      await readFile(path.join(directory, 'cli-project', 'package.json'), 'utf8'),
    );
    expect(manifest.name).toBe('cli-project');
  });

  it('returns a failure for an unsupported stack', async () => {
    await expect(
      execFileAsync(process.execPath, [cli, 'init', 'bad-project', '--stack', 'rails']),
    ).rejects.toMatchObject({ code: 1 });
  });
});
