import { createServerClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('saved_ideas')
    .select(`
      id,
      saved_at,
      idea:ideas (*)
    `)
    .eq('user_id', user.id)
    .order('saved_at', { ascending: false });

  if (error) {
    return Response.json({ error: 'Arşiv alınamadı' }, { status: 500 });
  }

  return Response.json({ saved: data });
}
