import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {parseHTML} from 'linkedom';
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const route='/blog/attack-path-disconfirming-evidence/';
const host=(process.env.SITE_URL||'https://marketing-demo-topaz.vercel.app').replace(/\/$/u,'');
const base=process.env.TEST_URL||'http://localhost:4322';
const title='What would rule out this cloud attack path?';
const description='Review a synthetic cloud attack path by separating supporting evidence, blocking conditions and unanswered questions before proposing a change.';
const alt='Synthetic path from an external source through a workload and principal to a specified target. The first two relationships are marked Not verified. Only the target-read relationship is interrupted and marked Blocked under checked conditions.';
const caption='Synthetic example · One request under review';
const disclaimer='These are editorial descriptions of evidence, not Tracegate interface states.';
const normalize=s=>s.replace(/\s+/gu,' ').trim();
const approved=fs.readFileSync('scripts/fixtures/attack-path-disconfirming-evidence.md','utf8');
const {document}=parseHTML(fs.readFileSync(`dist${route}index.html`,'utf8'));
const prose=document.querySelector('.structured-article');

// Compare the complete bounded approved article, independently of the JSON
// representation. Markdown syntax alone is removed; all visible wording stays.
const expected=approved.replace(/^# .*\n/u,'')
  .replace(/^## /gmu,'').replace(/\[([^\]]+)\]\([^)]+\)/gu,'$1')
  .replace(/`([^`]+)`/gu,'$1').replace(/^\|---.*\n/gmu,'')
  .replaceAll('|',' ');
const proseText=[...prose.querySelectorAll('p,h2,th,td')].map(el=>el.textContent).join(' ');
assert.equal(normalize(proseText),normalize(expected),'Exact approved article boundaries and wording');
assert.equal(document.querySelector('h1').textContent,title);
assert.equal(prose.querySelectorAll('h2').length,5);
assert.equal(document.querySelector('title').textContent,`${title} · Tracegate`);
assert.equal(document.querySelector('meta[name="description"]').content,description);
assert.equal(document.querySelector('link[rel="canonical"]').href,host+route);
assert.equal(prose.querySelector('code').textContent,'review-app');
assert.match(prose.querySelector('q').textContent,/The specified target read is blocked/);
const table=prose.querySelector('table');
assert.equal(table.querySelectorAll('thead th[scope="col"]').length,3);
assert.equal(table.querySelectorAll('tbody th[scope="row"]').length,3);
assert.equal(table.querySelectorAll('tbody td').length,6);
assert.equal(table.parentElement.nextElementSibling.textContent,disclaimer);
assert.ok(prose.textContent.indexOf('Tracegate is a fictional')<prose.textContent.indexOf('review-app'));
const expectedLinks=[...approved.matchAll(/\[([^\]]+)\]\(([^)]+)\)/gu)].map(m=>[m[1],m[2]]);
assert.deepEqual([...prose.querySelectorAll('a')].map(a=>[a.textContent,a.href]),expectedLinks);
for(const a of document.querySelectorAll('.toc a'))assert.equal(document.querySelector(a.getAttribute('href')).querySelector('h2').textContent,a.textContent);
assert.equal(document.querySelectorAll('time').length,0,'No invented release date');
const posting=JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)['@graph'].find(node=>node['@type']==='BlogPosting');
assert.equal(posting.creativeWorkStatus,'Draft');
assert.ok(!('datePublished' in posting)&&!('dateModified' in posting));
assert.equal(posting.author.name,'Tracegate Editorial');
assert.match(document.querySelector('.article-note').textContent,/Fictional editorial identity/);
const heroText=[...document.querySelectorAll('.article-hero > .eyebrow,.article-hero h1,.article-hero > p,.article-meta a,.article-meta span')].map(el=>el.textContent).filter(text=>!text.includes('min read (estimate)')).join(' ');
const visibleText=[heroText,caption,disclaimer,proseText].join(' ');
const words=normalize(visibleText).split(/\s+/u).length;
assert.match(document.querySelector('.article-meta').textContent,new RegExp(`${Math.ceil(words/200)} min read \\(estimate\\)`));
for(const [property,value] of Object.entries({'og:image':host+'/illustrations/tracegate-attack-path-hero-desktop-v1.0.png','og:image:width':'1600','og:image:height':'1000','og:image:type':'image/png','og:image:alt':alt}))assert.equal(document.querySelector(`meta[property="${property}"]`).content,value);
assert.ok(fs.readFileSync('dist/sitemap-0.xml','utf8').includes(host+route));
for(const index of ['blog','resources']){
  const {document:indexDocument}=parseHTML(fs.readFileSync(`dist/${index}/index.html`,'utf8'));
  const card=indexDocument.querySelector(`.resource-card a[href="${route}"]`);
  assert.ok(card,`${index} discoverability`);
  assert.equal(card.querySelector('h3').textContent,title);
  assert.equal(card.querySelectorAll('img').length,0,'Existing decorative card art stays separate');
}
// Locked Creative v1.0 hashes are set from the authenticated ZIP manifest.
const lockedHashes=JSON.parse(fs.readFileSync('scripts/fixtures/attack-path-asset-hashes.json','utf8'));
for(const filename of Object.keys(lockedHashes)){
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(`public/illustrations/${filename}`)).digest('hex'),lockedHashes[filename]);
}

fs.mkdirSync('artifacts/article',{recursive:true});
const browser=await chromium.launch();
const results=[];
try {
  const context=await browser.newContext({reducedMotion:'reduce'});
  const page=await context.newPage();
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  for(const theme of ['light','dark'])for(const [width,height] of [[320,844],[360,844],[390,844],[768,1024],[1024,768],[1440,1000],[844,390]]){
    await page.setViewportSize({width,height});await page.emulateMedia({colorScheme:theme});
    await page.goto(base+route);await page.waitForLoadState('networkidle');
    const image=page.locator('.article-responsive-figure img:visible');
    const available=await page.locator('.article-figure-container').evaluate(el=>el.getBoundingClientRect().width);
    if(width===1440)assert.equal(available,880,'Article figure cap survives shared wrap cascade');
    const variant=available>=800?'desktop':'mobile';
    assert.equal(await image.count(),1);
    assert.equal(await page.getByRole('img',{name:alt,exact:true}).count(),1,'One image in accessibility tree');
    assert.match(await image.getAttribute('src'),new RegExp(`${variant}-v1.0.svg$`));
    const geometry=await image.evaluate(img=>({width:img.width,height:img.height,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,ratio:img.getBoundingClientRect().width/img.getBoundingClientRect().height,background:getComputedStyle(img).backgroundColor}));
    assert.ok(geometry.naturalWidth>0,'Artwork loads');
    assert.ok(Math.abs(geometry.ratio-(variant==='desktop'?1.6:720/1340))<.001,'No distortion');
    assert.equal(geometry.background,'rgb(255, 255, 255)');
    if(variant==='mobile')assert.ok(geometry.width<=360);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${width} ${theme} page overflow`);
    const region=page.getByRole('region',{name:'Evidence comparison for the synthetic path'});
    await region.scrollIntoViewIfNeeded();await region.focus();
    const scrolling=await region.evaluate(el=>el.scrollWidth>el.clientWidth);
    if(scrolling){await page.keyboard.press('ArrowRight');await page.waitForTimeout(180);assert.ok(await region.evaluate(el=>el.scrollLeft)>0,'Keyboard table scroll');}
    assert.notEqual(await region.evaluate(el=>getComputedStyle(el).outlineStyle),'none','Visible region focus');
    const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
    assert.deepEqual(audit.violations.map(v=>v.id),[],`${width} ${theme} axe`);
    results.push({width,height,theme,available,variant,geometry,scrolling,axeViolations:0});
    // Representative captures: stable reduced motion, document top, loaded fonts.
    if((width===1440||width===360||width===320)&&height!==390){
      await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`artifacts/article/${theme}-${width}-page.png`,fullPage:true});
      await page.locator('.article-responsive-figure').screenshot({path:`artifacts/article/${theme}-${width}-figure.png`});
    }
  }
  await page.setViewportSize({width:1440,height:1000});await page.goto(base+route);
  for(const width of [360,799,800,801]){
    await page.locator('.article-figure-container').evaluate((el,width)=>el.style.width=`${width}px`,width);
    assert.equal(await page.locator('.article-figure-container').evaluate(el=>el.getBoundingClientRect().width),width);
    assert.match(await page.locator('.article-responsive-figure img:visible').getAttribute('src'),new RegExp(`${width>=800?'desktop':'mobile'}-v1.0.svg$`));
  }
  await page.goto(base+route);
  const ax=await context.newCDPSession(page);
  const tree=await ax.send('Accessibility.getFullAXTree');
  const accessible=tree.nodes.filter(node=>!node.ignored);
  assert.equal(accessible.filter(node=>node.role?.value==='image'&&node.name?.value===alt).length,1);
  assert.equal(accessible.filter(node=>node.role?.value==='columnheader').length,3);
  assert.equal(accessible.filter(node=>node.role?.value==='rowheader').length,3);
  await ax.detach();
  // Keep the approved absolute destination, but serve its page from the tested
  // checkout so this regression does not depend on an unrelated live deployment.
  await page.route('https://marketing-demo-topaz.vercel.app/platform/',async intercepted=>{
    const response=await page.request.get(base+'/platform/');
    await intercepted.fulfill({response});
  });
  await page.locator('.prose a').last().click();await page.waitForURL('https://marketing-demo-topaz.vercel.app/platform/#explorer');
  assert.ok(await page.locator('#explorer').count(),'Real explorer destination');
  await page.goto(base+route);
  // A 1440px display at 200% browser zoom has a 720px CSS layout viewport.
  // CSS zoom on body leaves media queries at 1440px and is not equivalent.
  await page.setViewportSize({width:720,height:500});
  for(const theme of ['light','dark']){
    await page.emulateMedia({colorScheme:theme});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'200% equivalent CSS viewport overflow');
    assert.equal(await page.locator('.article-responsive-figure img:visible').count(),1);
    await page.screenshot({path:`artifacts/article/${theme}-200-percent.png`,fullPage:true});
  }
  await page.setViewportSize({width:360,height:844});
  await page.addStyleTag({content:'.structured-article p,.structured-article th,.structured-article td,.article-responsive-figure figcaption,.article-figure-disclaimer{font-size:200%}'});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'200% article text reflow overflow');
  await context.close();
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:360,height:844},reducedMotion:'reduce'});
  const fallback=await nojs.newPage();await fallback.goto(base+route);
  assert.equal(await fallback.getByRole('img',{name:alt,exact:true}).count(),1);
  assert.equal(await fallback.locator('table tbody tr').count(),3);
  assert.equal(await fallback.locator('figcaption').innerText(),caption);
  await nojs.close();
  const failed=await browser.newContext({viewport:{width:360,height:844}});
  await failed.route('**/illustrations/tracegate-attack-path-hero-*.svg',r=>r.abort());
  const failure=await failed.newPage();await failure.goto(base+route);
  assert.equal(await failure.getByRole('img',{name:alt,exact:true}).count(),1,'Failure keeps informative alt');
  assert.equal(await failure.locator('figcaption').innerText(),caption);
  assert.equal(await failure.locator('.article-figure-disclaimer').innerText(),disclaimer);
  assert.equal(await failure.locator('.article-responsive-figure img:visible').evaluate(img=>img.getBoundingClientRect().height>400),true,'Intrinsic space reserved on failure');
  await failure.locator('.article-responsive-figure').screenshot({path:'artifacts/article/image-failure.png'});
  await failed.close();
  assert.deepEqual(errors,[]);
  fs.writeFileSync('artifacts/article/verification.json',JSON.stringify({words,estimatedMinutes:Math.ceil(words/200),exactCopy:true,metadata:true,draftSchema:true,assetHashes:true,containerWidths:[360,799,800,801],accessibilityTree:'one informative image; three column and three row headers',textReflow:'200% article/table/live-figure text at 360px',noJavaScript:true,imageFailure:true,zoom:'720px CSS viewport representing 1440px at 200%; native browser zoom and assistive technology remain manual checks',results},null,2));
  console.log(`Article passed: exact approved copy, semantic table/links, locked art, draft metadata, ${words} words / ${Math.ceil(words/200)} minute estimate, 14 viewport/theme cases, 799/800/801px thresholds, keyboard table scroll, no-JS and image failure.`);
} finally {await browser.close();}
