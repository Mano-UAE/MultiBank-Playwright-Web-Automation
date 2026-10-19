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

1. Clone the repository
git clone https://github.com/Mano-UAE/MultiBank-Playwright-Web-Automation.git

2. Navigate to the project folder
cd MultiBank-Playwright-Web-Automation

3. Install dependencies
npm install

4. Install Playwright browsers
npx playwright install

## Run Tests

5. Run the complete test suite
npm test

6. Run tests in individual browsers:
npm run test:chromium
npm run test:firefox
npm run test:webkit

## Test Report

7. View the HTML test report

npm run report

## Notes

The tests cover functionality available on the public website. No account creation or submission of personal or financial information is required.

## Repository

[MultiBank Playwright Web Automation](https://github.com/Mano-UAE/MultiBank-Playwright-Web-Automation)
