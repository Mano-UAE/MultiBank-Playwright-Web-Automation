# MultiBank Playwright Automation

## Overview

This project contains automated tests for selected functionality of the public MultiBank trading platform using Playwright and TypeScript.

## Technology Used

- Playwright Test
- TypeScript
- Page Object Model (POM)
- Chromium, Firefox, and WebKit

## Test Coverage

- Navigation and page layout
- Trading pair visibility
- Page content validation
- App download links
- Invalid URL handling
- API and network response validation
- Cross-browser execution

## Project Structure

```
Trade/
├── pages/
│   ├── THomePage.ts
│   └── TLoginPage.ts
├── tests/
│   └── Tradecases.spec.ts
├── testData/
│   └── testdata/
│       └── aboutus.json
├── screenshots/
├── playwright.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## How to Run

Make sure Node.js and npm are installed.

Clone the repository and navigate to the project folder:

git clone https://github.com/Mano-UAE/MultiBank-Playwright-Web-Automation.git
cd MultiBank-Playwright-Web-Automation

Install the project dependencies and Playwright browsers:

npm install
npx playwright install

## Run Tests

Run the complete test suite:

npm test

Run tests in individual browsers:

npm run test:chromium
npm run test:firefox
npm run test:webkit

## Test Report

After running the tests, open the Playwright HTML report:

npm run report

## Notes

The tests cover functionality available on the public website. No account creation or submission of personal or financial information is required.

## Repository

[MultiBank Playwright Web Automation](https://github.com/Mano-UAE/MultiBank-Playwright-Web-Automation)
