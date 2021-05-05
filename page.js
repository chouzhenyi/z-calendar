const puppeteer = require('puppeteer');
puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('http://192.168.0.104:8080/');
  await page.screenshot({path: 'screenshot.png'});
  await browser.close();
});