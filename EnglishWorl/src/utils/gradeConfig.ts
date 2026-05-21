import type { Grade } from '../types';

export const GRADE_OPTIONS: { value: Grade; label: string }[] = [
  { value: 'primary', label: '小学' },
  { value: 'middle', label: '初中' },
  { value: 'high', label: '高中' },
];

export const GRADE_PROMPT: Record<Grade, { maxWords: number; addition: string }> = {
  primary: {
    maxWords: 10,
    addition: '请选择适合小学生的基础高频词汇（CEFR A1-A2水平），优先选择日常常用词。',
  },
  middle: {
    maxWords: 12,
    addition: '请选择适合初中生的中等难度词汇（CEFR A2-B1水平），包含短语动词和常见搭配。',
  },
  high: {
    maxWords: 15,
    addition: '请选择适合高中生的学术词汇和高级表达（CEFR B1-B2水平），包含复杂句型关键词。',
  },
};
