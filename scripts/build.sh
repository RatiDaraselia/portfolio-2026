#!/usr/bin/env bash
# Compiles the .jsx sources to plain scripts in build/.
#
# Why this exists: the site used to transpile JSX in the browser with
# Babel-standalone, which fetches each .jsx over XHR. Browsers block that for
# file:// pages, so opening index.html straight from the folder rendered a
# blank page. Plain <script src> tags have no such restriction.
#
# Each file is transformed on its own, never bundled, so top-level
# declarations stay shared between the four scripts exactly as before.
#
#   scripts/build.sh           build once
#   scripts/build.sh --watch   rebuild on every save, for editing
#
# The .jsx files remain the source of truth. Edit those, never build/.
set -euo pipefail
cd "$(dirname "$0")/.."

ESBUILD="npx --yes esbuild@0.24.2"
ARGS=(tweaks-panel.jsx icons.jsx sections.jsx app.jsx
      --outdir=build --jsx=transform --target=es2020 --log-level=warning)

if [[ "${1:-}" == "--watch" ]]; then
  echo "Watching .jsx files — rebuilding build/ on save. Ctrl+C to stop."
  exec $ESBUILD "${ARGS[@]}" --watch=forever --log-level=info
fi

$ESBUILD "${ARGS[@]}"
echo "Built: $(ls build/*.js | tr '\n' ' ')"
