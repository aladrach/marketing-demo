import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base=process.env.TEST_URL||'http://localhost:4322';
const routes=['/',...JSON.parse(fs.readFileSync('src/data/pages.json')).map(p=>'/'+p.slug+'/')];
const mobile=['/','/platform/','/products/attack-paths/','/blog/attack-path-analysis/','/resources/','/integrations/','/integrations/aws/','/pricing/','/contact/','/brand/','/resources/platform-data-sheet/'];
const jobs=[...routes.map(route=>({route,theme:'dark',width:1440})),...mobile.flatMap(route=>['light','dark'].map(theme=>({route,theme,width:390})))];
const browser=await chromium.launch(),results=[];
// Reduced motion provides stable contrast measurements; normal motion and controls are covered by e2e.
try{await Promise.all(Array.from({length:3},async()=>{while(jobs.length){const job=jobs.shift();const context=await browser.newContext({viewport:{width:job.width,height:900},colorScheme:job.theme,reducedMotion:'reduce'});const page=await context.newPage();await page.goto(base+job.route);await page.waitForLoadState('networkidle');const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();results.push({...job,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),violations:audit.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});await context.close();}}));}finally{await browser.close();}
fs.writeFileSync('artifacts/accessibility-matrix.json',JSON.stringify(results,null,2));const failures=results.filter(r=>r.overflow||r.violations.length);console.log(JSON.stringify({checks:results.length,failures},null,2));assert.equal(failures.length,0);
