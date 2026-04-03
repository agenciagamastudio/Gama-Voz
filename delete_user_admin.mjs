import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yewwdvgrxelwrvbhajxy.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlld3dkdmdyeGVsd3J2YmhhanhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTMyOTE0OSwiZXhwIjoyMDM2OTA1MTQ5fQ.DEbVj_P6Yd98E6CMFrp6bL0wGCADKxPBt4nPXkNJ5Ek';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function deleteUser() {
  try {
    console.log('🔍 Buscando usuário redpillphotostyle@gmail.com...');
    
    // Deletar via SQL raw query
    const { data: users, error: queryError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'redpillphotostyle@gmail.com');

    if (queryError) {
      console.log('Tentando deletar direto via auth...');
    } else if (users && users.length > 0) {
      const userId = users[0].id;
      console.log('✅ Usuário encontrado:', userId);

      // Deletar dados
      await supabase.from('user_achievements').delete().eq('user_id', userId);
      await supabase.from('user_points').delete().eq('user_id', userId);
      await supabase.from('profiles').delete().eq('id', userId);
      
      // Deletar da auth
      const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);
      if (deleteError) throw deleteError;
      
      console.log('✅ Usuário deletado!');
      return;
    }

    // Alternativa: buscar pela auth
    const { data: { users: authUsers }, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) throw listError;

    const user = authUsers.find(u => u.email === 'redpillphotostyle@gmail.com');
    if (!user) {
      console.log('❌ Usuário não encontrado');
      return;
    }

    console.log('✅ Usuário encontrado:', user.id);
    
    // Deletar dados
    await supabase.from('user_achievements').delete().eq('user_id', user.id);
    console.log('✅ Achievements deletados');

    await supabase.from('user_points').delete().eq('user_id', user.id);
    console.log('✅ Points deletados');

    await supabase.from('profiles').delete().eq('id', user.id);
    console.log('✅ Profile deletado');

    // Deletar auth
    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
    if (deleteError) throw deleteError;

    console.log('✅ Usuário deletado com sucesso!');
    console.log('\n🎯 Pronto para testar com redpillphotostyle@gmail.com');

  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

deleteUser();
