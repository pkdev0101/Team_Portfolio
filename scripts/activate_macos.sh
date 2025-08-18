#!/bin/bash
set -ex

BASHRC="$HOME/.zshrc"

log() {
    echo "=== ✅ $1 ==="
}

add_to_bashrc() {
    local line="$1"
    grep -qxF "$line" "$BASHRC" || echo "$line" >> "$BASHRC"
}

# 0. Aliases and Virtualenv Prompt
add_to_bashrc 'alias code="code --no-sandbox"'

# 1. Brew Packages (Python & Ruby)
brew update
brew install python ruby

# 2. Ruby Gems
# Add Homebrew Ruby to PATH (before system Ruby)
RUBY_PATH=$(brew --prefix ruby)/bin
add_to_bashrc "export PATH=\"$RUBY_PATH:\$PATH\""

# Set GEM_HOME to user-accessible location
GEM_HOME="$HOME/.local/gems"
mkdir -p "$GEM_HOME"
add_to_bashrc "export GEM_HOME=\"$GEM_HOME\""
add_to_bashrc "export PATH=\"$GEM_HOME/bin:\$PATH\""

# Install gems (no sudo needed now)
gem install bundler jekyll benchmark openssl zlib racc bigdecimal drb unicode-display_width \
            logger etc fileutils ipaddr mutex_m ostruct rss strscan stringio time
