#!/bin/bash

# Prompt for GitHub config
read -p "Enter your Git username (commit name): " GIT_USER_NAME
read -p "Enter your Git email (commit email): " GIT_USER_EMAIL

# Set Git global configuration
git config --global user.name "$GIT_USER_NAME"
git config --global user.email "$GIT_USER_EMAIL"

# Set local Bundler config to keep gems in project directory
bundle config set --local path './.bundle'

echo ""
echo "✅ Git commit identity configured."
echo "Git User: $(git config --global user.name)"
echo "Git Email: $(git config --global user.email)"
echo "Bundler Path: $(bundle config get path)"

# Ask if user wants to authenticate with GitHub
read -p "Do you want to log in to GitHub now for push/pull? (y/n): " LOGIN_CHOICE
if [[ "$LOGIN_CHOICE" =~ ^[Yy]$ ]]; then
    # Install GitHub CLI if missing
    if ! command -v gh &> /dev/null; then
        echo "📦 Installing GitHub CLI..."
        sudo apt update && sudo apt install gh -y
    fi

    echo "🔑 Starting GitHub login..."
    gh auth login
    echo "✅ GitHub authentication complete."
else
    echo "ℹ️ Skipping GitHub login."
fi
