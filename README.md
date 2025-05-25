# codex_test

This repository contains a simple Tetris game implemented with HTML, CSS and JavaScript. The game can be played directly in the browser. A small Puyo Puyo style puzzle game is also included.

## Development
Open `index.html` in a web browser to start playing Tetris.
Open `puyo.html` to try the Puyo Puyo style game.

### Using the fortune teller demo

The `fortune-llm` directory contains a small demo that calls the OpenAI Chat
Completion API. To use it you must provide your own API key.

1. Open `fortune-llm/index.html` in a browser.
2. ページ上部の「APIキー:」と表示されたフィールドに OpenAI API キーを入力します。
   キーはブラウザの `localStorage` に保存され、次回以降自動的に読み込まれます。
3. 必要に応じて、スクリプト読み込み前に `window.OPENAI_API_KEY` を設定してキーを
   渡すこともできます。

If the key is missing the page will display a friendly message instead of calling
the API.

## Deployment
GitHub Actions deploys the content of this repository to the `gh-pages` branch so it can be served with GitHub Pages.

Pull requests automatically build a preview of the site using a separate `gh-pages-pr` branch. Each PR is deployed to a `pr-<number>` directory under that branch.

## Fortune LLM
The `fortune-llm` directory contains a small web app that calls the OpenAI API to generate a daily fortune. Open `fortune-llm/index.html` in your browser and enter your API key when prompted.

### Setting your API key

Enter your OpenAI API key in the field labeled "APIキー:" at the top of the page. The key is stored in `localStorage` so you don't have to re-enter it each time. Alternatively you can expose the key at runtime by assigning it to `window.OPENAI_API_KEY` before the script is loaded.

Changes pushed to `main` are deployed by the workflow in `.github/workflows/deploy.yml`, publishing this folder to GitHub Pages together with the rest of the site.
