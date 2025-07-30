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

# 2. Python Virtual Envs
VENV_DIR="$HOME/.local/venvs"
mkdir -p "$VENV_DIR"

# Update aliases to point to new location
add_to_bashrc "alias flaskenv=\"source $VENV_DIR/flaskenv/bin/activate\""
add_to_bashrc "alias pagesenv=\"source $VENV_DIR/pagesenv/bin/activate\""
add_to_bashrc "export PATH=\"$VENV_DIR/flaskenv/bin:$VENV_DIR/pagesenv/bin:\$PATH\""

# Flaskenv
if [ ! -d "$VENV_DIR/flaskenv" ]; then
    python3 -m venv "$VENV_DIR/flaskenv"
    source "$VENV_DIR/flaskenv/bin/activate"
    pip install --upgrade pip
    pip install Flask requests SQLAlchemy Werkzeug Flask-Login Flask-SQLAlchemy Flask-Migrate \
                Flask-RESTful Flask-Cors PyJWT pandas numpy matplotlib seaborn scikit-learn \
                pymysql psycopg2-binary python-dotenv boto3
    deactivate
fi

# Pagesenv
if [ ! -d "$VENV_DIR/pagesenv" ]; then
    python3 -m venv "$VENV_DIR/pagesenv"
    source "$VENV_DIR/pagesenv/bin/activate"
    pip install --upgrade pip
    pip install nbconvert nbformat pyyaml notebook requests python-dotenv pandas seaborn \
                scikit-learn progress newspaper3k wikipedia emoji lxml_html_clean
    deactivate
fi

# 3. Ruby Gems
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