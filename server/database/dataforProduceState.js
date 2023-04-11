import puppeteer from 'puppeteer';
import fs from 'fs/promises';

const response = await fs.readFile('server/database/storage.json');
const data = JSON.parse(response);
const produce = data.produce;
const states = {
  'Albama': true,
  'Alaska': true,
  'Arizona': true,
  'Arkansas': true,
  'California': true,
  'Colorado': true,
  'Connecticut': true,
  'Delaware': true,
  'Florida': true,
  'Georgia': true,
  'Hawaii': true,
  'Idaho': true,
  'Illinois': true,
  'Indiana': true,
  'Iowa': true,
  'Kansas': true,
  'Kentucky': true,
  'Louisiana': true,
  'Maine': true,
  'Maryland': true,
  'Massachusetts': true,
  'Michigan': true,
  'Minnesota': true,
  'Mississippi': true,
  'Missouri': true,
  'Montana': true,
  'Nebraska': true,
  'Nevada': true,
  'New Hampshire': true,
  'New Jersey': true,
  'New Mexico': true,
  'New York': true,
  'North Carolina': true,
  'North Dakota': true,
  'Ohio': true,
  'Oklahoma': true,
  'Oregon': true,
  'Pennsylvania': true,
  'Rhode Island': true,
  'South Carolina': true,
  'South Dakota': true,
  'Tennessee': true,
  'Texas': true,
  'Utah': true,
  'Vermont': true,
  'Virginia': true,
  'Washington': true,
  'West Virginia': true,
  'Wisconsin': true,
  'Wyoming': true
};

const produceStates = {};
for(const item of produce){
  const statesforItem = [];
  const getProduceState = async () => {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });
  
    const page = await browser.newPage();
  
    await page.goto('https://www.google.com/?hl=en', {
      waitUntil: 'domcontentloaded',
      'ignoreHTTPSErrors': true
    });
    const searchString = `${item} growing region in US`;
    await page.type('input', searchString, { delay: 100 });
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
    const words = await page.evaluate(() => {
      const result = document.querySelector('.hgKElc').innerText;
      return result.replaceAll(/[\.,?!]/g, '').split(' ');
    });
    for(const word of words){
      if(states[word]) statesforItem.push(word);
    }
    await browser.close();
  }; 
  await getProduceState();
  produceStates[item] = Array.from(new Set(statesforItem)); 
}

console.log(produceStates);
data.produceStates = produceStates;

await fs.writeFile('server/database/storage.json', JSON.stringify(data));