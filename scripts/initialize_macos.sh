#!/bin/bash

# Complete Interactive macOS Development Setup Megascript
# PREREQUISITE: User must have already cloned the repository
# Expected to be run from within the cloned repository directory

set -e  # Exit on any error

# Function to pause and wait for user confirmation
wait_for_user() {
    echo ""
    read -p "Press Enter to continue..."
    echo ""
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if a line exists in run commands
line_exists_in_rc() {
    grep -Fxq "$1" ~/.zshrc
}

# Function to add line to run commands
add_to_rc() {
    if ! line_exists_in_rc "$1"; then
        echo "$1" >> ~/.zshrc
    fi
}

clear
echo "========================================="
echo "Complete macOS Development Setup"
echo "This will install everything needed for"
echo "web development and GitHub Pages"
echo "========================================="
echo ""

# Verify we're in the right directory
if [ ! -f "requirements.txt" ] || [ ! -f "Gemfile" ]; then
    echo "❌ ERROR: This script must be run from the cloned repository directory"
    echo "Please ensure you have:"
    echo "1. Cloned the repository: git clone https://github.com/open-coding-society/student.git"
    echo "2. Changed to the repository directory: cd student"
    echo "3. Run this script from within that directory"
    exit 1
fi

echo "✓ Repository detected - proceeding with setup..."
echo ""

# PHASE 1: Basic Tools Installation
echo "🔧 PHASE 1: Installing Basic Tools"
echo "========================================="

# Step 1: VS Code Installation
echo "Now I am checking if VS Code is installed..."
if command_exists code; then
    echo "✓ VS Code is already installed"
else
    echo "VS Code is not installed. Please install it manually:"
    echo "1. Go to https://code.visualstudio.com/"
    echo "2. Download VS Code for macOS"
    echo "3. Install the application"
    echo "4. Make sure 'code' command is available in terminal"
    wait_for_user
fi

# Step 2: Homebrew Installation
echo "Now I am checking if Homebrew is installed..."
if command_exists brew; then
    echo "✓ Homebrew is already installed"
else
    echo "Now I am installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    echo "✓ Homebrew installation completed"
fi

# Step 3: Verify Homebrew Installation
echo "Now I am verifying Homebrew installation..."
brew --version
echo "✓ Homebrew verification completed"

wait_for_user

# PHASE 2: Install Core Development Tools
echo "⚙️  PHASE 2: Installing Core Development Tools"
echo "========================================="

echo "Now I am upgrading Homebrew packages..."
echo "=== Upgrade Packages ==="
yes | brew update
yes | brew upgrade
yes | brew install xz # decompression utility
echo "✓ Homebrew packages upgraded"

echo "Now I am installing Ruby..."
echo "=== Install Ruby ==="
yes | brew install rbenv

# Test if Ruby 3.1.4 exists
echo "Checking for Ruby 3.1.4..."
if ! rbenv versions | grep -q 3.1.4; then   
    echo "Installing Ruby 3.1.4..."
    yes | rbenv install 3.1.4
fi
rbenv global 3.1.4
echo "✓ Ruby 3.1.4 installed and configured"

# Configure rbenv to initialize in the shell
echo "Now I am configuring Ruby environment..."
add_to_rc "# rbenv initialize"
add_to_rc 'if which rbenv > /dev/null; then eval "$(rbenv init - zsh)"; fi'
echo "✓ Ruby environment configured"

echo "Now I am installing Python..."
echo "=== Install Python ==="
yes | brew install python
echo "✓ Python installed"

echo "Now I am installing Jupyter Notebook..."
echo "=== Install Jupyter Notebook ==="
yes | brew install jupyter
echo "✓ Jupyter Notebook installed"

wait_for_user

# PHASE 3: GitHub Pages Setup
echo "📄 PHASE 3: Setting Up GitHub Pages Tools"
echo "========================================="

echo "Now I am configuring GitHub Pages build tools..."
echo "=== GitHub pages build tools  ==="
export GEM_HOME="$HOME/gems"
export PATH="$HOME/gems/bin:$PATH"
add_to_rc "# Ruby Gem Path"
add_to_rc 'export GEM_HOME="$HOME/gems"'
add_to_rc 'export PATH="$HOME/gems/bin:$PATH"'

echo "Now I am installing Jekyll and Bundler..."
echo "=== Gem install starting, thinking... ==="
gem install jekyll bundler
echo "✓ Jekyll and Bundler installed"

wait_for_user

# PHASE 4: Custom macOS Configuration
echo "🔗 PHASE 4: Custom macOS Configuration"
echo "========================================="

echo "Now I am setting up custom macOS symbolic links..."

echo "Creating Jupyter nbconvert symlink..."
mkdir -p ~/Library/Jupyter
ln -sF /opt/homebrew/share/jupyter/nbconvert ~/Library/Jupyter 2>/dev/null || echo "Symlink already exists or path not found"
echo "✓ Jupyter nbconvert symlink created"

echo "Creating Python3.12 symlink..."
sudo ln -sF /opt/homebrew/bin/python3.12 /usr/local/bin/python 2>/dev/null || echo "Symlink already exists or Python 3.12 not found"
echo "✓ Python symlink created"

echo "Creating pip3.12 symlink..."
sudo ln -sF /opt/homebrew/bin/pip3.12 /usr/local/bin/pip 2>/dev/null || echo "Symlink already exists or pip 3.12 not found"
echo "✓ Pip symlink created"

wait_for_user

# PHASE 5: Project Setup and Web Server
echo "🌐 PHASE 5: Setting Up Project and Web Server"
echo "========================================="

echo "Now I am creating Python virtual environment..."
python -m venv venv
echo "✓ Virtual environment created"

echo "Now I am activating virtual environment..."
source venv/bin/activate
echo "✓ Virtual environment activated"

echo "Now I am installing Python requirements..."
pip install -r requirements.txt
echo "✓ Python requirements installed"

echo "Now I am installing Ruby bundle..."
bundle install
echo "✓ Ruby bundle installed"

echo "Now I am building the website..."
make
echo "✓ Website build completed"

wait_for_user

# PHASE 6: Version Checks and Final Verification
echo "✅ PHASE 6: Final Verification"
echo "========================================="

echo "Now I am performing version checks to verify installation..."

echo "Checking Ruby version..."
ruby -v

echo "Checking Bundle version..."
bundle -v

echo "Checking Python version..."
python --version

echo "Checking Jupyter version..."
jupyter --version

echo ""
echo "========================================="
echo "🎉 COMPLETE SETUP FINISHED!"
echo "========================================="
echo ""
echo "✓ All tools have been installed and verified"
echo "✓ Development environment is ready"
echo "✓ GitHub Pages tools are configured"
echo "✓ Website has been built successfully"
echo ""
echo "📋 NEXT STEPS:"
echo "1. The website should now be running"
echo "2. Look for a local server URL in the output above"
echo "3. Ctrl+Click on the link to open in browser"
echo "4. You may need to start a new terminal for all"
echo "   environment changes to take full effect"
echo ""
echo "🔄 To restart the web server later:"
echo "   cd $(pwd)"
echo "   source venv/bin/activate"
echo "   make"
echo ""
echo "📁 Your project is located at: $(pwd)"
echo "========================================="
