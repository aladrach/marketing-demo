import lighthouse from 'lighthouse';
import {launch} from 'chrome-launcher';
import {chromium} from 'playwright';
import fs from 'node:fs';
const browser=await launch({chromePath:chromium.executablePath(),chromeFlags:['--headless','--no-sandbox','--disable-dev-shm-usage'],logLevel:'silent'});
const output=[];
try{for(const route of ['/','/platform/','/blog/attack-path-analysis/','/resources/platform-data-sheet/']){const result=await lighthouse('http://localhost:4322'+route,{port:browser.port,logLevel:'error',output:'html',onlyCategories:['performance','accessibility','best-practices','seo']});const slug=route==='/'?'home':route.split('/').filter(Boolean).join('-');fs.writeFileSync(`artifacts/lighthouse-${slug}.html`,result.report);const lhr=result.lhr;output.push({route,mode:'mobile lab',scores:Object.fromEntries(Object.entries(lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),metrics:Object.fromEntries(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index'].map(k=>[k,lhr.audits[k].displayValue])),failedAudits:Object.entries(lhr.audits).filter(([,v])=>v.score!==null&&v.score<.9).map(([k,v])=>({id:k,title:v.title,score:v.score}))});}fs.writeFileSync('artifacts/lighthouse-summary.json',JSON.stringify(output,null,2));console.log(JSON.stringify(output,null,2));}finally{browser.kill();}
