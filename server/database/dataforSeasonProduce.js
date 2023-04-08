import puppeteer from 'puppeteer';
import fs from 'fs/promises';

const getProduce = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto('https://snaped.fns.usda.gov/seasonal-produce-guide', {
    waitUntil: 'domcontentloaded',
    'ignoreHTTPSErrors': true
  });

  const seasonProduce = await page.evaluate(() => {
    const content = document.getElementsByClassName('seasonal-produce--landing js-view-dom-id-fd2b85e0f519d92c25e6945cc5c1e51bfff3dfe1c102cac14a88530d7367b57a')[0];
    const seasonsInfo = content.querySelectorAll('div');
    const result = {};
    Array.from(seasonsInfo).forEach((season) => {
      const seasonName = season.querySelector('h2').querySelector('a').innerText;
      const produce = Array.from(season.querySelectorAll('li')).map(item => {
        return item.querySelector('a').innerText;
      })
      result[seasonName] = produce;
    });
    return result;
  });
  await browser.close();
  return seasonProduce;
};

const result = await getSeasonProduce();
console.log(result);

const seasons = Object.keys(result);
let produce = [];
for(const items of Object.values(result)) {
  produce = produce.concat(items);
}
const uniqueProduce = Array.from(new Set(produce));
const data = {
  season: seasons,
  produce: uniqueProduce,
  seasonProduce: result
};


await fs.writeFile('server/database/storage.json', JSON.stringify(data));