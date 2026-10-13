import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const posts=JSON.parse(fs.readFileSync('src/data/articles.json')).filter(p=>p.date==='2026-10-13');
const browser=await chromium.launch();
const context=await browser.newContext();
const page=await context.newPage();
const errors=[];const checks=[];
page.on('pageerror',e=>errors.push(String(e)));
page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
for(const width of [1440,390]){
 await page.setViewportSize({width,height:1000});
 for(const post of posts){
  await page.goto(`http://localhost:4322/blog/${post.slug}/`);
  assert.equal(await page.locator('main h1').innerText(),post.title);
  assert.equal(await page.locator('time').innerText(),'October 13, 2026');
  assert.equal(await page.locator('.article-illustration img').evaluate(i=>i.complete&&i.naturalWidth>0),true);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  assert.deepEqual(audit.violations.map(v=>v.id),[]);
  await page.screenshot({path:`artifacts/${post.slug}-${width}.png`,fullPage:true});
  checks.push({slug:post.slug,width,accessibilityViolations:0});
 }
}
await page.goto('http://localhost:4322/blog/');
assert.equal(await page.locator('.resource-card').count(),6);
await page.getByRole('searchbox').fill('Short-lived');
assert.equal(await page.locator('.resource-card:visible').count(),1);
await page.locator('.resource-card:visible a').click();
assert.ok(page.url().includes('/deployment-trust-review/'));
await browser.close();
assert.deepEqual(errors,[]);
fs.writeFileSync('artifacts/new-posts-verification.json',JSON.stringify({checks,errors},null,2));
console.log(JSON.stringify({checks,errors}));
