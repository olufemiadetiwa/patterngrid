#!/usr/bin/env bash
# Builds dist/ and publishes it, so build output never has to be committed.
#
#   tools/deploy.sh             production: https://patterngrid.ng (this repo's
#                               gh-pages branch, CNAME written). Only from main.
#   tools/deploy.sh --staging   staging: https://olufemiadetiwa.github.io/patterngrid-staging/
#                               (the patterngrid-staging repo's gh-pages branch),
#                               from any branch, marked noindex with a Staging badge.
#   add --dry-run to build without pushing.
set -euo pipefail
cd "$(dirname "$0")/.."
MODE=production; DRY=0
for a in "$@"; do case "$a" in --staging) MODE=staging;; --dry-run) DRY=1;; esac; done
BRANCH="$(git rev-parse --abbrev-ref HEAD)"; SHA="$(git rev-parse --short HEAD)"

if [ "$MODE" = staging ]; then
  STAGING_REPO="${PG_STAGING_REPO:-olufemiadetiwa/patterngrid-staging}"
  BASE="/${STAGING_REPO#*/}"; ORIGIN="https://${STAGING_REPO%%/*}.github.io"
  node tools/build-static.js --base "$BASE" --origin "$ORIGIN"
  node tools/mark-staging.js dist "$BRANCH" "$SHA"
  [ "$DRY" = 1 ] && { echo "dry run: staging dist/ built, nothing pushed"; exit 0; }
  WT="$(mktemp -d)"
  rsync -a --exclude .git dist/ "$WT"/
  ( cd "$WT" && git init -q -b gh-pages && git add -A \
    && git -c user.name="deploy" -c user.email="deploy@patterngrid" commit -q -m "Staging $BRANCH@$SHA" \
    && git push -q -f "https://github.com/$STAGING_REPO.git" gh-pages )
  rm -rf "$WT"
  echo "deployed $BRANCH@$SHA to staging: $ORIGIN$BASE/"
  exit 0
fi

# Production. PG_DOMAIN=other.tld overrides the domain; PG_DOMAIN="" builds
# for the old project page (and removes the CNAME, taking the domain down).
if [ "$BRANCH" != main ] && [ "$DRY" = 0 ] && [ "${PG_ALLOW_BRANCH:-}" != 1 ]; then
  echo "refusing to deploy production from '$BRANCH' (only main). Use --staging, or merge to main first." >&2; exit 1
fi
PG_DOMAIN="${PG_DOMAIN-patterngrid.ng}"
if [ -n "$PG_DOMAIN" ]; then
  BASE=""; ORIGIN="https://$PG_DOMAIN"
else
  BASE="${PG_BASE-/patterngrid}"; ORIGIN="${PG_ORIGIN:-https://olufemiadetiwa.github.io}"
fi
node tools/build-static.js --base "$BASE" --origin "$ORIGIN"
[ -n "$PG_DOMAIN" ] && printf '%s\n' "$PG_DOMAIN" > dist/CNAME
[ "$DRY" = 1 ] && { echo "dry run: dist/ built, nothing pushed"; exit 0; }
WT="$(mktemp -d)"
git worktree add -q "$WT" gh-pages
rsync -a --delete --exclude .git dist/ "$WT"/
( cd "$WT" && git add -A && git -c user.name="deploy" -c user.email="deploy@patterngrid" commit -q -m "Deploy $SHA" || echo "nothing to deploy" )
git -C "$WT" push -q origin gh-pages
git worktree remove --force "$WT"
echo "deployed $SHA to gh-pages"
