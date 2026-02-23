#!/usr/bin/env node
/* eslint-disable no-undef */

/**
 * Script para criar ícones PNG a partir do SVG favicon
 * Requer: npm install sharp
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const svgPath = path.join(__dirname, 'public', 'favicon.svg');
const publicDir = path.join(__dirname, 'public');

const sizes = [
  { size: 192, name: 'icon-192.png' },
  { size: 192, name: 'icon-192-maskable.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 512, name: 'icon-512-maskable.png' },
  { size: 180, name: 'apple-touch-icon.png' }
];

async function createIcons() {
  console.log('📦 Criando ícones PNG a partir do SVG...');

  try {
    const svg = fs.readFileSync(svgPath);

    for (const { size, name } of sizes) {
      const outputPath = path.join(publicDir, name);
      await sharp(svg)
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ ${name} (${size}x${size}) criado`);
    }

    console.log('\n✨ Todos os ícones foram criados com sucesso!');
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('❌ sharp não está instalado. Instalando...');
      console.error('Execute: npm install sharp');
      process.exit(1);
    }
    throw error;
  }
}

createIcons().catch(error => {
  console.error('❌ Erro ao criar ícones:', error.message);
  process.exit(1);
});
