import type { CollectionEntry } from 'astro:content';

export interface ArticleImage {
  path: string;
  alt?: string;
  source: 'frontmatter' | 'content';
}

export function resolveArticleImages(entry: CollectionEntry<'articles'>) {
  const fallback = findFirstImageInContent(entry.body ?? '');
  const frontmatter: ArticleImage | null = entry.data.image
    ? {
        path: entry.data.image,
        alt: entry.data.imageAlt,
        source: 'frontmatter',
      }
    : null;

  const prioritized = frontmatter ?? fallback;
  const hero = prioritized;
  const representative = entry.data.featuredImageEnabled ? prioritized : null;

  return { hero, representative };
}

function findFirstImageInContent(body: string): ArticleImage | null {
  if (!body) return null;

  const markdownRegex = /!\[([^\]]*)]\(\s*([^)]+)\)/;
  const htmlRegex = /<img\b[^>]*>/i;

  const markdownMatch = markdownRegex.exec(body);
  const htmlMatch = htmlRegex.exec(body);

  const markdownIndex = markdownMatch?.index ?? Infinity;
  const htmlIndex = htmlMatch?.index ?? Infinity;

  if (markdownMatch && markdownIndex <= htmlIndex) {
    const path = extractMarkdownImagePath(markdownMatch[2]);
    if (!path) return null;
    return {
      path,
      alt: markdownMatch[1]?.trim() || undefined,
      source: 'content',
    };
  }

  if (htmlMatch) {
    const tag = htmlMatch[0];
    const src = extractAttribute(tag, 'src');
    if (!src) return null;
    const alt = extractAttribute(tag, 'alt');
    return {
      path: src,
      alt: alt?.trim() || undefined,
      source: 'content',
    };
  }

  return null;
}

function extractMarkdownImagePath(content: string): string | null {
  if (!content) return null;
  const trimmed = content.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith('<')) {
    const closeIndex = trimmed.indexOf('>');
    if (closeIndex > 1) {
      return trimmed.slice(1, closeIndex).trim();
    }
  }

  const whitespaceIndex = findFirstUnquotedWhitespaceIndex(trimmed);
  const pathCandidate =
    whitespaceIndex === -1 ? trimmed : trimmed.slice(0, whitespaceIndex);
  return pathCandidate.trim() || null;
}

function findFirstUnquotedWhitespaceIndex(text: string): number {
  let inSingleQuote = false;
  let inDoubleQuote = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
      continue;
    }
    if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
      continue;
    }
    if (!inSingleQuote && !inDoubleQuote && /\s/.test(char)) {
      return i;
    }
  }

  return -1;
}

function extractAttribute(tag: string, attribute: string): string | null {
  const regex = new RegExp(
    `${attribute}\\s*=\\s*(?:"([^"]+)"|'([^']+)'|([^\\s>]+))`,
    'i',
  );
  const match = regex.exec(tag);
  if (!match) return null;
  return match[1] ?? match[2] ?? match[3] ?? null;
}
