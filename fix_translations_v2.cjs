const fs = require('fs');

const loadJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const saveJson = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');

const en = loadJson('./client/src/lib/translations/en.json');
const fr = loadJson('./client/src/lib/translations/fr.json');
const ar = loadJson('./client/src/lib/translations/ar.json');

// --- 1. SET NAVIGATION ITEMS ---
const navEn = {
  "dashboard": "Dashboard",
  "messages": "Messages (12)",
  "real_estate": "Real Estate",
  "cars": "Cars",
  "ai_bot": "AI Bot",
  "subscription": "Subscription"
};
const navFr = {
  "dashboard": "Tableau de bord",
  "messages": "Messages (12)",
  "real_estate": "Immobilier",
  "cars": "Voitures",
  "ai_bot": "Bot IA",
  "subscription": "Abonnement"
};
const navAr = {
  "dashboard": "لوحة التحكم",
  "messages": "الرسائل (12)",
  "real_estate": "العقارات",
  "cars": "السيارات",
  "ai_bot": "بوت AI",
  "subscription": "اشتراك"
};

en.agency_nav = navEn;
fr.agency_nav = navFr;
ar.agency_nav = navAr;

// --- 2. TRANSLATE LANDING TO ENGLISH ---
en.Landing = en.Landing || {};
en.Landing.header = {
  "getstart": "Start for Free",
  "Navlinks": ["Home", "Features", "How it Works", "Login", "Dashboard"]
};
en.Landing.heroSec = {
  "animatedBgGreenText": "✦ For sellers, merchants, and professionals",
  "headline": "Convert your prospects",
  "highlightText": "into opportunities",
  "subHeadline": "Taysir One centralizes your Facebook and WhatsApp messages. Our AI bot answers technical questions and qualifies prospects for you.",
  "startTrialButton": "Start for Free",
  "trustedByText": "Trusted by professionals",
  "stats": [
    { "label": "Professionals & Pros", "suffix": "+" },
    { "label": "Leads / Month", "suffix": "+" },
    { "label": "AI Accuracy", "suffix": "%" }
  ]
};
en.Landing.featuresSec = {
  "introTagline": "✦ Features",
  "headlinePre": "No more",
  "headlineHighlight": "repetitive answers",
  "subHeadline": "An intelligent system that filters and collects data automatically.",
  "featureTabs": [
    { "title": "🤖 AI Agent", "description": "The smart bot answers with precision about your products and services 24/7." },
    { "title": "📞 Number Collection", "description": "The AI kindly asks and registers the prospect's number in a structured contact list." },
    { "title": "💬 Unified Inbox", "description": "Manage WhatsApp, Facebook, and Instagram messages from a single interface." },
    { "title": "🛡️ Smart Filtering", "description": "The AI distinguishes a serious client from a curious one and ignores useless messages." },
    { "title": "📊 Sales Analytics", "description": "Discover which products and platforms generate the most interest." },
    { "title": "🗓️ Contact Management", "description": "The bot organizes your prospects according to their level of interest." }
  ]
};
en.Landing.howItWorksSec = {
  "introTagline": "✦ How it works",
  "headlinePre": "From first message",
  "headlineHighlight": "to sale",
  "subHeadline": "",
  "steps": [
    { "title": "1. Add your offers", "description": "Enter the details of your products or services in your dashboard." },
    { "title": "2. The Bot takes over", "description": "When a client asks a question, the AI answers with accuracy." },
    { "title": "3. Qualification", "description": "The AI kindly asks for the phone number to plan the next steps." },
    { "title": "4. Close the deal", "description": "Access qualified contacts and call them to finalize the agreement." }
  ],
  "visualDemo": { "whatsAppBusinessDashboard": "taysir.one/agency/dashboard" },
  "cta": { "readyToGetStarted": "Ready?", "joinText": "", "startFreeTrial": "Start" }
};
en.Landing.useCasesSec = {
  "introTagline": "✦ Supported Platforms",
  "headlinePre": "Serve your customers",
  "headlineHighlight": "across platforms",
  "subHeadline": "",
  "useCases": [
    { "title": "💚 WhatsApp Business", "description": "The most requested auto-reply in Algeria. Direct connection via Meta API ✅" },
    { "title": "💙 Facebook Messenger", "description": "Smart reply to agency page messages. Turn visitors into appointments ✅" },
    { "title": "🟣 Instagram DM", "description": "Perfect for luxury car dealerships. Instant and professional reply ✅" }
  ]
};
en.Landing.pricingSec = {
  "introTagline": "✦ Pricing",
  "headlinePre": "Professional plan, at half",
  "headlineHighlight": "the price of an employee",
  "subHeadline": ""
};
en.Landing.testimonialsSec = {
  "introTagline": "✦ Success Stories",
  "headlinePre": "Agencies that trust",
  "headlineHighlight": "us",
  "subHeadline": "",
  "testimonials": [
    { "name": "Mounir Q.", "role": "Real Estate Agency", "text": "The platform saved me from answering hundreds of curious people. The bot gives details and only passes serious numbers." },
    { "name": "Redouane M.", "role": "Car Dealership", "text": "Messages never stop. Taysir One aggregates everything, we know exactly who the serious buyer is." },
    { "name": "Hamid S.", "role": "Property Developer", "text": "Incredible ease of use. We connected our page in 5 minutes. Best investment for any agency." }
  ]
};
en.Landing.ctaSec = {
  "headline": "Ready to turn inquiries into sales?",
  "subHeadline": "Register for free and start in minutes. No credit card required.",
  "buttons": { "startTrial": "Start for Free" }
};
en.Landing.footerSec = {
  "brandSection": { "description": "Taysir One - The #1 lead management and online sales platform in Algeria." }
};

saveJson('./client/src/lib/translations/en.json', en);
saveJson('./client/src/lib/translations/fr.json', fr);
saveJson('./client/src/lib/translations/ar.json', ar);
console.log('Translations completely mapped for EN, FR, AR');
