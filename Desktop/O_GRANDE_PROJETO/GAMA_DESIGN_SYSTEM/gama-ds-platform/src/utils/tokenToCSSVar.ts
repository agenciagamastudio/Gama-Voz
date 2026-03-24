/**
 * Converte um nome de token para um nome de CSS variable válido
 * Exemplo: "primary" → "--color-primary"
 *          "text_secondary" → "--color-text-secondary"
 */
export function tokenToCSSVarName(token: string, category: string): string {
  // Converter underscores para hífens (padrão CSS)
  const normalized = token.replace(/_/g, '-')
  return `--${category}-${normalized}`
}

/**
 * Aplica todos os tokens de um brand como CSS variables no documento
 */
export function applyBrandTokensToCSSVars(tokens: Record<string, any>) {
  const root = document.documentElement

  // Cores
  if (tokens.colors) {
    Object.entries(tokens.colors).forEach(([key, value]) => {
      const varName = tokenToCSSVarName(key, 'color')
      root.style.setProperty(varName, value as string)
    })
  }

  // Typography - Fonts
  if (tokens.typography?.font_primary) {
    root.style.setProperty('--font-primary', tokens.typography.font_primary)
  }
  if (tokens.typography?.font_code) {
    root.style.setProperty('--font-code', tokens.typography.font_code)
  }

  // Spacing
  if (tokens.spacing) {
    Object.entries(tokens.spacing).forEach(([key, value]) => {
      const varName = tokenToCSSVarName(key, 'spacing')
      root.style.setProperty(varName, value as string)
    })
  }

  // Radius
  if (tokens.radius) {
    Object.entries(tokens.radius).forEach(([key, value]) => {
      const varName = tokenToCSSVarName(key, 'radius')
      root.style.setProperty(varName, value as string)
    })
  }

  // Shadows
  if (tokens.shadows) {
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      const varName = tokenToCSSVarName(key, 'shadow')
      root.style.setProperty(varName, value as string)
    })
  }

  // Animation
  if (tokens.animation) {
    Object.entries(tokens.animation).forEach(([key, value]) => {
      const varName = tokenToCSSVarName(key, 'animation')
      root.style.setProperty(varName, value as string)
    })
  }
}
