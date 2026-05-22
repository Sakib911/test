# Commit Message Conventions

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

## Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

## Examples

### Good Examples

```bash
feat: add user authentication system
fix: resolve memory leak in data processing
docs: update API documentation
style: format code with prettier
refactor: extract common validation logic
perf: optimize database queries
test: add unit tests for user service
build: update webpack configuration
ci: add automated testing workflow
chore: update dependencies
```

### Bad Examples

```bash
# Too vague
fix: bug
update: stuff
changes

# Wrong type
feature: add login
bugfix: fix error

# No description
feat:
fix:
```

## Scope (Optional)

You can optionally provide a scope to indicate which part of the codebase is affected:

```bash
feat(auth): add OAuth integration
fix(api): handle null response
docs(readme): update installation instructions
```

## Body (Optional)

Use the body to explain what and why, not how:

```bash
feat: add user authentication system

Implement JWT-based authentication with refresh tokens.
This includes login, logout, and token refresh endpoints.
```

## Footer (Optional)

Reference issues or breaking changes:

```bash
feat: add user authentication system

Closes #123

BREAKING CHANGE: The API now requires authentication headers
```

## Git Hooks

This project uses Husky to enforce commit message standards:

- **pre-commit**: Runs linting and formatting on staged files
- **commit-msg**: Validates commit message format
- **pre-push**: Runs type checking, linting, and build verification

## Quick Reference

| Type       | Description      | Example                               |
| ---------- | ---------------- | ------------------------------------- |
| `feat`     | New feature      | `feat: add dark mode toggle`          |
| `fix`      | Bug fix          | `fix: resolve login redirect issue`   |
| `docs`     | Documentation    | `docs: update README`                 |
| `style`    | Code style       | `style: format with prettier`         |
| `refactor` | Code refactoring | `refactor: extract utility functions` |
| `perf`     | Performance      | `perf: optimize image loading`        |
| `test`     | Tests            | `test: add unit tests for utils`      |
| `build`    | Build system     | `build: update webpack config`        |
| `ci`       | CI/CD            | `ci: add GitHub Actions workflow`     |
| `chore`    | Maintenance      | `chore: update dependencies`          |
