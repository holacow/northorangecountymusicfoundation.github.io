# GitHub Pages setup for this Vite website

This repository must be deployed with the custom GitHub Actions workflow, not the Jekyll branch publisher.

## Required Pages setting

1. Open the repository on GitHub.
2. Open **Settings** and then **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Do not select `main /docs` or `main /root`.
5. Open **Actions** and run **Deploy website to GitHub Pages**, or push a commit to `main`.

## Repository URL behavior

For the current repository `holacow/northorangecountymusicfoundation.github.io`, the default Pages URL is:

`https://holacow.github.io/northorangecountymusicfoundation.github.io/`

The workflow automatically builds with that repository subpath.

To use the shorter root URL `https://holacow.github.io/`, rename the repository to exactly `holacow.github.io`. The workflow will automatically switch its build base to `/` after the rename.

## Expected workflow

The file `.github/workflows/deploy-pages.yml` must exist on the `main` branch. The workflow installs dependencies, builds the Vite app, uploads `artifacts/nocmf-website/dist/public`, and deploys that artifact to GitHub Pages.

A failed job named `pages-build-deployment` that mentions Jekyll or a missing `/docs` directory means the Pages source is still configured as **Deploy from a branch**. Change the source to **GitHub Actions**.
