#!/usr/bin/env bash
# Builds dist/ for GitHub project-page hosting and publishes it to the
# gh-pages branch from a temporary worktree, so build output never has to be
# committed on main.  Usage: [PG_DOMAIN=example.com] tools/deploy.sh [--dry-run]
set -euo pipefail
cd "$(dirname "$0")/.."
# Custom domain: PG_DOMAIN=example.com tools/deploy.sh builds for the domain
# root (no base path), sets the canonical origin and writes the CNAME file
# GitHub Pages needs. Without it the build targets the project page.
if [ -n "${PG_DOMAIN:-}" ]; then
  BASE=""; ORIGIN="https://$PG_DOMAIN"
else
  BASE="${PG_BASE-/patterngrid}"; ORIGIN="${PG_ORIGIN:-https://olufemiadetiwa.github.io}"
fi
node tools/build-static.js --base "$BASE" --origin "$ORIGIN"
[ -n "${PG_DOMAIN:-}" ] && printf '%s\n' "$PG_DOMAIN" > dist/CNAME
[ "${1:-}" = "--dry-run" ] && { echo "dry run: dist/ built, nothing pushed"; exit 0; }
WT="$(mktemp -d)"
git worktree add -q "$WT" gh-pages
rsync -a --delete --exclude .git dist/ "$WT"/
( cd "$WT" && git add -A && git -c user.name="deploy" -c user.email="deploy@patterngrid" commit -q -m "Deploy $(git -C "$OLDPWD" rev-parse --short HEAD)" || echo "nothing to deploy" ) 
git -C "$WT" push -q origin gh-pages
git worktree remove --force "$WT"
echo "deployed $(git rev-parse --short HEAD) to gh-pages"
