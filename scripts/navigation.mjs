import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base=process.env.TEST_URL||'http://localhost:4322';
const browser=await chromium.launch(),page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
try{
 await page.goto(base+'/');await page.locator('.nav-menu summary').first().click();
 const link=page.locator('.nav-menu').first().locator('a[href="/products/attack-paths/"]');const box=await link.boundingBox();
 await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();
 // Reproduce a browser transferring pointer focus to the document rather than the link.
 await page.evaluate(()=>document.activeElement?.blur());await page.waitForTimeout(100);await page.mouse.up();await page.waitForTimeout(300);
 const navigated=new URL(page.url()).pathname==='/products/attack-paths/';
 if(process.env.EXPECT_NAV_FAILURE==='1'){assert.equal(navigated,false);console.log('Reproduced: blur with a null destination closes the menu before link activation.');}
 else{
  assert.equal(navigated,true,'pointer link navigation must survive a null focus destination');
  const menus=JSON.parse(fs.readFileSync('src/data/site.json')).navigation;let checked=0;
  for(let i=0;i<menus.length;i++){
   await page.goto(base+'/');const menu=page.locator('.nav-menu').nth(i);await menu.locator('summary').click();const hrefs=[...new Set(await menu.locator('a').evaluateAll(links=>links.map(a=>a.getAttribute('href'))))];
   for(const href of hrefs){await page.goto(base+'/');const current=page.locator('.nav-menu').nth(i);await current.locator('summary').click();await current.locator(`a[href="${href}"]`).first().click();await page.waitForURL(base+href);assert.equal(new URL(page.url()).pathname,href);checked++;}
  }
  await page.goto(base+'/');await page.locator('.nav-menu summary').first().click();await page.keyboard.press('Escape');assert.equal(await page.locator('.nav-menu[open]').count(),0);assert.equal(await page.locator('.nav-menu summary').first().evaluate(el=>el===document.activeElement),true);
  await page.locator('.nav-menu summary').first().click();await page.locator('main a').first().focus();assert.equal(await page.locator('.nav-menu[open]').count(),0,'keyboard focus leaving header must close dropdown');
  const response=await page.goto(base+'/missing-page-for-verification/');assert.equal(response.status(),404);assert.match(await page.locator('meta[name="robots"]').getAttribute('content'),/noindex/);
  fs.writeFileSync('artifacts/navigation-verification.json',JSON.stringify({pointerBlurRegression:'pass',submenuLinks:checked,escapeFocus:'pass',keyboardClose:'pass',custom404:'pass'},null,2));console.log(`Navigation passed: ${checked} submenu destinations, pointer blur, keyboard close, Escape focus, and 404.`);
 }
}finally{await browser.close();}
