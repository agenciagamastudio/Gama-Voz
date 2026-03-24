import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  try {
    const brandConfigPath = join(process.cwd(), 'brand-configs', 'index.json')
    const indexData = JSON.parse(readFileSync(brandConfigPath, 'utf-8'))

    // Carregar dados completos de cada brand
    const brandsWithData = await Promise.all(
      indexData.brands.map(async (brand: any) => {
        try {
          const brandJsonPath = join(process.cwd(), 'brand-configs', brand.id, 'brand.json')
          const brandData = JSON.parse(readFileSync(brandJsonPath, 'utf-8'))
          return { ...brandData, ...brand }
        } catch (error) {
          console.error(`Erro carregando brand ${brand.id}:`, error)
          return brand
        }
      })
    )

    return Response.json({
      brands: brandsWithData.sort((a, b) => a.order - b.order),
      total: brandsWithData.length,
    })
  } catch (error) {
    console.error('Erro carregando brands:', error)
    return Response.json({ error: 'Erro carregando brands' }, { status: 500 })
  }
}
