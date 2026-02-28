import React, { useState } from 'react';
import { useAchievements } from '../hooks/useAchievements';

/**
 * Modal "Ganhe Pontos" - mostra ações de engajamento disponíveis
 * Aparece APENAS após usuário completar perfil
 */
export const EarnPointsModal = ({ isOpen, onClose, profileComplete }) => {
  const { getAchievementsList, completeAchievement, getTotalEarnedPoints } =
    useAchievements();
  const [loadingAction, setLoadingAction] = useState(null);

  if (!isOpen || !profileComplete) return null;

  const achievements = getAchievementsList();
  const totalEarned = getTotalEarnedPoints();

  const handleActionClick = async (achievementId) => {
    if (loadingAction === achievementId) return;

    setLoadingAction(achievementId);
    await completeAchievement(achievementId);
    setLoadingAction(null);
  };

  const handleInstagramClick = (username) => {
    window.open(`https://www.instagram.com/${username}`, '_blank');
    // Disparar achievement após visitar
    handleActionClick('follow_social');
  };

  const handleWhatsAppClick = (userName) => {
    const message = `Olá! 👋 Sou usuário da GAMA Calculadora e gostei muito. Recomendo! 🚀`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/5575983129198?text=${encodedMessage}`,
      '_blank'
    );
    // Disparar achievement após enviar
    handleActionClick('whatsapp_contact');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all">
        <div className="bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-b from-[#0a0a0a] to-transparent p-6 border-b border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  Ganhe Pontos Extras
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                  Complete ações para desbloquear mais energia
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-all text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Progress */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-bold text-slate-500 uppercase">
                  Progresso
                </p>
                <p className="text-sm font-black text-primary">
                  +{totalEarned} pontos conquistados
                </p>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary via-primary to-yellow-400 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(totalEarned / 30) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`relative p-5 rounded-2xl border transition-all ${
                  achievement.completed
                    ? 'bg-primary/10 border-primary/30'
                    : 'bg-card-bg border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-black text-white uppercase">
                        {achievement.name}
                      </h3>
                      {achievement.completed && (
                        <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-[10px] font-black rounded-full uppercase">
                          ✓ Concluído
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mb-3">
                      {achievement.description}
                    </p>
                  </div>

                  {/* Right: Points + CTA */}
                  <div className="text-right flex flex-col items-end gap-3">
                    <div className="text-right">
                      <p className="text-xs text-slate-500 uppercase">Ganhe</p>
                      <p className="text-xl font-black text-primary">
                        +{achievement.points}
                      </p>
                    </div>

                    {/* Action Button */}
                    {!achievement.completed && (
                      <>
                        {achievement.id === 'complete_profile' && (
                          <p className="text-xs text-slate-500">
                            Concluído automaticamente
                          </p>
                        )}

                        {achievement.id === 'first_diagnostic' && (
                          <p className="text-xs text-slate-500">
                            Ao fazer diagnóstico
                          </p>
                        )}

                        {achievement.id === 'first_proposal' && (
                          <p className="text-xs text-slate-500">
                            Ao criar proposta
                          </p>
                        )}

                        {achievement.id === 'share_proposal' && (
                          <p className="text-xs text-slate-500">
                            Ao compartilhar
                          </p>
                        )}

                        {achievement.id === 'follow_social' && (
                          <div className="flex gap-2 flex-wrap justify-end">
                            <button
                              onClick={() =>
                                handleInstagramClick(
                                  'agencia.gamastudio'
                                )
                              }
                              disabled={loadingAction === achievement.id}
                              className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-black rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50"
                            >
                              @agencia.gamastudio
                            </button>
                            <button
                              onClick={() =>
                                handleInstagramClick(
                                  'matheusqueiroz.fotografo'
                                )
                              }
                              disabled={loadingAction === achievement.id}
                              className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-black rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50"
                            >
                              @matheusqueiroz.fotografo
                            </button>
                            <button
                              onClick={() =>
                                handleInstagramClick(
                                  'gracaqueiroz._'
                                )
                              }
                              disabled={loadingAction === achievement.id}
                              className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-black rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50"
                            >
                              @gracaqueiroz._
                            </button>
                          </div>
                        )}

                        {achievement.id === 'whatsapp_contact' && (
                          <button
                            onClick={() =>
                              handleWhatsAppClick(
                                'Você'
                              )
                            }
                            disabled={loadingAction === achievement.id}
                            className="px-4 py-2 bg-green-600 text-white text-xs font-black rounded-lg hover:bg-green-700 transition-all disabled:opacity-50"
                          >
                            {loadingAction === achievement.id ? (
                              <>
                                <span className="inline-block animate-spin mr-2">
                                  ⟳
                                </span>
                                Processando...
                              </>
                            ) : (
                              'Enviar WhatsApp'
                            )}
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gradient-to-t from-[#0a0a0a] to-transparent p-6 border-t border-white/5">
            <p className="text-xs text-slate-500 text-center mb-4">
              💡 Dica: Ganhe até{' '}
              <span className="text-primary font-black">+30 pontos</span> extras
              completando todas as ações
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold uppercase text-xs tracking-wider rounded-xl hover:bg-white/10 transition-all"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EarnPointsModal;
