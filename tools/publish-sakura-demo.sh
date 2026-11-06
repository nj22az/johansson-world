#!/bin/sh
# Publish a new Sakura Shōten browser demo: upload the assembled web build as a release of this repository, point the
# site at it and push (the push publishes the site). Usage: tools/publish-sakura-demo.sh <tag> <build folder>
set -eu
tag=$1 dir=$2
cd "$(dirname "$0")/.."
test -f "$dir/index.html" && test -f "$dir/game.json" || { echo "not a web build: $dir" >&2; exit 1; }
grep -q 'nj22az.github.io/world/\|"/world/' "$dir/index.html" && { echo "index.html still links /world/: use /johansson-world/" >&2; exit 1; }
gh release create "$tag" --repo nj22az/johansson-world --title "Sakura Shōten browser demo ($tag)" \
  --notes "The browser demo served at https://nj22az.github.io/johansson-world/sakura/play/." "$dir"/*
echo "$tag" > sakura-demo-release.txt
(cd "$dir" && shasum -a 256 *) > sakura-demo.sha256
git add sakura-demo-release.txt sakura-demo.sha256
git commit -m "Sakura demo: $tag"
git push origin HEAD:main
