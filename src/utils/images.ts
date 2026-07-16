import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

/**
 * Root di `public/`, ancorata a questo modulo.
 * Non `public/...` relativo: quello si risolve sulla CWD del processo, e il
 * build funzionerebbe solo perché Astro gira dalla directory del config.
 */
const PUBLIC_DIR = fileURLToPath(new URL('../../public', import.meta.url));

export interface ImageSize {
  width: number;
  height: number;
}

/**
 * Dimensioni reali di un file di `public/`, lette dal file stesso al build.
 *
 * Esiste perché le larghezze delle immagini di questo sito **non sono
 * conoscibili a mano**: gli originali del blog sono larghi 864, 1169 e 1516, e
 * un numero scritto nel markup sarebbe giusto per uno e falso per gli altri due.
 *
 * Lancia se sharp non deduce le dimensioni: un'immagine di cui non sappiamo la
 * forma non può finire in un `w` o in un `og:image:width` — meglio un build
 * rotto di un `content="undefined"` servito a ogni scraper.
 */
export async function measuredSize(publicPath: string): Promise<ImageSize> {
  const { width, height } = await sharp(join(PUBLIC_DIR, publicPath)).metadata();
  if (!width || !height) {
    throw new Error(`Dimensioni non leggibili da ${publicPath}`);
  }
  return { width, height };
}
