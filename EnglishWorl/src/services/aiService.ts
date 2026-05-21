import OpenAI from 'openai';
import type { AIConfig, Grade, VocabularyItem } from '../types';
import { GRADE_PROMPT } from '../utils/gradeConfig';

function createClient(config: AIConfig): OpenAI {
  return new OpenAI({
    apiKey: config.apiKey || 'sk-placeholder',
    baseURL: config.baseURL || 'https://api.openai.com/v1',
    dangerouslyAllowBrowser: true,
  });
}

export async function translateText(
  text: string,
  config: AIConfig
): Promise<string> {
  const client = createClient(config);
  const resp = await client.chat.completions.create({
    model: config.model,
    messages: [
      {
        role: 'system',
        content:
          '你是一个专业的英语翻译。请将用户提供的英文翻译成流畅、准确的中文。只返回中文译文，不要包含任何解释或额外文字。',
      },
      { role: 'user', content: text },
    ],
    temperature: 0.3,
  });
  return resp.choices[0]?.message?.content?.trim() ?? '';
}

export async function extractVocabulary(
  text: string,
  grade: Grade,
  config: AIConfig
): Promise<VocabularyItem[]> {
  const client = createClient(config);
  const gradeInfo = GRADE_PROMPT[grade];
  const resp = await client.chat.completions.create({
    model: config.model,
    messages: [
      {
        role: 'system',
        content: `你是一个专业的英语教学助手。从以下英文文本中提取重点词汇。${gradeInfo.addition}
最多提取 ${gradeInfo.maxWords} 个词汇。
请严格按以下 JSON 格式返回，不要包含任何其他文字：
{"words": [{"word": "单词", "partOfSpeech": "词性（如 n./v./adj./adv./prep. 等）", "meaning": "中文释义"}]}`,
      },
      { role: 'user', content: text },
    ],
    temperature: 0.3,
  });
  let raw = resp.choices[0]?.message?.content?.trim() ?? '{}';
  // Strip markdown code fences if present
  raw = raw.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '');
  try {
    const parsed = JSON.parse(raw);
    // Handle both array and {words: [...]} formats
    const words = Array.isArray(parsed) ? parsed : parsed.words ?? parsed.vocabulary ?? [];
    return words.map((w: Record<string, string>) => ({
      word: w.word ?? '',
      partOfSpeech: w.partOfSpeech ?? w.pos ?? '',
      meaning: w.meaning ?? w.chinese ?? '',
    }));
  } catch {
    return [];
  }
}
