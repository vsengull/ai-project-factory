import { Command } from 'commander';
import { initProject } from './commands/init.js';

const program = new Command();

program
  .name('ai-project-factory')
  .description('Bootstrap AI-agent-ready software projects')
  .version('0.1.0');

program
  .command('init')
  .description('Create a new AI-agent-ready project')
  .argument('[project-name]', 'project name')
  .option('-s, --stack <stack>', 'stack: flutter, nextjs, or nestjs')
  .option('-d, --directory <path>', 'parent directory', '.')
  .option('-f, --force', 'replace an existing empty target directory')
  .action(async (projectName, options) => {
    try {
      await initProject({ ...options, projectName });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }
  });

program.parseAsync();
