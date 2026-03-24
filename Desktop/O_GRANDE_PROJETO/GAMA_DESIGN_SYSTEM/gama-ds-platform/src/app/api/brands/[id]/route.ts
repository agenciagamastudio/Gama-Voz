import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const brandJsonPath = join(process.cwd(), 'brand-configs', id, 'brand.json')
    const brandData = JSON.parse(readFileSync(brandJsonPath, 'utf-8'))
    return Response.json(brandData)
  } catch (error) {
    console.error(`Erro carregando brand ${id}:`, error)
    return Response.json({ error: `Brand ${id} não encontrado` }, { status: 404 })
  }
}
