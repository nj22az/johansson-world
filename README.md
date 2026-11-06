# Johansson World

The website of Johansson World, served at <https://nj22az.github.io/johansson-world/>: the World page, the credits,
Sakura Shōten's own pages and its browser demo. It moved here from the Office site (`nj22az.github.io`, folder
`world/`) on 6 November 2026 so that the World has its own storage and its own 1 GB GitHub Pages limit. The Office
site keeps small redirect pages at the old `/world/` addresses.

## What lives where

| Path | What it is |
|------|------------|
| `site/` | Every page and picture served at `/johansson-world/`. Edit the World page and Sakura's pages here. |
| `sakura-demo-release.txt` | The GitHub Release whose files are the browser demo, served at `/johansson-world/sakura/play/`. |
| `sakura-demo.sha256` | The demo files' checksums. The publish workflow refuses a release that does not match. |
| `.github/workflows/pages.yml` | Builds and publishes the site on every push to `main`, or by hand. |
| `tools/publish-sakura-demo.sh` | Uploads a new demo build as a release and points the site at it. |

The demo's build (Godot's web export, about 350 MB) is never committed: it is kept as release files, so the repository
stays a few megabytes however many demos are published. Each publish copies the release into the site before it is
deployed, so the game still loads from the site's own address.

Pages and stylesheets that every page shares (`/styles.css`, `/shared.js`, `/config.js`, `/linux-port/…`, `/assets/…`)
and Johansson Town (`/johansson-town/`) still come from the Office site on the same address.

## Publishing a new browser demo

```bash
tools/publish-sakura-demo.sh <tag> <folder with the assembled web build>
```

It uploads the folder as a release, writes the tag and checksums, commits and pushes; the push publishes the site.
Old releases can be deleted from GitHub's Releases page once a newer demo is live.
