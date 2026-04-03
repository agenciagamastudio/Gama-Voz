#!/bin/bash

echo "🔧 GAMA Calculadora — Setup ADMIN Account"
echo "=========================================="
echo ""
echo "Preciso das credenciais Supabase para continuar."
echo ""
echo "Digite suas credenciais:"
echo ""

read -p "🔗 VITE_SUPABASE_URL (ex: https://xxx.supabase.co): " SUPABASE_URL
read -p "🔐 VITE_SUPABASE_ANON_KEY: " SUPABASE_ANON_KEY

# Validar
if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON_KEY" ]; then
  echo "❌ Credenciais incompletas!"
  exit 1
fi

echo ""
echo "✅ Credenciais recebidas"
echo ""
echo "Próximos passos:"
echo "1. Push da migration de cleanup"
echo "2. Criar usuário ADMIN"
echo ""

# Extrair projeto ID da URL
PROJECT_ID=$(echo $SUPABASE_URL | sed 's|https://||' | sed 's|.supabase.co||')

echo "📊 Projeto ID: $PROJECT_ID"
echo ""
echo "Via Supabase CLI:"
echo "  supabase db push"
echo ""
echo "Via cURL (criar ADMIN):"
echo "  curl -X POST https://${PROJECT_ID}.supabase.co/auth/v1/admin/users \\"
echo "    -H 'Content-Type: application/json' \\"
echo "    -H 'Authorization: Bearer [ADMIN_TOKEN]' \\"
echo "    -d '{ \"email\": \"prontoatendimentogama@gmail.com\", \"password\": \"81844695\", \"email_confirm\": true }'"
echo ""

