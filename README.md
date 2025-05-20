# codex_test

This repository contains a simple Tetris game implemented with HTML, CSS and JavaScript. The game can be played directly in the browser.

## Development
Open `index.html` in a web browser to start playing.

## Deployment
GitHub Actions deploys the content of this repository to the `gh-pages` branch so it can be served with GitHub Pages.

Pull requests automatically build a preview of the site using a separate `gh-pages-pr` branch. Each PR is deployed to a `pr-<number>` directory under that branch.

## GitHub Pages Setup
1. GitHub リポジトリの **Settings** → **Pages** で Source を `GitHub Actions` に設定します。
2. `.github/workflows/deploy.yml` の `permissions` セクションを `contents: write` にして、`gh-pages` ブランチへデプロイできるようにします。
3. `main` ブランチへ push すると、Workflow が自動で実行され `gh-pages` ブランチに HTML ファイルが公開されます。
4. プルリクエストでは `pr_preview.yml` が実行され、`gh-pages-pr` ブランチの `pr-<番号>` ディレクトリにプレビューが作成されます。
