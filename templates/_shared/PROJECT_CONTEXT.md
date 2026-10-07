# Project Context

## Summary

`{{projectName}}` is a {{stackName}} application. Its initial scaffold is intentionally small so the
product can grow from explicit requirements instead of speculative abstractions.

## Local workflow

```bash
{{installCommand}}
{{startCommand}}
```

## Quality gates

```bash
{{testCommand}}
{{lintCommand}}
{{buildCommand}}
```

## Current decisions

- Application source lives in `{{sourceDirectory}}`.
- Architecture starts as a single deployable application.
- Dependencies should be added only when they remove concrete complexity.
- Public behavior changes require tests and documentation updates.
