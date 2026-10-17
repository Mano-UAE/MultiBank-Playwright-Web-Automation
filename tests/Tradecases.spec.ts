import { test , expect} from '@playwright/test';
import { HomePage } from '../pages/THomePage';

// // =================================
// //       Navigation & Layout
// // =================================
// // TC01:Top navigation renders with all expected items visible
test.describe('Navigation & Layout', () => {
test('Check navigation names', async ({ page }) => {
     const homePage = new HomePage(page);
     await homePage.verifyNavigationAndLayout();
    //await page.pause();
});
// // // TC02:Each navigation item links to the correct destination
test('Each navigation item links to the correct destination', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.verifyNavigationLinks();
});
// // //  TC03:Navigation behaves correctly at standard desktop viewport sizes
test('Verify Desktop navigation works at standard desktop screen sizes', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.verifyDesktopNavigation();
});
});

// // =================================
// //       Trading Functionality
// // =================================
//   // TC04:Spot trading section renders and displays trading pairs
test.describe('Trading Functionality', () => {
test('Verify Spot Trading section & pairs are visible', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.verifySpotTradingSection();
});
// // // TC05:Trading pairs are correctly grouped into categories
test('Verify Trading Pairs Categories', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.verifyTradingPairsCategories();
});
// // // TC06:Trading pair entries contain the expected data fields
test('Verify Expected trading pairs are ', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.checkTradingExpectedPairs();
});
});

// // ============================================
// //        Content & Links
// // ============================================
// // TC07: Marketing banners render in the expected page region
test.describe('Content & Links', () => {
test('Marketing Banner Visibility', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.verifyMarketingBanner();
});
// // TC08: App Store and Google Play download links resolve correctly
test('Verify App Store and Google Play links', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.verifyAppDownloadLinks();
});
// // TC09: About Us > Why MultiBank page renders all expected components with correct headings and section text
test('Verify About Us links', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.verifyAboutUsLinks();
});
});

// // ============================================
// //         Negative Cases
// // ============================================
// TC10: Invalid route handling
test.describe('Negative Cases', () => {
test('Invalid Route Handling', async ({ page }) => {
  const homePage = new HomePage(page);
   await homePage.verifyInvalidRouteHandling();
});
// // TC11: Content Timeout handling
test('Content loading timeout handling', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.verifyContentLoadingTimeout();
});
});
// // ============================================
// //         Bonus Optional Case: 
// // ============================================
// // TC12: Validate relevant API/network responses
test.describe('Bonus Optional Case', () => {
test('Check API/network responses', async ({ page }) => {
   const homePage = new HomePage(page);
   await homePage.verifyApiNetworkResponse();
})
});
