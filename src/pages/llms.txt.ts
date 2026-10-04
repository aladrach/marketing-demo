import pages from '../data/pages.json';
import brand from '../data/brand.json';
import type { APIRoute } from 'astro';
export const GET:APIRoute=({site})=>new Response(`# Tracegate\n\n> ${brand.description}\n\n${brand.disclosure}\n\nThis optional content map is for readers and tools. It does not grant special search eligibility or promise AI citations.\n\n## Core pages\n\n${pages.filter(p=>!['legal','contact'].includes(p.template)).map(p=>`- [${p.title}](${new URL('/'+p.slug+'/',site||'https://tracegate.example').href}): ${p.summary}`).join('\n')}\n`,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
