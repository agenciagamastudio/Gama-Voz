import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from './ToastContext';
import { supabase } from '../utils/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null); // Novo estado para o perfil do usuário
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false); // Novo estado de carregamento para o perfil

  // Função para buscar o perfil do usuário
  const getProfile = async (userId) => {
    setProfileLoading(true);

    // Default profile (fallback)
    const defaultProfile = {
      id: userId,
      username: 'Usuário',
      full_name: null,
      avatar_url: null,
      website: null,
      accent_color: null,
      role: 'user' // Adicionar role padrão
    };

    try {
      // Query simples sem timeout
      const { data } = await Promise.race([
        supabase
          .from('profiles')
          .select('id, username, full_name, avatar_url, website, accent_color, role')
          .eq('id', userId)
          .maybeSingle(),
        // Timeout simples: 8 segundos (antes de usar fallback)
        new Promise(resolve =>
          setTimeout(() => resolve({ data: null, error: null }), 8000)
        )
      ]);

      // Use data if exists, else fallback
      const profileData = data || defaultProfile;
      setProfile(profileData);
      setProfileLoading(false);
      return profileData;

    } catch {
      // On exception, use fallback immediately
      setProfile(defaultProfile);
      setProfileLoading(false);
      return defaultProfile;
    }
  };
    
      // Função para atualizar o perfil do usuário
      const updateUserProfile = async (updatedFields) => {    if (!currentUser) {
      addToast('Nenhum usuário logado.', 'error');
      return false;
    }

    setProfileLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update(updatedFields)
      .eq('id', currentUser.id);
    setProfileLoading(false);

    if (error) {
      addToast(`Erro ao atualizar perfil: ${error.message}`, 'error');
      return false;
    }

    // Atualiza o estado do perfil após a atualização
    await getProfile(currentUser.id);
    addToast('Perfil atualizado com sucesso!', 'success');
    return true;
  };

  useEffect(() => {
    const handleAuthStateChange = async (event, session) => {
      let user = session?.user || null;
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        await getProfile(user.id);
      } else {
        setProfile(null);
        setProfileLoading(false); // Clear profileLoading if user logs out
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      handleAuthStateChange(null, session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
        subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      addToast(`Erro ao fazer login: ${error.message}`, 'error');
      return false;
    }

    // Após o login bem-sucedido, carrega o perfil
    if (data.user) {
      setCurrentUser(data.user);
      await getProfile(data.user.id);
    }

    addToast(`Bem-vindo de volta!`, 'success');
    return true;
  };

  const signup = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      addToast(`Erro ao cadastrar: ${error.message}`, 'error');
      return false;
    }

    if (data.user) {
      setCurrentUser(data.user);
      // Após o cadastro, o trigger do Supabase já cria o perfil, então apenas o buscamos
      await getProfile(data.user.id);

      // Auto-setar role='master' para prontoatendimentogama@gmail.com
      const MASTER_EMAIL = 'prontoatendimentogama@gmail.com';
      if (email.toLowerCase() === MASTER_EMAIL.toLowerCase()) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: 'master' })
          .eq('id', data.user.id);

        if (!updateError) {
          // Reload profile with updated role
          await getProfile(data.user.id);
        }
      }

      addToast('Cadastro realizado! Verifique seu e-mail para confirmar.', 'success');
      return true;
    }
    return false;
  };

  const logout = async () => {
    setLoading(true);
    setProfile(null); // Limpar perfil antes de fazer logout
    const { error } = await supabase.auth.signOut();
    setLoading(false);

    if (error) {
      addToast(`Erro ao sair: ${error.message}`, 'error');
      return false;
    }

    addToast('Sessão encerrada.', 'success');
    return true;
  };

  // Funções de Gestão (placeholders por enquanto)
  const createModerator = () => { addToast('Funcionalidade de criação de moderador não implementada para Supabase.', 'info'); return false; };
  const updatePermissions = () => { addToast('Funcionalidade de atualização de permissões não implementada para Supabase.', 'info'); return false; };
  const deleteUser = () => { addToast('Funcionalidade de exclusão de usuário não implementada para Supabase.', 'info'); return false; };

  return (
    <AuthContext.Provider value={{
      currentUser,
      profile, // Expondo o perfil
      login,
      signup,
      logout,
      loading,
      profileLoading, // Expondo o estado de carregamento do perfil
      updateUserProfile, // Expondo a função de atualização do perfil
      createModerator,
      updatePermissions,
      deleteUser,
      checkPermission: () => {
        // Lógica de permissões futura, pode usar o campo 'role' ou outros do 'profile'
        return currentUser !== null; // Usuário autenticado tem acesso básico por enquanto
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

