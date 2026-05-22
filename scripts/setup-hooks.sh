#!/bin/bash

echo "🔧 Setting up Git hooks for this project..."

# Make sure husky is installed
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found. Please install Node.js and npm first."
    exit 1
fi

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Initialize husky
echo "🐕 Initializing Husky..."
npx husky init

# Make hooks executable
echo "🔐 Making hooks executable..."
chmod +x .husky/pre-commit .husky/commit-msg .husky/pre-push

# Test commitlint
echo "🧪 Testing commitlint..."
echo "feat: Add husky and commitlint setup" | npx commitlint

if [ $? -eq 0 ]; then
    echo "✅ Commitlint is working correctly!"
else
    echo "❌ Commitlint test failed. Please check the configuration."
    exit 1
fi

# Test lint-staged
echo "🧪 Testing lint-staged..."
echo "# Test" > test-file.md
git add test-file.md
npx lint-staged
rm test-file.md
git reset HEAD test-file.md

echo "🎉 Git hooks setup complete!"
echo ""
echo "📋 What's configured:"
echo "  • Pre-commit: Runs ESLint and Prettier on staged files"
echo "  • Commit-msg: Validates commit message format"
echo "  • Pre-push: Runs type checking, linting, and build verification"
echo ""
echo "📖 See COMMIT_CONVENTIONS.md for commit message guidelines"
echo ""
echo "🚀 You're ready to commit with confidence!"
