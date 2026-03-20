import { createServerClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  // Son 24 saatteki fikirleri getir; yoksa en son batch'i al
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  let { data: ideas, error } = await supabase
    .from('ideas')
    .select('*')
    .gte('generated_at', since)
    .order('generated_at', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    return Response.json({ error: 'Fikirler alınamadı' }, { status: 500 });
  }

  // Son 24 saatte yoksa, en son 6 fikri getir
  if (!ideas || ideas.length === 0) {
    const fallback = await supabase
      .from('ideas')
      .select('*')
      .order('generated_at', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(6);

    ideas = fallback.data ?? [];
  }

  return Response.json({ ideas });
}
