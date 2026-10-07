import { input, select } from '@inquirer/prompts';
import { generateProject } from '../core/generator.js';
import { STACKS, getStack } from '../core/template-registry.js';
import { normalizeProjectName } from '../core/validation.js';

export async function initProject(options = {}) {
  const stackKey = options.stack
    ? options.stack.toLowerCase()
    : await select({
        message: 'Choose a project stack',
        choices: STACKS.map((stack) => ({ name: stack.label, value: stack.key })),
      });
  const stack = getStack(stackKey);

  const rawName =
    options.projectName ??
    (await input({
      message: 'Project name',
      default: `my-${stack.key}-app`,
    }));
  const projectName = normalizeProjectName(rawName);

  const result = await generateProject({
    projectName,
    stack,
    parentDirectory: options.directory,
    force: options.force,
  });

  console.log(`\nCreated ${stack.label} project at ${result.targetDirectory}`);
  console.log(
    `\nNext steps:\n  cd ${JSON.stringify(projectName)}\n  ${stack.installCommand}\n  ${stack.startCommand}`,
  );
  return result;
}
