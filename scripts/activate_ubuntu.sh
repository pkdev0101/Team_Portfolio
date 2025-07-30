#!/bin/bash
set -ex

# Ubuntu Configuration to Match Kasm

BASHRC="$HOME/.bashrc"
GEM_HOME="/opt/gems"

log() {
    echo "=== ✅ $1 ==="
}

add_to_bashrc() {
    local line="$1"
    grep -qxF "$line" "$BASHRC" || echo "$line" >> "$BASHRC"
}

# 0. Aliases and Virtualenv Prompt
add_to_bashrc 'alias flaskenv="source /opt/venvs/flaskenv/bin/activate"'
add_to_bashrc 'alias pagesenv="source /opt/venvs/pagesenv/bin/activate"'
add_to_bashrc 'alias code="code --no-sandbox"'
add_to_bashrc 'export PATH="/opt/venvs/flaskenv/bin:/opt/venvs/pagesenv/bin:$PATH"'
add_to_bashrc 'export GEM_HOME="/opt/gems"'
add_to_bashrc 'export PATH="/opt/gems/bin:$PATH"'
if ! grep -q 'VIRTUAL_ENV' "$BASHRC"; then
cat <<EOF >> "$BASHRC"
# Show Python virtualenv in prompt
if [[ -n "\$VIRTUAL_ENV" ]]; then
    venv="(\$(basename \$VIRTUAL_ENV)) "
else
    venv=""
fi
export PS1="\${venv}\u:\w\$ "
EOF
fi

# 1. APT Packages
sudo apt update
sudo apt install -y python3 python3-pip python-is-python3 python3-venv ruby-full build-essential \
    zlib1g-dev jupyter-notebook sqlite3

# 2. Python Virtual Envs
mkdir -p /opt/venvs && sudo chmod 755 /opt/venvs

# Flaskenv
if [ ! -d /opt/venvs/flaskenv ]; then
    python3 -m venv /opt/venvs/flaskenv
    source /opt/venvs/flaskenv/bin/activate
    pip install --upgrade pip
    pip install Flask requests SQLAlchemy Werkzeug Flask-Login Flask-SQLAlchemy Flask-Migrate \
                Flask-RESTful Flask-Cors PyJWT pandas numpy matplotlib seaborn scikit-learn \
                pymysql psycopg2-binary python-dotenv boto3
    deactivate
fi

# Pagesenv
if [ ! -d /opt/venvs/pagesenv ]; then
    python3 -m venv /opt/venvs/pagesenv
    source /opt/venvs/pagesenv/bin/activate
    pip install --upgrade pip
    pip install nbconvert nbformat pyyaml notebook requests python-dotenv pandas seaborn \
                scikit-learn progress newspaper3k wikipedia emoji lxml_html_clean
    deactivate
fi

# 3. Ruby Gems
sudo mkdir -p "$GEM_HOME"
sudo chmod -R 777 "$GEM_HOME"
sudo gem install bundler jekyll benchmark openssl zlib racc bigdecimal drb unicode-display_width \
                 logger etc fileutils ipaddr mutex_m ostruct rss strscan stringio time
