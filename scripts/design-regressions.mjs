import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base=process.env.TEST_URL||'http://localhost:4322';
const browser=await chromium.launch();
const context=await browser.newContext({reducedMotion:'reduce',colorScheme:'light'});
const page=await context.newPage();
const evidence=[];
try {
 for(const width of [320,390,1440]){
  await page.setViewportSize({width,height:900});await page.goto(base+'/');
  const measurements=await page.locator('.hp-node-kind,.hp-node strong,.hp-topology-label,.hp-evidence p').evaluateAll(nodes=>nodes.map(node=>({text:node.textContent.trim(),size:parseFloat(getComputedStyle(node).fontSize)})));
  assert.ok(measurements.every(m=>m.size>=12),`Preview legibility at ${width}px`);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Overflow at ${width}px`);
  const targets=await page.locator('.theme-toggle,.hp-playback').evaluateAll(nodes=>nodes.map(node=>({width:node.getBoundingClientRect().width,height:node.getBoundingClientRect().height})));
  assert.ok(targets.every(r=>r.width>=44&&r.height>=44),`Touch targets at ${width}px`);
  evidence.push({width,measurements,targets});
 }
 await page.goto(base+'/platform/');
 await page.getByRole('button',{name:'Guided tour',exact:true}).click();
 await page.getByRole('button',{name:'Close guided tour',exact:true}).focus();await page.keyboard.press('Enter');
 assert.equal(await page.getByRole('button',{name:'Guided tour',exact:true}).evaluate(el=>el===document.activeElement),true,'Close returns focus');
 await page.getByRole('button',{name:'Guided tour',exact:true}).click();
 for(let i=0;i<3;i++)await page.getByRole('button',{name:'Next step',exact:true}).click();
 await page.getByRole('button',{name:'Finish tour',exact:true}).focus();await page.keyboard.press('Enter');
 assert.equal(await page.getByRole('button',{name:'Guided tour',exact:true}).evaluate(el=>el===document.activeElement),true,'Finish returns focus');
 for(const theme of ['light','dark']){
  await page.emulateMedia({colorScheme:theme});await page.goto(base+'/blog/machine-identity-security/');
  await page.locator('.editorial-inline-cta .button').hover();
  const audit=await new AxeBuilder({page}).withRules(['color-contrast']).analyze();
  assert.equal(audit.violations.length,0,`${theme} editorial hover contrast`);
 }
 await page.goto(base+'/contact/');
 await page.locator('#first-name').fill('<img src=x onerror=alert(1)>');await page.locator('#last-name').fill('Reviewer');
 await page.locator('#email').fill('reviewer@example.com');await page.locator('#company').fill('Example');await page.locator('#team').selectOption({label:'Portfolio reviewer'});
 await page.locator('#message').fill('Inspect identity ownership.');
 const requests=[];const capture=request=>requests.push(request.url());page.on('request',capture);
 await page.getByRole('button',{name:'Preview my request'}).click();page.off('request',capture);
 assert.equal(requests.length,0,'Preview sends no requests');
 assert.match(await page.locator('[data-form-status]').innerText(),/<img src=x onerror=alert\(1\)>/);
 assert.equal(await page.locator('[data-form-status] img').count(),0,'Entered markup remains text');
 assert.equal(await page.locator('#company').inputValue(),'Example','Preview preserves editable input');
 await page.locator('#company').fill('Updated example');await page.getByRole('button',{name:'Preview my request'}).click();
 assert.match(await page.locator('[data-form-status]').innerText(),/Updated example/);
 for(const [route,heading] of [['identity-security','Identity access review'],['cloud-posture','Configuration review queue']]){
  await page.goto(base+'/products/'+route+'/');
  const review=page.locator('.product-evidence:not(.compact)');assert.match(await review.innerText(),new RegExp(heading));
  await review.locator('summary').nth(1).focus();await page.keyboard.press('Enter');assert.equal(await review.locator('details').nth(1).getAttribute('open'),'');
 }
 fs.writeFileSync('artifacts/design-regressions.json',JSON.stringify({status:'pass',evidence,tourFocus:'pass',hoverContrast:'pass',localPreview:'pass',capabilityReviews:'pass'},null,2));
 console.log('Design regressions passed: readable previews, 44px targets, tour focus, light/dark hover contrast, safe editable local preview, and capability review keyboard controls.');
} finally {await browser.close();}
