#!/bin/bash

# Setup script for mock mode security hooks
# Run this script to install security hooks for git

echo "🔒 Setting up mock mode security hooks..."

# Create hooks directory if it doesn't exist
mkdir -p .git/hooks

# Copy hook files
if [ -f "scripts/git-hooks/pre-commit" ]; then
    cp scripts/git-hooks/pre-commit .git/hooks/pre-commit
    chmod +x .git/hooks/pre-commit
    echo "✅ pre-commit hook installed"
else
    echo "❌ pre-commit hook file not found"
    exit 1
fi

if [ -f "scripts/git-hooks/pre-push" ]; then
    cp scripts/git-hooks/pre-push .git/hooks/pre-push
    chmod +x .git/hooks/pre-push
    echo "✅ pre-push hook installed"
else
    echo "❌ pre-push hook file not found"
    exit 1
fi

# Update .gitignore to ensure .env is never committed
if ! grep -q "^\.env$" .gitignore; then
    echo "" >> .gitignore
    echo "# Security: Never commit environment files" >> .gitignore
    echo ".env" >> .gitignore
    echo ".env.local" >> .gitignore
    echo ".env.*.local" >> .gitignore
    echo "✅ Updated .gitignore"
fi

echo ""
echo "🔒 Security hooks installed successfully!"
echo ""
echo "The following security checks are now active:"
echo "  • Pre-commit: Checks for mock mode and secrets before commits"
echo "  • Pre-push: Additional checks for production branches"
echo "  • .gitignore: Prevents committing .env files"
echo ""
echo "⚠️  IMPORTANT: These hooks will prevent commits that could compromise security."
echo "   Review the hooks in .git/hooks/ for details."
