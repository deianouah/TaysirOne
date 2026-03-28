
import { db } from './server/db.ts';
import { platformLanguages } from './shared/schema.ts';
import { eq } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';

async function sync() {
  try {
    const codes = ['en', 'fr', 'ar'];
    for (const code of codes) {
      const filePath = path.join(process.cwd(), 'client', 'src', 'lib', 'translations', `${code}.json`);
      if (fs.existsSync(filePath)) {
        const translations = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        // Find if language exists in DB
        const existing = await db.select().from(platformLanguages).where(eq(platformLanguages.code, code));
        
        if (existing.length > 0) {
          // Merge with existing translations to avoid losing other keys
          const updatedTranslations = { ...existing[0].translations as any, ...translations };
          
          await db.update(platformLanguages)
            .set({ 
              translations: updatedTranslations,
              updatedAt: new Date()
            })
            .where(eq(platformLanguages.code, code));
          
          console.log(`Successfully synced ${code} translations to database`);
        } else {
          console.log(`Language ${code} NOT found in database, skipping update`);
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
  process.exit(0);
}

sync();
