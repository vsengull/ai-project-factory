# Claude Project Guide

Use `AGENTS.md` as the source of truth for repository-wide agent instructions.

Before implementing a task:

1. Read `PROJECT_CONTEXT.md`, `TASKS.md`, and `docs/ARCHITECTURE.md`.
2. Inspect existing code and tests before proposing new abstractions.
3. Prefer the smallest change that fully solves the task.
4. Validate with `{{testCommand}}`, `{{lintCommand}}`, and `{{buildCommand}}`.

Do not invent requirements, weaken validation to make tests pass, or expose secrets in source,
fixtures, logs, or documentation.
