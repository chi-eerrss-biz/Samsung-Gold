const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const URL = 'https://www.samsunggold.co.kr/';

function kstParts(date = new Date()) {
  const p = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul', year:'numeric', month:'2-digit', day:'2-digit',
    hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false
  }).formatToParts(date);
  const g = t => p.find(x => x.type === t)?.value;
  return { date:`${g('year')}-${g('month')}-${g('day')}`, time:`${g('hour')}:${g('minute')}:${g('second')}` };
}

(async () => {
  const { date, time } = kstParts();
  const outDir = path.join(process.cwd(), 'screenshots', date.slice(0, 7));
  fs.mkdirSync(outDir, { recursive: true });
  const output = path.join(outDir, `${date}-0900.webp`);
  if (fs.existsSync(output)) {
  console.log(`Already captured: ${output}`);
  process.exit(0);
}

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    deviceScaleFactor: 1,
    locale: 'ko-KR',
    timezoneId: 'Asia/Seoul',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  try {
    console.log(`[${date} ${time} KST] Opening ${URL}`);
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(7000);
    await page.screenshot({ path: output, type: 'webp', quality: 90, fullPage: false });
    console.log(`Saved: ${output}`);
  } finally {
    await browser.close();
  }
})();
