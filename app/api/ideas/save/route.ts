import { NextRequest } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  const { idea_id } = await request.json();
  if (!idea_id) {
    return Response.json({ error: 'idea_id zorunludur' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('saved_ideas')
    .insert({ user_id: user.id, idea_id })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      // Unique constraint — zaten kaydedilmiş
      return Response.json({ message: 'Zaten arşivde' }, { status: 200 });
    }
    return Response.json({ error: 'Kayıt başarısız' }, { status: 500 });
  }

  return Response.json({ saved: data }, { status: 201 });
}
