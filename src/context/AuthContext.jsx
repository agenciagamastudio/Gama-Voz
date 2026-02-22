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
        console.log('Attempting to fetch profile for userId:', userId); // DEBUG LOG
    
        const profileFetchPromise = supabase
          .from('profiles')
          .select('username, full_name, avatar_url, website, accent_color')
          .eq('id', userId)
          .limit(1);
    
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Profile fetch timed out after 10 seconds')), 10000)
        );
    
        try {
          const { data, error } = await Promise.race([profileFetchPromise, timeoutPromise]);
    
          console.log('getProfile query result - Data:', data, 'Error:', error); // DEBUG LOG
          
          if (error) {
            console.error('Supabase getProfile error:', error);
            addToast(`Erro ao carregar perfil: ${error.message}`, 'error');
            setProfileLoading(false);
            return null;
          }
          
          const fetchedProfile = data && data.length > 0 ? data[0] : null;
          setProfile(fetchedProfile);
          setProfileLoading(false);
          return fetchedProfile;
        } catch (err) {
          console.error('Unexpected error in getProfile:', err); // Catch unexpected errors (including timeout)
          addToast(`Erro inesperado ao carregar perfil: ${err.message}`, 'error');
          setProfileLoading(false);
          return null;
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

  useEffect(() => { // Wrap the auth state change logic in useEffect
    console.log('AuthContext useEffect triggered'); // DEBUG LOG

    const handleAuthStateChange = async (event, session) => {
      console.log('handleAuthStateChange called. Event:', event, 'Session:', session); // DEBUG LOG
      setCurrentUser(session?.user || null);
      setLoading(false);
      console.log('Auth State Changed:', event, 'User:', session?.user); // DEBUG LOG

      if (session?.user) {
        console.log('User found in session, attempting to get profile...'); // DEBUG LOG
        await getProfile(session.user.id);
        console.log('getProfile call completed.'); // DEBUG LOG
      } else {
        console.log('No user in session, clearing profile.'); // DEBUG LOG
        setProfile(null);
        setProfileLoading(false); // Clear profileLoading if user logs out
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial getSession result:', session); // DEBUG LOG
      handleAuthStateChange(null, session); // Verificação inicial
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
        console.log('AuthContext useEffect cleanup.'); // DEBUG LOG
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
        // Após o cadastro, o trigger do Supabase já cria o perfil, então apenas o buscamos
        await getProfile(data.user.id);
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
      checkPermission: (perm) => {
        // Lógica de permissões futura, pode usar o campo 'role' ou outros do 'profile'
        return currentUser !== null; // Usuário autenticado tem acesso básico por enquanto
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

