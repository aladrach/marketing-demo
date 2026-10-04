import pages from '../data/pages.json';
import products from '../data/products.json';
import solutions from '../data/solutions.json';
import articles from '../data/articles.json';
import guides from '../data/guides.json';
import integrations from '../data/integrations.json';
export type Page=typeof pages[number];
export type Detail={slug:string;title:string;summary:string;icon?:string;outcome?:string;steps?:string[];sections:string[][];faq?:string[][];related:string[];category?:string;date?:string;author?:string;authorNote?:string;minutes?:number;sources?:{label:string;url:string}[];};
export function pageData(page:Page){const slug=page.slug.split('/').at(-1);const data=page.template==='product'?products.find(p=>p.slug===slug):page.template==='solution'?solutions.find(p=>p.slug===slug):page.template==='article'?articles.find(p=>p.slug===slug):page.template==='guide'?guides.find(p=>p.slug===slug):undefined;return {page,data:data as Detail|undefined,integration:page.template==='integration'?integrations.find(item=>item.slug===slug):undefined};}
