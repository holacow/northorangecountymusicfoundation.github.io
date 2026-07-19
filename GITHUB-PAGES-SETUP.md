# GitHub Pages setup

This repository includes an automatic GitHub Pages deployment workflow.

1. Upload or commit all files to the repository's `main` branch.
2. Open the repository on GitHub.
3. Go to **Settings**, then **Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Open the **Actions** tab and wait for **Deploy website to GitHub Pages** to finish successfully.
6. Return to **Settings**, then **Pages**, to open the published website.

Do not set Pages to deploy directly from the root of the `main` branch. The files in the repository are Vite source files and must be compiled first.

The workflow automatically:

- Installs the pnpm dependencies
- Builds `artifacts/nocmf-website`
- Uses the correct repository subpath for assets
- Adds a fallback page so internal routes can load after refreshing
- Publishes the generated `dist/public` folder
