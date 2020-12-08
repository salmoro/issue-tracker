# Viventium Issue Tracker
A demo Issue Tracker

#### Prerequisites
1. Installed [NodeJS](https://nodejs.org/en/download/).
2. Installed NPM (generally installed with NodeJS).
3. Run `npm install` in the command-line within this project's directory

## Local Serve
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests
Run `npm test` to execute the unit tests via [jest](https://jestjs.io/).

## Lint
Run `npm lint` to lint the code via [TSLint](https://palantir.github.io/tslint/).

## Generate mock data JSON
1. Edit contents in `./src/app/shared/data/mock-posts.ts`
2. Run `npm run create-mock-data` to generate a new JSON file at `./src/assets/posts.json`.

## Developers
- Shlomo Morosow <smorosow.dev@gmail.com>
