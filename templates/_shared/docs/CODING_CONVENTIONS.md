# Coding Conventions

- Use the formatter and linter configured by the generated project.
- Choose names that describe domain intent; avoid unexplained abbreviations.
- Keep functions focused and make side effects explicit at system boundaries.
- Validate untrusted input before it reaches application logic.
- Return actionable errors without leaking secrets or internal implementation details.
- Prefer immutable data and composition over shared mutable state.
- Add dependencies only after checking maintenance, license, and security posture.
- Comment why a non-obvious decision exists, not what the syntax does.
