# Architecture

## Overview

`{{projectName}}` is a single {{stackName}} application. The initial architecture keeps runtime code
inside `{{sourceDirectory}}`, tests close to the behavior they verify, and operational knowledge in
repository documentation.

## Boundaries

- **Application:** user-facing behavior and framework integration in `{{sourceDirectory}}`.
- **Tests:** automated behavior checks run with `{{testCommand}}`.
- **Project knowledge:** `PROJECT_CONTEXT.md`, `TASKS.md`, and this `docs/` directory.

## Dependency rule

Framework-facing code may call application logic. Reusable application logic should not depend on
UI, transport, persistence, or vendor SDK details. Introduce new layers only when a concrete feature
needs the boundary.

## Change process

Record decisions that affect multiple features in this document. For significant or hard-to-reverse
decisions, add a dated architecture decision record under `docs/decisions/`.
