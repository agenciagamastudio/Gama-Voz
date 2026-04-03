import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yewwdvgrxelwrvbhajxy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlld3dkdmdyeGVsd3J2YmhhanhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzMjkxNDksImV4cCI6MjAzNjkwNTE0OX0.0OLQlG3eTc6FzPdMX8t8R0r_jH5xqCWMBQI2xNTvqZw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteUser() {
  try {
    console.log('🔍 Buscando usuário redpillphotostyle@gmail.com...');
    
    const { data, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error('❌ Erro ao listar usuários:', error);
      return;
    }

    const user = data.users.find(u => u.email === 'redpillphotostyle@gmail.com');
    
    if (!user) {
      console.log('❌ Usuário não encontrado');
      return;
    }

    console.log('✅ Usuário encontrado:', user.id);
    console.log('🗑️  Deletando dados relacionados...');
    
    await supabase.from('profiles').delete().eq('id', user.id);
    console.log('✅ Profiles deletados');

    await supabase.from('user_achievements').delete().eq('user_id', user.id);
    console.log('✅ Achievements deletados');

    await supabase.from('user_points').delete().eq('user_id', user.id);
    console.log('✅ Points deletados');

    await supabase.from('promo_redemptions').delete().eq('user_id', user.id);
    console.log('✅ Promo redemptions deletados');

    console.log('🔐 Deletando usuário da Auth...');
    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
    
    if (deleteError) {
      console.error('❌ Erro ao deletar usuário:', deleteError);
      return;
    }

    console.log('✅ Usuário deletado com sucesso!');
    console.log('\n🎯 Pronto para testar novamente!');
    console.log('📧 Faça signup com: redpillphotostyle@gmail.com');

  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

deleteUser();
