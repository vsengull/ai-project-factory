import { mkdtemp, readFile, readdir, rm, stat } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { generateProject } from '../src/core/generator.js';
import { getStack, STACKS } from '../src/core/template-registry.js';

const temporaryDirectories = [];

async function makeTemporaryDirectory() {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'ai-project-factory-test-'));
  temporaryDirectories.push(directory);
  return directory;
}

async function readProjectText(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const parts = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? readProjectText(entryPath) : readFile(entryPath, 'utf8');
    }),
  );
  return parts.flat().join('\n');
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

describe('generateProject', () => {
  it.each(STACKS)('generates the $label template and AI context files', async (stack) => {
    const parentDirectory = await makeTemporaryDirectory();
    const result = await generateProject({
      projectName: `sample-${stack.key}`,
      stack,
      parentDirectory,
    });

    const expectedFiles = [
      '.gitignore',
      'AGENTS.md',
      'CLAUDE.md',
      'PROJECT_CONTEXT.md',
      'TASKS.md',
      'docs/ARCHITECTURE.md',
      'docs/CODING_CONVENTIONS.md',
      'docs/TESTING.md',
      'docs/SECURITY_CHECKLIST.md',
    ];
    await Promise.all(expectedFiles.map((file) => stat(path.join(result.targetDirectory, file))));

    const context = await readFile(path.join(result.targetDirectory, 'PROJECT_CONTEXT.md'), 'utf8');
    expect(context).toContain(stack.label);
    expect(await readProjectText(result.targetDirectory)).not.toMatch(/\{\{\s*[a-zA-Z]/);
  });

  it('renders a Dart-compatible Flutter package name', async () => {
    const parentDirectory = await makeTemporaryDirectory();
    const result = await generateProject({
      projectName: 'sample-flutter-app',
      stack: getStack('flutter'),
      parentDirectory,
    });

    const pubspec = await readFile(path.join(result.targetDirectory, 'pubspec.yaml'), 'utf8');
    expect(pubspec).toMatch(/name: ['"]?sample_flutter_app['"]?/);
  });

  it('does not overwrite an existing target without force', async () => {
    const parentDirectory = await makeTemporaryDirectory();
    const options = {
      projectName: 'existing-app',
      stack: getStack('nextjs'),
      parentDirectory,
    };
    await generateProject(options);

    await expect(generateProject(options)).rejects.toThrow('already exists');
  });

  it('replaces an existing target with force', async () => {
    const parentDirectory = await makeTemporaryDirectory();
    const options = {
      projectName: 'replace-me',
      stack: getStack('nextjs'),
      parentDirectory,
    };
    await generateProject(options);
    const result = await generateProject({ ...options, stack: getStack('nestjs'), force: true });

    await expect(stat(path.join(result.targetDirectory, 'src/main.ts'))).resolves.toBeDefined();
    await expect(stat(path.join(result.targetDirectory, 'app/page.jsx'))).rejects.toThrow();
  });
});
