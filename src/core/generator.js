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
import { constants } from 'node:fs';
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
      const rendered = Object.entries(variables).reduce(
        (current, [key, value]) => current.replaceAll(`{{${key}}}`, value),
        content,
      );
      await writeFile(entryPath, rendered);
    }),
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

  if (!(await exists(templateDirectory))) {
    throw new Error(`The ${stack.label} template is missing from this installation.`);
  }
  if ((await exists(targetDirectory)) && !force) {
    throw new Error(`Target directory already exists: ${targetDirectory}`);
  }

  await mkdir(parent, { recursive: true });
  const temporaryDirectory = await mkdtemp(path.join(parent, `.${projectName}-`));

  try {
    await cp(templateDirectory, temporaryDirectory, {
      recursive: true,
      force: false,
      mode: constants.COPYFILE_EXCL,
    });
    await renderFiles(temporaryDirectory, {
      projectName,
      projectPackageName: projectName.replaceAll('-', '_'),
      projectTitle: projectName
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' '),
      stackName: stack.label,
    });
    if (force) await rm(targetDirectory, { recursive: true, force: true });
    await rename(temporaryDirectory, targetDirectory);
  } catch (error) {
    await rm(temporaryDirectory, { recursive: true, force: true });
    throw error;
  }

  return { projectName, stack: stack.key, targetDirectory };
}
