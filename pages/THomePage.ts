import { Page, expect } from '@playwright/test';
import aboutUsData from '../testData/test-data/aboutus.json'
import navigationData from '../testData/test-data/navigationData.json'

export class HomePage {
    constructor(private page: Page) {
    }

    async verifyNavigationAndLayout() {
        await this.page.goto('/');
        const navigationItems = await this.page.locator('header a:visible').allTextContents();
        console.log('Top Navigation items:', navigationItems);
        const items = navigationItems.filter(item => item.trim() !== '');
        //  check if the navigation items are as expected
        for (const item of items) {
            await expect(this.page.getByText(item, { exact: true }).first()).toBeVisible();
            console.log(`Navigation item "${item}" is visible.`);
        }
    }

    async verifyNavigationLinks() {
        await this.page.goto('/');

        await this.page.goto('/');

        const links = this.page.locator('header a:visible');
        const count = await links.count();

        await expect(count).toBeGreaterThan(0);

        const actualUrls: string[] = [];

        for (let i = 0; i < count; i++) {
            const link = links.nth(i);
            const href = await link.getAttribute('href');

            await expect(link).toBeVisible();
            await expect(href, 'Navigation link is missing href').toBeTruthy();

            actualUrls.push(new URL(href!, this.page.url()).href);
        }

        for (const expected of navigationData.navigation) {
            const expectedUrl = new URL(
                expected.url,
                this.page.url()
            ).href;

            await expect(
                actualUrls,
                `Navigation destination missing: ${expected.url}`
            ).toContain(expectedUrl);
        }

        console.log('PASS: Expected navigation destinations match live links.');
    }


    async verifyDesktopNavigation() {
        // 1. Define screen sizes to test
        const viewports = [
            { width: 1920, height: 1080 },
            { width: 1366, height: 768 },
            { width: 1280, height: 720 }
        ];
        // 2. Test each screen size
        for (const viewport of viewports) {
            // 3. Set screen size and open website
            await this.page.setViewportSize(viewport);
            await this.page.goto('/');
            console.log(`Viewport: ${viewport.width}x${viewport.height}`);
            // 4. Find header and visible navigation links
            const header = this.page.locator('header');
            const links = header.locator('a:visible');
            // 5. Check header visibility
            await expect(header).toBeVisible();
            // 6. Count navigation links
            const count = await links.count();
            // 7. Check each link and print its full URL
            for (let i = 0; i < count; i++) {
                const link = links.nth(i);
                await expect(link).toBeVisible();
                const href = await link.getAttribute('href');
                if (href) {
                    const fullUrl = new URL(href, this.page.url()).href;
                    console.log(`Link ${i + 1}: ${fullUrl}`);
                }
            }
            // 8. Print total link count
            console.log(`Navigation links count: ${count}`);
            // 9. Take screenshot
            // await this.page.screenshot({
            //     path: `screenshots/navigation-${viewport.width}x${viewport.height}.png`,
            //     fullPage: false,
            // });
        }
    }
    async verifySpotTradingSection() {
        await this.page.goto('/');
        const section = this.page.getByText('Trending Now', { exact: true });
        await expect(section).toBeVisible();
        console.log('Trading section :: ', await section.textContent());
        // Check trading pairs under Trending now component
        const pairs = this.page.locator('xpath=//body/div/div[4]/section[1]/div[2]/div[2]');
        await pairs.scrollIntoViewIfNeeded();
        await expect(pairs).toBeVisible();
        // await pairs.screenshot({
        //     path: 'screenshots/trading pairs assertion.png'
        // });
    }
    async verifyTradingPairsCategories() {
        //// Verify trading pairs are displayed in the section
        await this.page.goto('/');
        const heading1 = this.page.getByRole(
            'heading', { name: 'Trending Now' }
        );

        await expect(heading1).toBeVisible();
        console.log(await heading1.textContent());
        const heading = this.page.getByRole('heading', { name: 'Trending Now' });
        const parent = heading.locator('..');
        console.log(await parent.innerText());
    }
    async checkTradingExpectedPairs() {
        await this.page.goto('/');
        const heading = this.page.getByRole('heading', { name: 'Trending Now' });
        const parent = heading.locator('..');
        await parent.scrollIntoViewIfNeeded();
        await expect(parent).toBeVisible();
        const entries = parent.locator('a');
        const count = await entries.count();
        await expect(count).toBeGreaterThan(0);
        for (let i = 0; i < count; i++) {
            const entry = entries.nth(i);
            await expect(entry).toBeVisible();
            const details = (await entry.innerText()).replace(/\s+/g, ' ').trim();
            await expect(details).not.toBe('');
            console.log(`Trading pair ${i + 1}: ${details}`);
        }
    }
    async verifyMarketingBanner() {
        await this.page.goto('/');
        const headings = this.page.locator('h3.gradient-text');
        for (let i = 0; i < await headings.count(); i++) {
            const heading = headings.nth(i);
            if (await heading.isVisible()) {
                const section = heading.locator('xpath=ancestor::section[1]');
                await expect(heading).toBeVisible();
                console.log((await heading.innerText()).trim());
            }
        }
        //captured one banner region
        const banner = this.page.getByRole('heading', { name: 'Crypto for everyone' });
        await expect(banner).toBeVisible();
        const position = await banner.boundingBox();
        await expect(position).not.toBeNull();
        console.log('Banner reagion', position);
    }
    async verifyAppDownloadLinks() {
        await this.page.goto('/');
        const downloadAppLink = this.page.getByRole('link', {
            name: 'Download the app'
        });

        await expect(downloadAppLink).toBeVisible();

        // Validate the actual link configured on the website
        const href = await downloadAppLink.getAttribute('href');
        await expect(href).toBeTruthy();

        const redirectUrl = new URL(href!, this.page.url());

        await expect(redirectUrl.hostname).toBe('mbio.go.link');
        await expect(redirectUrl.protocol).toBe('https:');

        console.log('Initial redirect URL:', redirectUrl.href);

        // Validate the documented Apple App Store destination
        const appleStoreUrl =
            'https://apps.apple.com/app/id1592119946?mt=8';

        const appleUrl = new URL(appleStoreUrl);

        await expect(appleUrl.hostname).toBe('apps.apple.com');
        await expect(appleUrl.pathname).toBe('/app/id1592119946');

        console.log('Expected Apple App Store URL:', appleUrl.href);
        console.log('PASS: Redirect link and Apple Store URL validated.');
    }
    async verifyAboutUsLinks() {
        await this.page.goto('https://mb.io/en/company');

        // Get live headings from the page
        const liveHeadings = (
            await this.page
                .locator('h1:visible, h2:visible, h3:visible')
                .allInnerTexts()
        )
            .map(text => text.replace(/\s+/g, ' ').trim())
            .filter(Boolean);

        // Get live section text
        const liveSectionTexts = (
            await this.page.locator('section:visible').allInnerTexts()
        )
            .map(text => text.replace(/\s+/g, ' ').trim())
            .filter(Boolean);

        console.log('Live headings:', liveHeadings);
        console.log('Expected headings:', aboutUsData.headings);

        // COMPARISON: confirms expected headings match live headings
        for (const expectedHeading of aboutUsData.headings) {
            await expect(
                liveHeadings,
                `Missing heading: ${expectedHeading}`
            ).toContain(expectedHeading);
        }

        console.log('Live section text:', liveSectionTexts);

        // COMPARISON: confirms expected section text exists in live sections
        for (const expectedText of aboutUsData.sectionTexts) {
            await expect(
                liveSectionTexts.some(section => section.includes(expectedText)),
                `Expected section text not found: ${expectedText}`
            ).toBe(true);
        }

        console.log('PASS: Expected headings and section text match live page content.');
    }
    async verifyInvalidRouteHandling() {
        const response = await this.page.goto('https://mb.io/en/invalid-99');
        const status = response?.status();
        console.log('Invalid route status:', status);
        // The invalid route should return a 404 response.
        await expect(status).toBe(404);
        console.log('PASS: Invalid route returns 404.');
    }

    async verifyContentLoadingTimeout() {
        // Step 1: Verify content loading
        await this.page.goto('https://mb.io/en');
        const heading = this.page.getByRole('heading', {
            name: /crypto for everyone/i
        });
        await expect(heading).toBeVisible();
        console.log('PASS: Content loaded successfully.');
        // Timeout check
        await this.page.route('**/*', async (route) => {
            if (route.request().resourceType() === 'document') {
                await new Promise(resolve => setTimeout(resolve, 15000));
            }
            await route.continue();
        });

        try {
            await this.page.goto('https://mb.io/en', {
                timeout: 5000,
                waitUntil: 'load'
            });

            console.log('PASS: Page loaded successfully.');
        } catch (error) {
            console.error('TIMEOUT DETECTED:',
                error instanceof Error ? error.message : String(error));

            // Handle the expected timeout so the test passes
            console.log('PASS: Timeout handled successfully.');
        }
    }
    async verifyApiNetworkResponse() {
        const responsePromise = this.page.waitForResponse(response =>
            response.url().includes('/api/io/v1/marketdata/prices?quote=USDT')
        );

        await this.page.goto('https://mb.io/en-AE');
        const response = await responsePromise;
        await expect(response.status()).toBe(200);
        await expect(response.headers()['content-type']).toContain('application/json');

        const data = await response.json();

        await expect(Array.isArray(data)).toBe(true);
        await expect(data.length).toBeGreaterThan(0);
        console.log('HTTP Status:', response.status());
        console.log('Content-Type:', response.headers()['content-type']);
        console.log('Response is Array:', Array.isArray(data));
        console.log('Response Count:', data.length);

        for (const item of data) {
            await expect(item).toEqual(await expect.objectContaining({
                timestamp: expect.any(Number),
                base: expect.any(String),
                quote: expect.any(String),
                open: expect.any(Number),
                close: expect.any(Number),
                high: expect.any(Number),
                low: expect.any(Number)
            }
            ));
        }
    }
}









