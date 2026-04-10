import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const tokensPath = join(process.cwd(), 'brand-configs', id, 'tokens.json')
    const tokens = JSON.parse(readFileSync(tokensPath, 'utf-8'))
    return Response.json(tokens)
  } catch (error) {
    console.error(`Erro carregando tokens para ${id}:`, error)
    return Response.json({ error: `Tokens para ${id} não encontrados` }, { status: 404 })
  }
}
