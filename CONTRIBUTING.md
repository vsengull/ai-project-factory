# Contributing

Thank you for helping improve AI Project Factory.

## Before you start

- Search existing issues and pull requests.
- Use a feature request for behavior changes before investing in a large implementation.
- Keep pull requests focused; unrelated cleanup should be separate.
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md) and report vulnerabilities through
  [SECURITY.md](SECURITY.md).

## Local setup

Node.js 20.19 or newer is required.

```bash
git clone https://github.com/vsengull/ai-project-factory.git
cd ai-project-factory
npm ci
npm test
```

## Development workflow

1. Create a branch from `main`.
2. Add tests with behavior changes.
3. Keep public commands and README examples synchronized.
4. Run the complete local gate:

```bash
npm run format:check
npm run lint
npm test
npm run build
npm audit --audit-level=high
npm pack --dry-run
```

5. Use a clear commit subject such as `feat: add a template manifest check`.
6. Open a pull request and complete the checklist.

## Adding a stack

1. Add its immutable metadata to `src/core/template-registry.js`.
2. Add a runnable, minimal starter under `templates/<stack>`.
3. Use supported render variables: `projectName`, `projectPackageName`, `projectTitle`, `stackName`,
   `installCommand`, `startCommand`, `testCommand`, `lintCommand`, `buildCommand`, and
   `sourceDirectory`.
4. Extend generator and CLI tests to cover the stack and its essential files.
5. Install dependencies in generated output and run its documented test, lint, and build commands.
6. Update the supported-stack table and changelog.

Templates must not contain secrets, telemetry, placeholder implementations, or undocumented external
service requirements.

## Releases

The project follows [Semantic Versioning](https://semver.org/). Maintainers update `CHANGELOG.md`,
create a version commit and tag, and publish a matching GitHub release. The release workflow verifies
the package before publishing it to npm.
