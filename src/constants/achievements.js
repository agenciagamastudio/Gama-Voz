/**
 * Definição de achievements (ações de engajamento)
 * Constante que nunca muda - exportada separadamente
 */
export const ACHIEVEMENTS = {
  COMPLETE_PROFILE: {
    id: 'complete_profile',
    name: 'Completar Perfil',
    points: 5,
    description: 'Preencha seu perfil com nome, avatar e email'
  },
  FIRST_DIAGNOSTIC: {
    id: 'first_diagnostic',
    name: 'Primeiro Diagnóstico',
    points: 5,
    description: 'Complete seu primeiro diagnóstico de valor'
  },
  FIRST_PROPOSAL: {
    id: 'first_proposal',
    name: 'Primeira Proposta',
    points: 5,
    description: 'Crie sua primeira proposta de solução'
  },
  SHARE_PROPOSAL: {
    id: 'share_proposal',
    name: 'Compartilhar Proposta',
    points: 3,
    description: 'Compartilhe uma proposta via WhatsApp ou link'
  },
  FOLLOW_SOCIAL: {
    id: 'follow_social',
    name: 'Seguir Redes Sociais',
    points: 5,
    description: 'Siga as redes sociais da GAMA'
  },
  WHATSAPP_CONTACT: {
    id: 'whatsapp_contact',
    name: 'Enviar WhatsApp',
    points: 5,
    description: 'Envie uma mensagem via WhatsApp'
  }
};
