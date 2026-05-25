import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images');

async function processDirectory(dir) {
    const files = await fs.promises.readdir(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.promises.stat(filePath);

        if (stat.isDirectory()) {
            await processDirectory(filePath);
        } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
            try {
                // Read into buffer
                const buffer = await fs.promises.readFile(filePath);
                
                // Process with sharp (strips metadata by default)
                const optimizedBuffer = await sharp(buffer)
                    .toBuffer();
                
                // Overwrite original
                await fs.promises.writeFile(filePath, optimizedBuffer);
                console.log(`Optimized: ${filePath}`);
            } catch (err) {
                console.error(`Failed to process ${filePath}:`, err.message);
            }
        }
    }
}

console.log('Starting metadata stripping...');
processDirectory(imagesDir)
    .then(() => console.log('Finished processing all images!'))
    .catch(console.error);
