import {
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rename,
  rm,
  writeFile,
} from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

async function exists(target) {
  try {
    await lstat(target, { bigint: false });
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

async function renderFiles(directory, variables) {
  const entries = await readdir(directory, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await renderFiles(entryPath, variables);
        return;
      }

      const content = await readFile(entryPath, 'utf8');
      const rendered = Object.entries(variables).reduce((current, [key, value]) => {
        const marker = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
        return current.replace(marker, () => value);
      }, content);
      await writeFile(entryPath, rendered);
      if (entry.name === '_gitignore') {
        await rename(entryPath, path.join(directory, '.gitignore'));
      }
    }),
  );
}

async function copyDirectoryContents(source, target) {
  const entries = await readdir(source, { withFileTypes: true });
  await Promise.all(
    entries.map((entry) =>
      cp(path.join(source, entry.name), path.join(target, entry.name), {
        recursive: entry.isDirectory(),
        force: false,
        errorOnExist: true,
      }),
    ),
  );
}

export async function generateProject({
  projectName,
  stack,
  parentDirectory = '.',
  force = false,
}) {
  const parent = path.resolve(parentDirectory);
  const targetDirectory = path.join(parent, projectName);
  const templateDirectory = path.join(packageRoot, 'templates', stack.key);
  const sharedTemplateDirectory = path.join(packageRoot, 'templates', '_shared');

  if (!(await exists(templateDirectory))) {
    throw new Error(`The ${stack.label} template is missing from this installation.`);
  }
  if ((await exists(targetDirectory)) && !force) {
    throw new Error(`Target directory already exists: ${targetDirectory}`);
  }

  await mkdir(parent, { recursive: true });
  const temporaryDirectory = await mkdtemp(path.join(parent, `.${projectName}-`));

  try {
    await copyDirectoryContents(templateDirectory, temporaryDirectory);
    await copyDirectoryContents(sharedTemplateDirectory, temporaryDirectory);
    await renderFiles(temporaryDirectory, {
      projectName,
      projectPackageName: projectName.replaceAll('-', '_'),
      projectTitle: projectName
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' '),
      stackName: stack.label,
      installCommand: stack.installCommand,
      startCommand: stack.startCommand,
      testCommand: stack.testCommand,
      lintCommand: stack.lintCommand,
      buildCommand: stack.buildCommand,
      sourceDirectory: stack.sourceDirectory,
    });
    if (force) await rm(targetDirectory, { recursive: true, force: true });
    await rename(temporaryDirectory, targetDirectory);
  } catch (error) {
    await rm(temporaryDirectory, { recursive: true, force: true });
    throw error;
  }

  return { projectName, stack: stack.key, targetDirectory };
}
