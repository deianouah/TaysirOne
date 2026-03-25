const fs = require('fs');

const originalEn = JSON.parse(fs.readFileSync('./client/src/lib/translations/en.json', 'utf8'));
const landingDump = JSON.parse(fs.readFileSync('./landing_dump.json', 'utf8'));
const myCustomLanding = originalEn.Landing; // The one I just made

// Restore EN
originalEn.Landing = landingDump;
fs.writeFileSync('./client/src/lib/translations/en.json', JSON.stringify(originalEn, null, 2), 'utf8');

// Update FR with the Custom Landing
const fr = JSON.parse(fs.readFileSync('./client/src/lib/translations/fr.json', 'utf8'));
fr.Landing = myCustomLanding;
// Translate header to French
fr.header = fr.header || {};
fr.header.getstart = "Commencer gratuitement";
fs.writeFileSync('./client/src/lib/translations/fr.json', JSON.stringify(fr, null, 2), 'utf8');

// Update AR with the Custom Landing
const ar = JSON.parse(fs.readFileSync('./client/src/lib/translations/ar.json', 'utf8'));
ar.Landing = myCustomLanding;
ar.header = ar.header || {};
ar.header.getstart = "ابدأ مجاناً";
fs.writeFileSync('./client/src/lib/translations/ar.json', JSON.stringify(ar, null, 2), 'utf8');

console.log('Restored en.json, updated fr.json and ar.json');
