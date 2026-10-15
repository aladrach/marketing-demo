export type InlineRun =
  | { type: 'text' | 'code' | 'quote'; text: string }
  | { type: 'link'; text: string; href: string };
export type ContentBlock =
  | { type: 'paragraph'; content: InlineRun[] }
  | { type: 'table'; label: string; headers: string[]; rows: string[][] };
export interface EditorialContent {
  intro: ContentBlock[];
  sections: { heading: string; blocks: ContentBlock[] }[];
}
export interface ArticleFigure {
  desktop: { src: string; width: number; height: number };
  mobile: { src: string; width: number; height: number };
  alt: string;
  caption: string;
  disclaimer: string;
}
export interface SocialImage {
  path: string;
  width: number;
  height: number;
  type: string;
  alt: string;
}

export const draftLabel = 'Draft · Publication date pending';

// Count visible article copy, including headings, metadata, table and live figure
// text. Exclude the estimate itself, hidden alt text, TOC duplicates and site chrome.
export function readingEstimate(article: {
  title: string; summary: string; category?: string; author?: string;
  authorNote?: string; publicationStatus?: string; figure?: ArticleFigure;
  content: EditorialContent;
}) {
  const blockText = (block: ContentBlock): string => block.type === 'paragraph'
    ? block.content.map(run => run.text).join('')
    : [...block.headers, ...block.rows.flat()].join(' ');
  const words = [article.title, article.summary, article.category, article.author,
    article.authorNote, article.publicationStatus === 'draft' ? draftLabel : '',
    article.figure?.caption, article.figure?.disclaimer,
    ...article.content.intro.map(blockText),
    ...article.content.sections.flatMap(section => [section.heading, ...section.blocks.map(blockText)]),
  ].filter(Boolean).join(' ').trim().split(/\s+/u).length;
  return { words, minutes: Math.ceil(words / 200) };
}
