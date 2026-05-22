# Pre-Push Hook Troubleshooting

## Issue: Pre-Push Hook Failing with ESLint Errors

### Problem Description

The pre-push hook was failing because ESLint was trying to lint generated files in the `.next` directory, which contains:

- Minified JavaScript bundles
- Generated TypeScript files
- Build artifacts

This resulted in thousands of ESLint warnings and errors from files that shouldn't be linted.

### Root Cause

The ESLint command in the pre-push hook was running on all files (`.`) without properly excluding the build directories, even though they were configured in `eslint.config.mjs`.

### Solution Applied

#### 1. Updated Pre-Push Hook

Modified `.husky/pre-push` to use explicit ignore patterns:

```bash
# Before (problematic)
npx eslint . --ext .ts,.tsx,.js,.jsx --max-warnings 0

# After (fixed)
npx eslint . --ext .ts,.tsx,.js,.jsx --max-warnings 0 --ignore-pattern ".next/**" --ignore-pattern "node_modules/**" --ignore-pattern "out/**" --ignore-pattern "build/**" --ignore-pattern "next-env.d.ts"
```

#### 2. Removed Deprecated Husky Shebang Lines

Updated all Husky hooks to remove deprecated shebang lines that were causing warnings:

```bash
# Removed from all .husky/* files
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
```

### Files Modified

- `.husky/pre-push` - Added explicit ignore patterns
- `.husky/pre-commit` - Removed deprecated shebang
- `.husky/commit-msg` - Removed deprecated shebang

### Verification

The pre-push hook now runs successfully with:

- ✅ TypeScript type checking
- ✅ ESLint (only on source files)
- ✅ Build verification
- ✅ No deprecation warnings

### Best Practices

1. **Always exclude build directories** from linting in CI/CD hooks
2. **Use explicit ignore patterns** when the config file ignores don't work
3. **Keep Husky hooks updated** to avoid deprecation warnings
4. **Test hooks regularly** to ensure they work as expected

### Common Patterns to Ignore

- `.next/**` - Next.js build output
- `node_modules/**` - Dependencies
- `out/**` - Static export output
- `build/**` - Build artifacts
- `dist/**` - Distribution files
- `*.tsbuildinfo` - TypeScript build info
- `next-env.d.ts` - Next.js type definitions
