import React from 'react';
import type { VocabularyItem } from '../types';

export interface TextSegment {
  type: 'text' | 'keyword';
  content: string;
  item?: VocabularyItem;
}

export function parseTextWithKeywords(
  text: string,
  keywords: VocabularyItem[]
): TextSegment[] {
  if (!keywords.length) return [{ type: 'text', content: text }];

  const sorted = [...keywords].sort((a, b) => b.word.length - a.word.length);
  const escaped = sorted.map((k) => k.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(pattern);

  return parts
    .filter((p) => p.length > 0)
    .map((part) => {
      const match = sorted.find((k) => k.word.toLowerCase() === part.toLowerCase());
      if (match) {
        return { type: 'keyword' as const, content: part, item: match };
      }
      return { type: 'text' as const, content: part };
    });
}

export function renderHighlightedText(
  segments: TextSegment[],
  onKeywordClick: (word: string) => void,
  highlightIndex: number = -1
): React.ReactNode[] {
  return segments.map((seg, i) => {
    if (seg.type === 'keyword' && seg.item) {
      const isActive = i === highlightIndex;
      return React.createElement(
        'span',
        {
          key: i,
          className: `keyword-badge${isActive ? ' active' : ''}`,
          onClick: (e: React.MouseEvent) => {
            e.stopPropagation();
            onKeywordClick(seg.item!.word);
          },
          title: `${seg.item.meaning} ${seg.item.phonetic ?? ''}`,
          style: {
            backgroundColor: isActive ? '#ffd700' : '#fff3cd',
            border: `2px solid ${isActive ? '#ff9800' : '#ffc107'}`,
            borderRadius: '4px',
            padding: '1px 3px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontWeight: isActive ? 700 : 500,
          },
        },
        seg.content
      );
    }
    return React.createElement(React.Fragment, { key: i }, seg.content);
  });
}
