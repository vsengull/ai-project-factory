# Security Checklist

Review applicable items before every release:

- [ ] No credentials, tokens, personal data, or private endpoints are committed.
- [ ] All untrusted input is validated and output is safely encoded.
- [ ] Authentication and authorization are enforced server-side where applicable.
- [ ] Logs exclude secrets and sensitive user data.
- [ ] Dependencies are reviewed and vulnerability scans have no unaddressed high-risk findings.
- [ ] Error responses avoid leaking stack traces or internal details in production.
- [ ] Network calls use TLS and have explicit timeouts and bounded retries.
- [ ] Data access follows least privilege and destructive actions require appropriate safeguards.
- [ ] Security-relevant configuration is documented and fails closed.
- [ ] Abuse cases and rollback steps are considered for high-impact changes.
