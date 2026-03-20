import { NextRequest } from 'next/server';
import { generateIdeas } from '@/lib/anthropic';
import { createAdminClient, createServerClient } from '@/lib/supabase/server';

async function runGenerate() {
  const ideas = await generateIdeas();
  const now = new Date().toISOString();
  const rows = ideas.map((idea) => ({ ...idea, generated_at: now }));

  const admin = createAdminClient();
  const { data, error } = await admin.from('ideas').insert(rows).select();
  if (error) throw new Error('Fikirler kaydedilemedi: ' + error.message);
  return data;
}

/** Kullanıcı tetiklemesi (buton) */
export async function POST(request: NextRequest) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const data = await runGenerate();
    return Response.json({ ideas: data }, { status: 200 });
  } catch (err: any) {
    console.error('Generate error:', err);
    return Response.json({ error: err.message ?? 'Fikir üretilemedi' }, { status: 500 });
  }
}

/** Vercel Cron Job (GET — her hafta içi 07:00 UTC) */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Yetkisiz' }, { status: 401 });
  }

  try {
    const data = await runGenerate();
    return Response.json({ ideas: data }, { status: 200 });
  } catch (err: any) {
    console.error('Cron generate error:', err);
    return Response.json({ error: err.message ?? 'Fikir üretilemedi' }, { status: 500 });
  }
}
