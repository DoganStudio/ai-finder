import { NextRequest } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

// Next.js 16: params is a Promise
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  const { error } = await supabase
    .from('saved_ideas')
    .delete()
    .eq('idea_id', id)
    .eq('user_id', user.id);

  if (error) {
    return Response.json({ error: 'Silme başarısız' }, { status: 500 });
  }

  return Response.json({ success: true });
}
