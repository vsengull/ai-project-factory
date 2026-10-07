# AI Project Factory

[![CI](https://github.com/vsengull/ai-project-factory/actions/workflows/ci.yml/badge.svg)](https://github.com/vsengull/ai-project-factory/actions/workflows/ci.yml)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

AI Project Factory is an open-source CLI that creates small, working application projects with the
context files AI coding agents need to make safe, focused changes.

Most framework generators create source code but leave architecture decisions, working agreements,
quality commands, and security expectations implicit. AI Project Factory makes that knowledge part of
the repository from the first commit without imposing a heavy application architecture.

## Quick start

Run without installing the CLI globally:

```bash
npx ai-project-factory init
```

Choose a stack and project name when prompted, then follow the printed commands.

For scripts and CI, provide all values non-interactively:

```bash
npx ai-project-factory init my-web-app --stack nextjs
npx ai-project-factory init my-api --stack nestjs --directory ./services
npx ai-project-factory init my-mobile-app --stack flutter
```

Use `--force` only when you intentionally want to replace an existing target directory:

```bash
npx ai-project-factory init my-web-app --stack nextjs --force
```

## Installation

The recommended usage is `npx`, which runs the published package without a permanent global install.
Node.js 20.19 or newer is required.

To install globally instead:

```bash
npm install --global ai-project-factory
ai-project-factory init
```

To inspect all commands and options:

```bash
npx ai-project-factory --help
npx ai-project-factory init --help
```

## Supported stacks

| Stack   | Generated starter                   | Local checks                                           |
| ------- | ----------------------------------- | ------------------------------------------------------ |
| Next.js | App Router application              | `npm test`, `npm run lint`, `npm run build`            |
| NestJS  | HTTP service with a health response | `npm test`, `npm run lint`, `npm run build`            |
| Flutter | Web-capable Material application    | `flutter test`, `flutter analyze`, `flutter build web` |

Generated projects intentionally start small. They include a working framework entry point and test,
not speculative database, authentication, deployment, or state-management choices.

## What gets generated

Every project combines a stack template with a shared AI-agent context layer:

```text
my-project/
├── AGENTS.md
├── CLAUDE.md
├── PROJECT_CONTEXT.md
├── TASKS.md
├── README.md
├── docs/
│   ├── ARCHITECTURE.md
│   ├── CODING_CONVENTIONS.md
│   ├── SECURITY_CHECKLIST.md
│   └── TESTING.md
└── ... stack-specific application files
```

Examples of the generated guidance include:

- `AGENTS.md`: repository-wide working agreement and definition of done.
- `PROJECT_CONTEXT.md`: actual install, start, test, lint, and build commands for the chosen stack.
- `TASKS.md`: a lightweight active/ready/completed work queue.
- `docs/ARCHITECTURE.md`: initial boundaries and dependency direction.
- `docs/SECURITY_CHECKLIST.md`: concrete release-time security review items.

Template variables such as the project name, display title, source directory, and quality commands are
rendered during generation. No template markers remain in the output.

## Architecture

The CLI has four intentionally small parts:

```text
bin/ai-project-factory.js       executable entry point
src/cli.js                      command and option definitions
src/commands/init.js            interactive/non-interactive init flow
src/core/                       validation, stack registry, and generator
templates/_shared/              common AI-agent documentation
templates/{stack}/              runnable framework starters
```

The stack registry owns names and commands. The generator copies the selected stack into a temporary
directory, overlays shared context files, renders variables, and then moves the finished project into
place. This keeps failed runs from leaving partial output. Adding a stack does not require changing the
CLI parsing layer.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the template extension checklist.

## Development

```bash
git clone https://github.com/vsengull/ai-project-factory.git
cd ai-project-factory
npm ci
npm run format:check
npm run lint
npm test
npm run build
```

Run the local CLI directly:

```bash
node ./bin/ai-project-factory.js init example-app --stack nextjs --directory /tmp
```

## Roadmap

Version 0.1.0 establishes the CLI, three maintained templates, automated verification, and the shared
agent-context format. Near-term work focuses on template lifecycle metadata, optional features, more
end-to-end generated-project checks, and additional stacks driven by contributor demand. See the
[full roadmap](ROADMAP.md). Roadmap items are plans, not commitments.

## Contributing

Bug reports, focused features, documentation improvements, and new templates are welcome. Read
[CONTRIBUTING.md](CONTRIBUTING.md), follow the [Code of Conduct](CODE_OF_CONDUCT.md), and use the
repository issue templates before opening a pull request.

Security issues must not be filed publicly. Follow [SECURITY.md](SECURITY.md).

## License

Licensed under the [MIT License](LICENSE).
