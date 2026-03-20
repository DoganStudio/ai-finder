import Anthropic from '@anthropic-ai/sdk';
import { Idea } from './types';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Sen bir SaaS fikir analisti ve startup danışmanısın.
Almanya B2B pazarında çalışan bir AI ajansı için fikir üretiyorsun.

Görevin: Şu an trend olan, 2024-2025'te büyüyen, Almanya'daki orta/büyük
şirketlere (Mittelstand) satılabilecek SaaS fikirleri üret ve analiz et.

ÖNEMLİ KURALLAR:
- Gerçekçi ol, hype yapma
- Her fikir gerçekten uygulanabilir olmalı
- Pazar büyüklüğünü Almanya özelinde hesapla
- Tüm metin alanlarını Türkçe doldur`;

const USER_PROMPT = `Almanya B2B pazarı için 6 adet trend SaaS fikri üret.
Dağılım: 2 mikro SaaS, 2 B2B araç, 2 mimarlık/gayrimenkul SaaS.
Özellikle Mittelstand şirketlerinin (50-500 çalışan) acılarına odaklan.
Her fikir için istenen tüm alanları eksiksiz doldur.`;

export async function generateIdeas(): Promise<Omit<Idea, 'id' | 'generated_at'>[]> {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: USER_PROMPT }],
    tools: [
      {
        name: 'save_ideas',
        description: 'Almanya pazarı için üretilen 6 adet SaaS fikrini kaydet',
        input_schema: {
          type: 'object' as const,
          properties: {
            ideas: {
              type: 'array',
              description: '6 adet SaaS fikri',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', description: 'benzersiz-kebab-case-slug (örn: erp-ai-asistan)' },
                  title: { type: 'string', description: 'Fikir başlığı (Türkçe)' },
                  desc: { type: 'string', description: '2 cümle açıklama (Türkçe)' },
                  category: { type: 'string', enum: ['mikro', 'b2b', 'mimarlik'] },
                  tags: { type: 'array', items: { type: 'string' }, description: '3-5 etiket' },
                  score: { type: 'number', description: '0-100 arası puan' },
                  revenue_potential: { type: 'string', description: 'Örn: €2-5k/ay' },
                  difficulty: { type: 'string', enum: ['Kolay', 'Orta', 'Zor'] },
                  time_to_mvp: { type: 'string', description: 'Örn: 2-4 hafta' },
                  germany_fit: { type: 'number', description: '0-100 arası Almanya uyum puanı' },
                  market_size: { type: 'string', description: 'Almanya pazarındaki büyüklük' },
                  pain_model: { type: 'string', description: 'Hangi acıyı çözüyor' },
                  monetization: { type: 'string', description: 'Nasıl para kazanır' },
                  tools: { type: 'array', items: { type: 'string' }, description: 'Kullanılan teknolojiler' },
                  steps: { type: 'array', items: { type: 'string' }, description: 'MVP adımları' },
                  risks: { type: 'array', items: { type: 'string' }, description: 'Riskler' },
                  competitors: { type: 'string', description: 'Mevcut rakipler ve fark' },
                },
                required: ['id', 'title', 'desc', 'category', 'tags', 'score', 'revenue_potential',
                  'difficulty', 'time_to_mvp', 'germany_fit', 'market_size', 'pain_model',
                  'monetization', 'tools', 'steps', 'risks', 'competitors'],
              },
            },
          },
          required: ['ideas'],
        },
      },
    ],
    tool_choice: { type: 'tool', name: 'save_ideas' },
  });

  console.log('Claude stop_reason:', message.stop_reason);
  console.log('Claude content types:', message.content.map((c: any) => c.type));

  const toolUse = message.content.find((c: any) => c.type === 'tool_use' && c.name === 'save_ideas') as any;

  if (!toolUse) {
    console.error('Claude response:', JSON.stringify(message.content, null, 2));
    throw new Error('Claude save_ideas aracını çağırmadı');
  }

  const parsed = toolUse.input?.ideas as any[];

  if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
    console.error('tool_use.input:', JSON.stringify(toolUse.input, null, 2));
    throw new Error('Claude ideas dizisi boş: ' + JSON.stringify(toolUse.input));
  }

  return parsed.map((item: any) => ({
    external_id: item.id ?? crypto.randomUUID(),
    title: item.title,
    description: item.desc,
    category: item.category,
    tags: item.tags ?? [],
    score: item.score,
    revenue_potential: item.revenue_potential,
    difficulty: item.difficulty,
    time_to_mvp: item.time_to_mvp,
    germany_fit: item.germany_fit,
    market_size: item.market_size,
    pain_model: item.pain_model,
    monetization: item.monetization,
    tools: item.tools ?? [],
    steps: item.steps ?? [],
    risks: item.risks ?? [],
    competitors: item.competitors,
  }));
}
