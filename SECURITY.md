# Security maintenance

Use Node.js 24 and Java 21. The frontend runs on maintained Angular 21 and the backend runs on Spring Boot 4.0.8. Spring Boot 4 uses Jakarta APIs and the new `spring.mongodb.*` connection properties; update deployment overrides that still use `spring.data.mongodb.host/port/database/uri`.

Install and verify the frontend from the repository root:

```sh
npm ci --ignore-scripts
npm audit --audit-level=low
npm run build
npm test
```

Build and test the backend from `src/fleet-management-system` with `mvn -B verify`. Production still requires the application's configured MongoDB. Context tests do not replace database integration testing; frontend HTTP and browser regressions use controlled mock responses.

Lazy routes retain the existing bundle error limits. The home-page stylesheet remains scoped by its host selector when loaded globally. Regression tests cover bounded filtering and the fleet creation HTTP contract.

The lockfile removes the old vulnerable Angular/build/test dependency trees. Spring, Jackson, and embedded Tomcat are upgraded to patched versions. Weekly Dependabot updates and pinned GitHub Actions run clean installs, npm advisories, production builds, tests, and Maven verification. Maven vulnerability findings should also be reviewed through GitHub's dependency graph/Dependabot; the Maven build alone is not a vulnerability scanner.

Bundle-size and legacy typing warnings remain visible. No production error budget or advisory is suppressed. A clean advisory scan is limited to vulnerabilities known to its database and is not a guarantee against application security issues.

This application remains a prototype with API endpoints that do not enforce a complete authenticated identity and resource authorization policy. Run it only on the local machine. The backend binds to `127.0.0.1` by default and accepts browser origins `http://localhost:4200` and `http://127.0.0.1:4200`. Public deployment requires a separate authentication and authorization migration, including WebSocket access where applicable; loopback/CORS restrictions and dependency patches do not provide those controls.

Embedded-server regressions load the main configuration and verify the actual server factory's loopback address, accepted local preflights, rejected foreign/opaque origins, and rejected foreign simple requests. These tests do not override the listener address.
