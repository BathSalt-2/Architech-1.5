const GROQ_BASE = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'llama-3.3-70b-versatile';

export function getGroqKey(): string | null {
  return localStorage.getItem('arch15-groq-key');
}

export async function callGroq(
  messages: Array<{role: string; content: string}>,
  options?: {temperature?: number; max_tokens?: number}
): Promise<string> {
  const key = getGroqKey();
  if (!key) throw new Error('NO_KEY');

  const res = await fetch(GROQ_BASE, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      messages,
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.max_tokens ?? 2000
    })
  });

  if (!res.ok) throw new Error(`Groq API error: ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}
