#!/bin/bash

# Prompt for GitHub config
read -p "Enter your Git username: " GIT_USER_NAME
read -p "Enter your Git email: " GIT_USER_EMAIL

# Set Git global configuration
git config --global user.name "$GIT_USER_NAME"
git config --global user.email "$GIT_USER_EMAIL"

echo ""
echo "✅ Git configuration complete."
echo "Git User: $(git config --global user.name)"
echo "Git Email: $(git config --global user.email)"
