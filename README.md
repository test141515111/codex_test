# codex_test

This repository contains a simple Tetris game implemented with HTML, CSS and JavaScript. The game can be played directly in the browser.

## Development
Open `index.html` in a web browser to start playing.

The `fortune-llm` directory contains a simple page that calls OpenAI's API to
generate a daily fortune. Before deploying or using it, set your API key in
`fortune-llm/script.js` by replacing the empty `apiKey` value. Without a valid
key the page will display an error.

## Deployment
GitHub Actions deploys the content of this repository to the `gh-pages` branch so it can be served with GitHub Pages.

Pull requests automatically build a preview of the site using a separate `gh-pages-pr` branch. Each PR is deployed to a `pr-<number>` directory under that branch.
