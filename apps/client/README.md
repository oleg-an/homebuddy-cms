![HomeBuddy App](https://sirengroup.atlassian.net/s/-ia3qmx/b/4/b3035ff30adf22930b2add21ed173cec/_/jira-logo-scaled.png)

# HomeBuddy App

The Front-end part of HomeBuddy. It is a React application that uses craco, react-query, react-hook-form, and zustand. The project uses Yarn as its package manager.

## Getting Started

To launch the project locally, create a `.env.local` file in the root directory and copy everything from `.env.local.example`.

## Available Scripts

In the project directory, you can run:

`yarn dev`

Runs the app in the development mode using craco.

`yarn build`

Builds the app for production to the `build` folder using craco.

`yarn build:e2e`

Builds the app for end-to-end testing with a specific API base URL.

`yarn eject`

This command will remove the single build dependency from your project.

`yarn pretest:e2e`

Removes coverage and nyc output directories before running end-to-end tests.

`yarn test`

Runs both unit and end-to-end tests.

`yarn test:unit`

Runs unit tests using Jest.

`yarn test:e2e`

Runs end-to-end tests using Playwright with nyc for coverage reporting.

`yarn lint`

Runs linting for both source and end-to-end test files.

`yarn lint:ci`

Runs linting for continuous integration.

`yarn test:e2e:update-snapshots`

Updates snapshots for end-to-end tests.

`yarn lint:src`

Runs ESLint on source files.

`yarn lint:src:ci`

Runs ESLint on source files for continuous integration.

`yarn lint:e2e`

Runs ESLint on end-to-end test files.

`yarn lint:e2e:ci`

Runs ESLint on end-to-end test files for continuous integration.

`yarn lint:fix`

Fixes linting issues in both source and end-to-end test files.

`yarn prettier`

Checks if source files are formatted using Prettier.

`yarn prettier:fix`

Formats source files using Prettier.

`yarn check`

Runs Prettier, linter, and spell check.

`yarn check:ci`

Runs Prettier, linter, spell check, and package check for continuous integration.

`yarn check:env:prod`

Checks if production environment variables are set.

`yarn check:env:stage`

Checks if staging environment variables are set.

`yarn check:package`

Runs npmPkgJsonLint on the project.

`yarn check:spell`

Runs a spell check on source files.

`yarn format`

Formats source files and fixes linting issues.

`yarn prepare`

Installs Husky for managing git hooks.

`yarn postinstall`

Installs Husky after package installation.

`yarn storybook`

Starts Storybook on port 6006.

`yarn storybook:build`

Builds Storybook for production.
