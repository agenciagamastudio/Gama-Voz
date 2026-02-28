#!/bin/bash

# Script: Activate audit-safety-squad
# Usage: ./scripts/activate-squad.sh

set -e

SQUAD_NAME="audit-safety-squad"
SQUAD_PATH="./squads/$SQUAD_NAME"

echo "🏗️ Activating $SQUAD_NAME..."

# Check if squad exists
if [ ! -f "$SQUAD_PATH/squad.yaml" ]; then
    echo "❌ Error: squad.yaml not found at $SQUAD_PATH"
    exit 1
fi

echo "✅ Squad manifest found"

# Validate structure
echo "📋 Validating squad structure..."

required_dirs=("agents" "tasks" "workflows" "checklists")
for dir in "${required_dirs[@]}"; do
    if [ ! -d "$SQUAD_PATH/$dir" ]; then
        echo "❌ Error: Missing directory: $dir"
        exit 1
    fi
done

echo "✅ All required directories present"

# Check files
echo "📄 Checking required files..."

required_files=(
    "squad.yaml"
    "README.md"
    "agents/supabase-validator.md"
    "agents/supabase-executor.md"
    "agents/github-committer.md"
    "tasks/pre-flight-supabase-audit.md"
    "tasks/execute-supabase-migration.md"
    "tasks/auto-commit-github.md"
    "workflows/change-request-workflow.yaml"
    "checklists/pre-change-validation.md"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$SQUAD_PATH/$file" ]; then
        echo "❌ Error: Missing file: $file"
        exit 1
    fi
done

echo "✅ All required files present"

# Display squad info
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🏗️  Squad Activated: $SQUAD_NAME"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📍 Location: $SQUAD_PATH"
echo "📋 Agents: 3 (supabase-validator, supabase-executor, github-committer)"
echo "📝 Tasks: 3 (pre-flight-audit, execute-migration, auto-commit)"
echo "🔄 Workflows: 1 (change-request-workflow)"
echo ""
echo "🚀 Quick Commands:"
echo "  - Start validation: *run pre-flight-supabase-audit"
echo "  - Execute migration: *run execute-supabase-migration"
echo "  - Auto-commit: *run auto-commit-github"
echo ""
echo "📖 Full guide: cat $SQUAD_PATH/README.md"
echo ""
