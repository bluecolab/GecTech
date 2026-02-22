# Gale Epstein Center Displays
 
<div align="center">
<img src="./assets/GECTPE-logo-400x65-copy-1.png" height="250px" style="padding:10px;">
 
<br>

<a href="https://www.typescriptlang.org/">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff" alt="TypeScript">
</a>
<a href="https://eslint.org/">
  <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint">
</a>
<a href="https://prettier.io/">
  <img src="https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black"
  alt="Prettier">
</a>
<a href="https://react.dev/">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
</a>
<a href="https://expo.dev/">
  <img src="https://img.shields.io/badge/Expo-000000?logo=Expo&logoColor=white" alt="Expo">
</a>
<h2>React Kiosk for Blue CoLab!</h2>
</div>

## About the Project

Gale Epstein Center Displays. 

### Features

Check it out here: https://gectech.expo.app/ !

## Required Software

- [git](https://git-scm.com/) - version control. For installing git, please see the [git website](https://git-scm.com/).
- [npm](https://www.npmjs.com/) - package manager. For installing npm, please see [npm docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- All other prerequisites will be downloaded from the `package.json`. To install them see 'Getting Started'.

## Recommended Software

- [VS Code](https://code.visualstudio.com/) - code editor
    - Please download the recommended extensions if prompted.
    - Recommended Extensions (look up @recommended in Extensions tab):
        - Prettier - Code formatter
        - ESLint
        - Prettier ESLint
        - Tailwind CSS
        - Code Spell Checker
        - GitHub Pull Requests
- [GitHub CLI](https://cli.github.com/) - CLI for GitHub

## Getting Started (one-time steps)

1. Install all the software above.
2. Clone the repo by running:
    ```bash
    git clone https://github.com/bluecolab/GecTech.git
    ```
3. Navigate in your terminal to the `GecTech`:
    ```bash
    cd /GecTech/
    ```
4. Install the dependencies by running:
    ```bash
    npm i
    ```

## Running locally on computer via Expo Go

1. Open a terminal window.
2. Make sure you are in the `GecTech`.
3. In the terminal start the app by running:
    ```bash
    npx expo start
    ```
4. Hit the 'W' key to start building the web-version of the GecTech.

## Build and deploy

Pushing to main automatically start the deployment process. This will take a few minutes. Once ready your changes will be visible here: https://gectech.expo.app/ 

## File structure

### High level overview:

We use [file-based navigation](https://docs.expo.dev/router/basics/core-concepts/) provided via the [Expo Router](https://docs.expo.dev/router/introduction/) for navigation.

Please follow this structure when creating new files:

```
react-kiosk - Parent folder, for all sub-directories and config files
├───.github - The files for workflows for GitHub Actions and the pull request template.
├───app - For all app pages and navigation related files
├───assets - For all images, icons, and fonts
├───components - For all of the custom components (building blocks of pages)
├───hooks - For all of the custom hooks (reusable logic for state, data fetching, etc.)
├───scripts - Misc. scripts used by CICD
└───types - For all custom TypeScript type definitions
```

Each of the above directories may be organized even further, grouped by similar functionality.

# Deployment

Deployment is handled by GitHub actions, a simple push to main is enough.

