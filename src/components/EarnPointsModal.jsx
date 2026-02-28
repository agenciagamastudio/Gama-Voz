import React, { useState } from 'react';
import { useAchievements } from '../hooks/useAchievements';

/**
 * Modal "Ganhe Pontos" - interativo e expansível
 * Mostra ações de engajamento com fluxo detalhado
 * Aparece APENAS após usuário completar perfil
 */
export const EarnPointsModal = ({ isOpen, onClose, profileComplete }) => {
  const { getAchievementsList, completeAchievement, getTotalEarnedPoints } =
    useAchievements();
  const [selectedAction, setSelectedAction] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);

  if (!isOpen || !profileComplete) return null;

  const achievements = getAchievementsList();
  const totalEarned = getTotalEarnedPoints();
  const selectedAchievement = selectedAction
    ? achievements.find(a => a.id === selectedAction)
    : null;

  const handleActionClick = async (achievementId) => {
    setSelectedAction(achievementId);
    // Auto-complete para ações automáticas
    if (achievementId === 'complete_profile') {
      setLoadingAction(achievementId);
      await completeAchievement(achievementId);
      setLoadingAction(null);
    }
  };

  const handleInstagramClick = (username) => {
    window.open(`https://www.instagram.com/${username}`, '_blank');
    setTimeout(() => {
      handleCompleteAction('follow_social');
    }, 500);
  };

  const handleWhatsAppClick = () => {
    const message = `Olá! Sou usuario da GAMA Calculadora e gostei muito. Recomendo!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/5575983129198?text=${encodedMessage}`,
      '_blank'
    );
    setTimeout(() => {
      handleCompleteAction('whatsapp_contact');
    }, 500);
  };

  const handleCompleteAction = async (actionId) => {
    setLoadingAction(actionId);
    await completeAchievement(actionId);
    setLoadingAction(null);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-40" />

      {/* Modal - FIXO, NÃO FECHA */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-2xl w-full max-w-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/20 to-yellow-500/10 p-8 border-b border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                  Desbloqueie Pontos Extras
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                  Complete ações simples para ganhar mais energia
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-3 hover:bg-white/5 rounded-xl transition-all text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Progresso: +{totalEarned} pts conquistados
                </p>
                <p className="text-xs font-bold text-primary">
                  {achievements.filter(a => a.completed).length}/{achievements.length} ações
                </p>
              </div>
              <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary via-primary to-yellow-400 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${(getTotalEarnedPoints() / 30) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Content Layout - Lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[500px]">
            {/* Left: Lista de Ações */}
            <div className="bg-card-bg border-r border-white/5 overflow-y-auto max-h-[600px]">
              <div className="p-6 space-y-3">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
                  Ações Disponíveis
                </p>

                {achievements.map((achievement) => (
                  <button
                    key={achievement.id}
                    onClick={() => handleActionClick(achievement.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      selectedAction === achievement.id
                        ? 'bg-primary/20 border-primary/50 ring-2 ring-primary/30'
                        : achievement.completed
                          ? 'bg-primary/10 border-primary/20'
                          : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-black text-white text-sm uppercase tracking-tight">
                          {achievement.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {achievement.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xl font-black text-primary">
                          +{achievement.points}
                        </span>
                        {achievement.completed && (
                          <span className="inline-block px-2 py-1 bg-primary/30 text-primary text-[10px] font-black rounded-full">
                            ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Detalhe da Ação Selecionada */}
            <div className="bg-[#0a0a0a] p-8 flex flex-col justify-center items-center">
              {!selectedAction ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-4xl text-primary">
                      touch_app
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-2">
                      Escolha uma ação
                    </h3>
                    <p className="text-sm text-slate-400">
                      Clique em qualquer ação à esquerda para começar
                    </p>
                  </div>
                </div>
              ) : selectedAchievement.completed ? (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-5xl text-primary">
                      check_circle
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-primary mb-2">
                      Parabéns!
                    </h3>
                    <p className="text-sm text-slate-400 mb-4">
                      Você ganhou {selectedAchievement.points} pontos em
                      <br />
                      <span className="font-black text-white">
                        {selectedAchievement.name}
                      </span>
                    </p>
                    <button
                      onClick={() => setSelectedAction(null)}
                      className="px-6 py-2 bg-primary/20 text-primary font-bold rounded-lg hover:bg-primary/30 transition-all"
                    >
                      Ver Outra Ação
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 w-full">
                  <div className="text-center">
                    <h3 className="text-2xl font-black text-white mb-2">
                      {selectedAchievement.name}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {selectedAchievement.description}
                    </p>
                  </div>

                  {/* CTA por tipo de ação */}
                  <div className="space-y-3">
                    {selectedAchievement.id === 'complete_profile' && (
                      <div className="text-center space-y-3">
                        <p className="text-sm text-slate-400">
                          Esta ação já foi completada automaticamente!
                        </p>
                        <button
                          onClick={() => handleCompleteAction('complete_profile')}
                          disabled={loadingAction === 'complete_profile'}
                          className="w-full py-4 bg-primary text-black font-black uppercase text-sm rounded-2xl hover:bg-primary/90 transition-all disabled:opacity-50"
                        >
                          {loadingAction === 'complete_profile' ? (
                            <>Processando...</>
                          ) : (
                            <>Confirmar + {selectedAchievement.points} pts</>
                          )}
                        </button>
                      </div>
                    )}

                    {selectedAchievement.id === 'first_diagnostic' && (
                      <div className="text-center space-y-3">
                        <p className="text-sm text-slate-400">
                          Complete seu primeiro diagnóstico para ganhar estes pontos.
                        </p>
                        <a
                          href="/calculadora"
                          className="w-full inline-block py-4 bg-primary text-black font-black uppercase text-sm rounded-2xl hover:bg-primary/90 transition-all text-center"
                        >
                          Ir para Calculadora
                        </a>
                      </div>
                    )}

                    {selectedAchievement.id === 'first_proposal' && (
                      <div className="text-center space-y-3">
                        <p className="text-sm text-slate-400">
                          Crie sua primeira proposta para desbloquear estes pontos.
                        </p>
                        <a
                          href="/calculadora"
                          className="w-full inline-block py-4 bg-primary text-black font-black uppercase text-sm rounded-2xl hover:bg-primary/90 transition-all text-center"
                        >
                          Criar Proposta
                        </a>
                      </div>
                    )}

                    {selectedAchievement.id === 'share_proposal' && (
                      <div className="text-center space-y-3">
                        <p className="text-sm text-slate-400">
                          Compartilhe uma proposta via WhatsApp para ganhar pontos.
                        </p>
                        <p className="text-xs text-slate-500">
                          (Você receberá os pontos automaticamente ao compartilhar)
                        </p>
                      </div>
                    )}

                    {selectedAchievement.id === 'follow_social' && (
                      <div className="space-y-2">
                        <p className="text-center text-sm text-slate-400 mb-3">
                          Siga todas as redes sociais:
                        </p>
                        <button
                          onClick={() =>
                            handleInstagramClick('agencia.gamastudio')
                          }
                          disabled={loadingAction === 'follow_social'}
                          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black uppercase text-xs rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
                        >
                          @agencia.gamastudio
                        </button>
                        <button
                          onClick={() =>
                            handleInstagramClick('matheusqueiroz.fotografo')
                          }
                          disabled={loadingAction === 'follow_social'}
                          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black uppercase text-xs rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
                        >
                          @matheusqueiroz.fotografo
                        </button>
                        <button
                          onClick={() =>
                            handleInstagramClick('gracaqueiroz._')
                          }
                          disabled={loadingAction === 'follow_social'}
                          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black uppercase text-xs rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
                        >
                          @gracaqueiroz._
                        </button>
                      </div>
                    )}

                    {selectedAchievement.id === 'whatsapp_contact' && (
                      <div className="space-y-3">
                        <p className="text-center text-sm text-slate-400">
                          Clique para abrir WhatsApp e enviar mensagem para a gente:
                        </p>
                        <button
                          onClick={handleWhatsAppClick}
                          disabled={loadingAction === 'whatsapp_contact'}
                          className="w-full py-4 bg-green-600 text-white font-black uppercase text-sm rounded-2xl hover:bg-green-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined">
                            whatsapp
                          </span>
                          {loadingAction === 'whatsapp_contact'
                            ? 'Processando...'
                            : 'Abrir WhatsApp'}
                        </button>
                        <p className="text-xs text-slate-500 text-center">
                          Mensagem: "Olá! Sou usuario da GAMA Calculadora e
                          gostei muito. Recomendo!"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Info Box */}
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                    <p className="text-xs text-slate-400 text-center">
                      <span className="text-primary font-black">
                        +{selectedAchievement.points} pontos
                      </span>
                      {' '}serão creditados assim que completar
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-t from-black/50 to-transparent p-6 border-t border-white/5 text-center">
            <p className="text-xs text-slate-500">
              Ganhe até{' '}
              <span className="text-primary font-black">+30 pontos extras</span>{' '}
              completando todas as ações
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EarnPointsModal;
