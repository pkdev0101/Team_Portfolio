#!/bin/bash

# Prompt user for GitHub username and email
read -p "Enter your GitHub username: " GIT_USER_NAME
read -p "Enter your GitHub email: " GIT_USER_EMAIL

# Set Git global config
git config --global user.name "$GIT_USER_NAME"
git config --global user.email "$GIT_USER_EMAIL"

# Confirm changes
echo "✅ Git global config set:"
git config --global user.name
git config --global user.email