# codex_test

This repository contains a simple Tetris game implemented with HTML, CSS and JavaScript. The game can be played directly in the browser.

## Development
Open `index.html` in a web browser to start playing.

## Deployment
GitHub Actions deploys the content of this repository to the `gh-pages` branch so it can be served with GitHub Pages.

Pull requests automatically build a preview of the site using a separate `gh-pages-pr` branch. Each PR is deployed to a `pr-<number>` directory under that branch.

## Fortune LLM
The `fortune-llm` directory contains a small web app that calls the OpenAI API to generate a daily fortune. To try it locally, put your API key in `fortune-llm/script.js` and open `fortune-llm/index.html` in your browser.

Changes pushed to `main` are deployed by the workflow in `.github/workflows/deploy.yml`, publishing this folder to GitHub Pages together with the rest of the site.
