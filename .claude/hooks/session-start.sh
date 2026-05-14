#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

SKILL_DIR="$HOME/.claude/skills/frontend-slides"
BASE_URL="https://raw.githubusercontent.com/zarazhangrui/frontend-slides/main"

if [ -f "$SKILL_DIR/SKILL.md" ] && [ -f "$SKILL_DIR/scripts/extract-pptx.py" ]; then
  exit 0
fi

mkdir -p "$SKILL_DIR/scripts"

for f in SKILL.md STYLE_PRESETS.md viewport-base.css html-template.md animation-patterns.md; do
  curl -fsSL --retry 3 --retry-delay 2 -o "$SKILL_DIR/$f" "$BASE_URL/$f"
done

curl -fsSL --retry 3 --retry-delay 2 -o "$SKILL_DIR/scripts/extract-pptx.py" "$BASE_URL/scripts/extract-pptx.py"
chmod +x "$SKILL_DIR/scripts/extract-pptx.py"
