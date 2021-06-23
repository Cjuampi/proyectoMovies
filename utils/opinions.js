const puppeteer = require("puppeteer");

let scrapping = {


scrap: async (filmTitle) => {
  /* console.log(filmTitle) */

  const browser = await puppeteer.launch({
    headless: true, 
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto( `https://www.sensacine.com/buscar/?q=${filmTitle}`);
  await page.click('button[id="didomi-notice-agree-button"]');

  await page.click(
    "#content-layout > div.section-wrap.gd-2-cols.gd-gap-30.row-col-sticky > div > section.section.movies-results > ul > li:nth-child(1) > div > div.meta > h2  "
  );

  await page.waitForSelector(".content-txt.review-card-content");

  const data = await page.evaluate(() => {
    let opiniones = document.querySelectorAll(
      ".content-txt.review-card-content"
    );

    let arrayVacio = [];
    for (let index = 0; index < opiniones.length; index++) {
      
      arrayVacio.push(opiniones[index].innerText);

    
    }

    
    return {
      arrayVacio,
    };
  });

  await browser.close();
  return data;
}





}





/* scrap().then((data) => console.log(data)); */

/* scrap().then(data =>console.log(data)) */

module.exports = scrapping; 