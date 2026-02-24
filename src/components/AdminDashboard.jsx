import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

function AdminDashboard() {
  const { addToast } = useToast();
  const { users = [], createModerator, updatePermissions, deleteUser, currentUser } = useAuth();

  console.log('AdminDashboard rendered. currentUser:', currentUser, 'users:', users);

  const [pointsAmount, setPointsAmount] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPermsModal, setShowPermsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form State para Novo Usuário
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPass, setNewUserPass] = useState('');

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (createModerator(newUserName, newUserEmail, newUserPass)) {
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPass('');
      setShowUserModal(false);
    }
  };

  const togglePermission = (permKey) => {
    if (!selectedUser) return;
    const newPerms = { ...selectedUser.permissions, [permKey]: !selectedUser.permissions[permKey] };
    updatePermissions(selectedUser.id, newPerms);
    setSelectedUser({ ...selectedUser, permissions: newPerms }); // Update local state for immediate feedback
  };

  // IDs de usuários com acesso ADMIN e email permitido
  const ADMIN_IDS = ['00662266-db06-41d4-b237-95062bfb6b06']; // prontoatendimentogama@gmail.com
  const ADMIN_EMAILS = ['prontoatendimentogama@gmail.com'];

  // Verificar acesso ADMIN (por ID, role ou email)
  const isAdmin = currentUser && (
    ADMIN_IDS.includes(currentUser.id) ||
    currentUser?.role === 'master' ||
    ADMIN_EMAILS.includes(currentUser.email)
  );

  // Fallback para debugging
  if (!currentUser) {
    console.log('AdminDashboard: currentUser é null, retornando aviso de não autenticado');
    return <div className="p-8 text-center text-yellow-500 font-black min-h-screen flex items-center justify-center">
      ⚠️ NÃO AUTENTICADO - Por favor faça login primeiro
    </div>;
  }

  if (!isAdmin) {
    console.log('AdminDashboard: Acesso negado. currentUser.id:', currentUser.id, 'isAdmin:', isAdmin);
    return <div className="p-8 text-center text-red-500 font-black min-h-screen flex items-center justify-center">ACESSO NEGADO - Apenas ADMIN</div>;
  }

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 pt-8 pb-32 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-4xl">admin_panel_settings</span>
            Painel <span className="text-primary">Admin</span>
          </h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1 text-left">Controle Mestre do Ecossistema</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          <span className="text-[10px] font-black text-primary uppercase">Sistema Online</span>
        </div>
      </header>

      {/* Gestão de Usuários */}
      <section className="bg-card-bg p-6 rounded-2xl border border-white/5 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">group</span>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Equipe & Acessos</h3>
          </div>
          <button 
            onClick={() => setShowUserModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-all"
          >
            <span className="material-symbols-outlined text-sm">person_add</span> Novo Moderador
          </button>
        </div>

        <div className="space-y-2">
          {users.map(user => (
            <div key={user.id} className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-white/5 rounded-xl group hover:border-primary/20 transition-all">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${user.role === 'master' ? 'bg-primary text-black' : 'bg-white/10 text-white'}`}>
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{user.name} {user.role === 'master' && <span className="text-[9px] text-primary bg-primary/10 px-1.5 py-0.5 rounded ml-2">MASTER</span>}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">{user.email}</p>
                </div>
              </div>
              
              {user.role !== 'master' && (
                <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => { setSelectedUser(user); setShowPermsModal(true); }}
                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10 hover:text-primary transition-all"
                    title="Editar Permissões"
                  >
                    <span className="material-symbols-outlined text-lg">vpn_key</span>
                  </button>
                  <button 
                    onClick={() => { if(confirm('Remover usuário?')) deleteUser(user.id); }}
                    className="p-2 bg-white/5 rounded-lg hover:bg-red-500/20 hover:text-red-500 transition-all"
                    title="Remover Acesso"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Grid de Monitoramento e Outras Ações (Mantido do anterior) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gestão de Pontos */}
        <section className="bg-card-bg p-6 rounded-2xl border border-white/5 shadow-xl space-y-6 text-left">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">bolt</span>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Injetar Energia (Pontos)</h3>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <input 
                type="number"
                placeholder="Qtd"
                value={pointsAmount}
                onChange={(e) => setPointsAmount(e.target.value)}
                className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all font-bold"
              />
              <button 
                onClick={() => {
                  if (pointsAmount) {
                    addBonusPoints(Number(pointsAmount), 'Injeção Admin');
                    setPointsAmount('');
                    addToast('Injeção realizada!', 'success');
                  }
                }}
                className="px-6 py-3 bg-primary text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-primary/90 transition-all shadow-lg"
              >
                Injetar
              </button>
            </div>
          </div>
        </section>

        {/* Auditoria de Dados */}
        <section className="bg-card-bg p-6 rounded-2xl border border-white/5 shadow-xl space-y-6 text-left">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">database</span>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Base de Dados Local</h3>
          </div>
          <div className="space-y-3">
            <button 
              onClick={() => {
                const data = JSON.stringify(localStorage);
                const blob = new Blob([data], {type: 'application/json'});
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'gama_backup_admin.json';
                a.click();
                addToast('Backup exportado!', 'success');
              }}
              className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 flex items-center justify-center gap-3 transition-all"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              Exportar JSON
            </button>
          </div>
        </section>
      </div>

      {/* Modal Criar Usuário */}
      {showUserModal && (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 w-full max-w-md rounded-2xl p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Novo Moderador</h3>
              <button onClick={() => setShowUserModal(false)}><span className="material-symbols-outlined text-slate-500">close</span></button>
            </div>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <input required type="text" placeholder="Nome" value={newUserName} onChange={e => setNewUserName(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary" />
              <input required type="email" placeholder="E-mail" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary" />
              <input required type="password" placeholder="Senha" value={newUserPass} onChange={e => setNewUserPass(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary" />
              <button type="submit" className="w-full py-3 bg-primary text-black font-black uppercase text-xs tracking-widest rounded-xl hover:bg-primary/90">Criar Acesso</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Permissões */}
      {showPermsModal && selectedUser && (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 w-full max-w-md rounded-2xl p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-white">Permissões</h3>
                <p className="text-xs text-slate-500">{selectedUser.name}</p>
              </div>
              <button onClick={() => setShowPermsModal(false)}><span className="material-symbols-outlined text-slate-500">close</span></button>
            </div>
            <div className="space-y-2">
              {Object.keys(selectedUser.permissions).map(key => (
                <div key={key} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10" onClick={() => togglePermission(key)}>
                  <span className="text-sm font-medium text-slate-300 capitalize">{key.replace(/_/g, ' ').replace('can ', '')}</span>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${selectedUser.permissions[key] ? 'bg-primary' : 'bg-slate-700'}`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${selectedUser.permissions[key] ? 'left-6' : 'left-1'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;
