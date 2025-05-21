# codex_test

This repository contains a simple Tetris game implemented with HTML, CSS and JavaScript. The game can be played directly in the browser.

## Development
Open `index.html` in a web browser to start playing.

### Using the fortune teller demo

The `fortune-llm` directory contains a small demo that calls the OpenAI Chat
Completion API. To use it you must provide your own API key.

1. Edit `fortune-llm/script.js` and set the `apiKey` constant to your key **or**
   expose the key at runtime by assigning it to `window.OPENAI_API_KEY` before the
   script is loaded.
2. Open `fortune-llm/index.html` in a browser.

If the key is missing the page will display a friendly message instead of calling
the API.

## Deployment
GitHub Actions deploys the content of this repository to the `gh-pages` branch so it can be served with GitHub Pages.

Pull requests automatically build a preview of the site using a separate `gh-pages-pr` branch. Each PR is deployed to a `pr-<number>` directory under that branch.

## Fortune LLM
The `fortune-llm` directory contains a small web app that calls the OpenAI API to generate a daily fortune. To try it locally, put your API key in `fortune-llm/script.js` and open `fortune-llm/index.html` in your browser.

### Setting your API key

Edit `fortune-llm/script.js` and replace the empty string assigned to `apiKey` with your own OpenAI API key:

```javascript
const apiKey = 'sk-...';
```

Alternatively you can expose the key at runtime by assigning it to `window.OPENAI_API_KEY` before the script is loaded.

Changes pushed to `main` are deployed by the workflow in `.github/workflows/deploy.yml`, publishing this folder to GitHub Pages together with the rest of the site.
