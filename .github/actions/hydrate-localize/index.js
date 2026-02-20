import { PlaywrightCrawler, Sitemap } from 'crawlee';

const targetHost = process.argv[2];
const sitemapPath = process.argv[3] || 'sitemap.xml';

const crawler = new PlaywrightCrawler({
    async requestHandler({ request, page, enqueueLinks }) {
        const requestHost = 'https://global.localizecdn.com';
        const requestMethod = 'POST';
        if (request.loadedUrl.indexOf('api-catalog') >= 0) {
            // Localize is currently disabled on API catalog pages, so we
            // can't wait for a request on those pages
            console.log(`Not waiting for Localize on ${request.loadedUrl}`);
        } else {
            await page.waitForRequest(
                req => new URL(req.url()).origin === requestHost && req.method() === requestMethod
            );
            console.log(`Done waiting for ${requestMethod} request to ${requestHost} on ${request.loadedUrl}`);
        }
    }
});

const { urls } = await Sitemap.load(`${targetHost}/${sitemapPath}`);

await crawler.addRequests(urls.map((url) => {
    const { pathname, search, hash } = new URL(url);
    return `${targetHost}${pathname}${search}${hash}`;
}));

// Run the crawler
await crawler.run();
