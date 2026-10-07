# Testing

## Commands

Run the test suite:

```bash
{{testCommand}}
```

Run all local quality gates before opening a pull request:

```bash
{{testCommand}}
{{lintCommand}}
{{buildCommand}}
```

## Expectations

- Test public behavior and important failure paths.
- Keep tests deterministic; do not depend on wall-clock time, global ordering, or live services.
- Use integration tests for framework boundaries and unit tests for isolated application logic.
- A regression fix should include a test that fails without the fix.
- Test doubles must preserve the contract of the dependency they replace.
