import lighthouse from 'lighthouse';
import {launch} from 'chrome-launcher';
import {chromium} from 'playwright';
import fs from 'node:fs';
const label=process.env.CSS_VARIANT||'inline';
const browser=await launch({chromePath:chromium.executablePath(),chromeFlags:['--headless','--no-sandbox','--disable-dev-shm-usage'],logLevel:'silent'});
const output=[];
try{for(let run=1;run<=3;run++){const {lhr}=await lighthouse('http://localhost:4322/',{port:browser.port,logLevel:'error',onlyCategories:['performance']});fs.writeFileSync(`artifacts/css-${label}-lighthouse-${run}.json`,JSON.stringify(lhr));output.push({run,performance:lhr.categories.performance.score*100,fcp:lhr.audits['first-contentful-paint'].numericValue,lcp:lhr.audits['largest-contentful-paint'].numericValue,tbt:lhr.audits['total-blocking-time'].numericValue,cls:lhr.audits['cumulative-layout-shift'].numericValue,blocking:lhr.audits['render-blocking-insight']?.metricSavings,unusedCSS:lhr.audits['unused-css-rules']?.details?.overallSavingsBytes,cssRequests:lhr.audits['network-requests'].details.items.filter(i=>i.resourceType==='Stylesheet').length});console.log(JSON.stringify(output.at(-1)));}fs.writeFileSync(`artifacts/css-${label}-performance.json`,JSON.stringify(output,null,2));}finally{browser.kill();}
