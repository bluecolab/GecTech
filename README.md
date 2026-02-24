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

## Deployment

Deployment is handled by GitHub actions, a simple push to main is enough.

## List of all dashboards

- Weather - https://colabprod01.pace.edu/grafana/public-dashboards/139d29dc18204fa28d1b39ef672c45f5?orgId=1&from=now-2d&to=now&refresh=15m
- Ada WQI - https://colabprod01.pace.edu/grafana/public-dashboards/28b52eaadf8041d490b3bca36f16101c?orgId=1&from=now-2d&to=now&refresh=15m
- Alan WQI - https://colabprod01.pace.edu/grafana/public-dashboards/841327a5d5fa493b8f14d638ffe2041e?orgId=1&from=now-2d&to=now&refresh=15m
- Water Monitor Ada - https://colabprod01.pace.edu/grafana/public-dashboards/84619475e51f410ab57a389593c0593a?orgId=1&refresh=15m
- Water Monitor Alan - https://colabprod01.pace.edu/grafana/public-dashboards/35f205ad7f9d458e949406a5612d9f04?orgId=1&refresh=15m
- Water Monitor Pier 25 (40.72152778, -74.0156111) - https://colabprod01.pace.edu/grafana/public-dashboards/42fc4d25035b449c81f3d8ecb3f08e83?orgId=1&from=now-2d&to=now&refresh=15m
- Water Monitor Pier 84 (40.76463889, -74.0031944) - https://colabprod01.pace.edu/grafana/public-dashboards/0a2e53019fad4455bb4e5d1109d00918?orgId=1&from=now-2d&to=now&refresh=15m
- Water Monitor Piermont (41.04319444, -73.8960556) - https://colabprod01.pace.edu/grafana/public-dashboards/61951a2f584f49f690969a23c349f43e?orgId=1&from=now-2d&to=now&refresh=15m
- Water Monitor West Point (41.3862049, -73.95513879) - https://colabprod01.pace.edu/grafana/public-dashboards/f4c8ba39084a4169b9b7cc053dd4da8d?orgId=1&from=now-2d&to=now&refresh=15m
- Water Monitor Poughkeepsie (41.72176015, -73.94069299) - https://colabprod01.pace.edu/grafana/public-dashboards/fa0d20863be848119bc21d7807f20b56?orgId=1&from=now-2d&to=now&refresh=15m
- Water Monitor Schodack Landing (42.4996111, -73.7768056) - https://colabprod01.pace.edu/grafana/public-dashboards/fe42f9191cf84951be4eb2e96b046a1e?orgId=1&from=now-2d&to=now&refresh=15m
- Water Monitor Albany (42.61952778, -73.7589167) - https://colabprod01.pace.edu/grafana/public-dashboards/1ca141bf9a394c86b9103c1812ec9b28?orgId=1&from=now-2d&to=now&refresh=15m
- Water Monitor Botanical Garden/Bronx River (40.86230556, -73.8743888) - https://colabprod01.pace.edu/grafana/public-dashboards/9f36097dcd344550ac27631d91ad7994?orgId=1&from=now-2d&to=now&refresh=15m
- Purple Air Stations: https://bluecolab.github.io/grafana-dashboard-gallery/purple-air-1/ (Softball Field), https://bluecolab.github.io/grafana-dashboard-gallery/purple-air-2 (Nature Center)
