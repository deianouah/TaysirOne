const fs = require('fs');

const loadJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const saveJson = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');

const en = loadJson('./client/src/lib/translations/en.json');
const fr = loadJson('./client/src/lib/translations/fr.json');
const ar = loadJson('./client/src/lib/translations/ar.json');
const baseLanding = loadJson('./landing_dump.json');

// Helper to deep clone
const clone = (obj) => JSON.parse(JSON.stringify(obj));

// We must start from the complete base structure to avoid breaking React map() calls
en.Landing = clone(baseLanding);
fr.Landing = clone(baseLanding);
ar.Landing = clone(baseLanding);

// Navigation
const setAgencyNav = (obj, dashboard, messages, real_estate, cars, ai_bot, subscription) => {
  obj.agency_nav = { dashboard, messages, real_estate, cars, ai_bot, subscription };
};
setAgencyNav(en, "Dashboard", "Messages (12)", "Real Estate", "Cars", "AI Bot", "Subscription");
setAgencyNav(fr, "Tableau de bord", "Messages (12)", "Immobilier", "Voitures", "Bot IA", "Abonnement");
setAgencyNav(ar, "لوحة التحكم", "الرسائل (12)", "العقارات", "السيارات", "بوت AI", "اشتراك");

// English Translations
en.Landing.header.getstart = "Start for Free";
en.Landing.header.Navlinks = ["Home", "Features", "How it Works", "Login", "Dashboard"];
en.Landing.heroSec.animatedBgGreenText = "✦ For sellers, merchants, and professionals";
en.Landing.heroSec.headline = "Convert your prospects";
en.Landing.heroSec.highlightText = "into opportunities";
en.Landing.heroSec.subHeadline = "Taysir One centralizes your Facebook and WhatsApp messages. Our AI bot answers technical questions and qualifies prospects for you.";
en.Landing.heroSec.startTrialButton = "Start for Free";
en.Landing.heroSec.trustedByText = "Trusted by professionals";

en.Landing.featuresSec.introTagline = "✦ Features";
en.Landing.featuresSec.headlinePre = "No more";
en.Landing.featuresSec.headlineHighlight = "repetitive answers";
en.Landing.featuresSec.subHeadline = "An intelligent system that filters and collects data automatically.";
en.Landing.featuresSec.featureTabs[0].title = "🤖 AI Agent";
en.Landing.featuresSec.featureTabs[0].description = "The smart bot answers with precision about your products and services 24/7.";
en.Landing.featuresSec.featureTabs[1].title = "📞 Number Collection";
en.Landing.featuresSec.featureTabs[1].description = "The AI kindly asks and registers the prospect's number in a structured contact list.";
en.Landing.featuresSec.featureTabs[2].title = "💬 Unified Inbox";
en.Landing.featuresSec.featureTabs[2].description = "Manage WhatsApp, Facebook, and Instagram messages from a single interface.";
en.Landing.featuresSec.featureTabs[3].title = "🛡️ Smart Filtering";
en.Landing.featuresSec.featureTabs[3].description = "The AI distinguishes a serious client from a curious one and ignores useless messages.";
en.Landing.featuresSec.featureTabs[4].title = "📊 Sales Analytics";
en.Landing.featuresSec.featureTabs[4].description = "Discover which products and platforms generate the most interest.";
en.Landing.featuresSec.featureTabs[5].title = "🗓️ Contact Management";
en.Landing.featuresSec.featureTabs[5].description = "The bot organizes your prospects according to their level of interest.";

en.Landing.howItWorksSec.introTagline = "✦ How it works";
en.Landing.howItWorksSec.headlinePre = "From first message";
en.Landing.howItWorksSec.headlineHighlight = "to sale";
en.Landing.howItWorksSec.subHeadline = "";
en.Landing.howItWorksSec.steps[0].title = "1. Add your offers";
en.Landing.howItWorksSec.steps[0].description = "Enter the details of your products or services in your dashboard.";
en.Landing.howItWorksSec.steps[1].title = "2. The Bot takes over";
en.Landing.howItWorksSec.steps[1].description = "When a client asks a question, the AI answers with accuracy.";
en.Landing.howItWorksSec.steps[2].title = "3. Qualification";
en.Landing.howItWorksSec.steps[2].description = "The AI kindly asks for the phone number to plan the next steps.";
en.Landing.howItWorksSec.steps[3].title = "4. Close the deal";
en.Landing.howItWorksSec.steps[3].description = "Access qualified contacts and call them to finalize the agreement.";
en.Landing.howItWorksSec.visualDemo.whatsAppBusinessDashboard = "taysir.one/agency/dashboard";
en.Landing.howItWorksSec.cta.readyToGetStarted = "Ready?";
en.Landing.howItWorksSec.cta.joinText = "";
en.Landing.howItWorksSec.cta.startFreeTrial = "Start";

en.Landing.useCasesSec.introTagline = "✦ Supported Platforms";
en.Landing.useCasesSec.headlinePre = "Serve your customers";
en.Landing.useCasesSec.headlineHighlight = "across platforms";
en.Landing.useCasesSec.subHeadline = "";
en.Landing.useCasesSec.useCases[0].title = "💚 WhatsApp Business";
en.Landing.useCasesSec.useCases[0].description = "The most requested auto-reply in Algeria. Direct connection via Meta API ✅";
en.Landing.useCasesSec.useCases[1].title = "💙 Facebook Messenger";
en.Landing.useCasesSec.useCases[1].description = "Smart reply to agency page messages. Turn visitors into appointments ✅";
en.Landing.useCasesSec.useCases[2].title = "🟣 Instagram DM";
en.Landing.useCasesSec.useCases[2].description = "Perfect for luxury car dealerships. Instant and professional reply ✅";

en.Landing.pricingSec.introTagline = "✦ Pricing";
en.Landing.pricingSec.headlinePre = "Professional plan, at half";
en.Landing.pricingSec.headlineHighlight = "the price of an employee";
en.Landing.pricingSec.subHeadline = "";

en.Landing.testimonialsSec.introTagline = "✦ Success Stories";
en.Landing.testimonialsSec.headlinePre = "Agencies that trust";
en.Landing.testimonialsSec.headlineHighlight = "us";
en.Landing.testimonialsSec.subHeadline = "";
en.Landing.testimonialsSec.testimonials[0].name = "Mounir Q.";
en.Landing.testimonialsSec.testimonials[0].role = "Real Estate Agency";
en.Landing.testimonialsSec.testimonials[0].text = "The platform saved me from answering hundreds of curious people. The bot gives details and only passes serious numbers.";
en.Landing.testimonialsSec.testimonials[1].name = "Redouane M.";
en.Landing.testimonialsSec.testimonials[1].role = "Car Dealership";
en.Landing.testimonialsSec.testimonials[1].text = "Messages never stop. Taysir One aggregates everything, we know exactly who the serious buyer is.";
en.Landing.testimonialsSec.testimonials[2].name = "Hamid S.";
en.Landing.testimonialsSec.testimonials[2].role = "Property Developer";
en.Landing.testimonialsSec.testimonials[2].text = "Incredible ease of use. We connected our page in 5 minutes. Best investment for any agency.";

en.Landing.ctaSec.headline = "Ready to turn inquiries into sales?";
en.Landing.ctaSec.subHeadline = "Register for free and start in minutes. No credit card required.";
en.Landing.ctaSec.buttons.startTrial = "Start for Free";

en.Landing.footerSec.brandSection.description = "Taysir One - The #1 lead management and online sales platform in Algeria.";

// French Translations
fr.Landing.header.getstart = "Commencer gratuitement";
fr.Landing.header.Navlinks = ["Accueil", "Fonctionnalités", "Comment ça marche", "Connexion", "Tableau de bord"];
fr.Landing.heroSec.animatedBgGreenText = "✦ Pour les vendeurs, commerçants et prestataires professionnels";
fr.Landing.heroSec.headline = "Convertissez vos prospects";
fr.Landing.heroSec.highlightText = "en opportunités";
fr.Landing.heroSec.subHeadline = "Taysir One centralise vos messages Facebook et WhatsApp. Notre bot IA répond aux questions techniques et qualifie les prospects à votre place.";
fr.Landing.heroSec.startTrialButton = "Commencer gratuitement";
fr.Landing.heroSec.trustedByText = "Rejoint par des professionnels";

fr.Landing.featuresSec.introTagline = "✦ Fonctionnalités";
fr.Landing.featuresSec.headlinePre = "Fini les";
fr.Landing.featuresSec.headlineHighlight = "réponses répétitives";
fr.Landing.featuresSec.subHeadline = "Un système intelligent qui filtre et collecte les données automatiquement.";
fr.Landing.featuresSec.featureTabs[0].title = "🤖 Agent IA";
fr.Landing.featuresSec.featureTabs[0].description = "Le bot intelligent répond avec précision aux détails de vos produits, services ou offres 24/7.";
fr.Landing.featuresSec.featureTabs[1].title = "📞 Collecte de numéros";
fr.Landing.featuresSec.featureTabs[1].description = "L'IA demande et enregistre le numéro du prospect dans une liste de contacts structurée.";
fr.Landing.featuresSec.featureTabs[2].title = "💬 Boîte de réception unifiée";
fr.Landing.featuresSec.featureTabs[2].description = "Gérez les messages WhatsApp, Facebook et Instagram depuis une seule interface.";
fr.Landing.featuresSec.featureTabs[3].title = "🛡️ Filtrage intelligent";
fr.Landing.featuresSec.featureTabs[3].description = "L'IA distingue un client sérieux d'un simple curieux et ignore les messages inutiles.";
fr.Landing.featuresSec.featureTabs[4].title = "📊 Statistiques des ventes";
fr.Landing.featuresSec.featureTabs[4].description = "Découvrez quels produits et plateformes génèrent le plus d'intérêt.";
fr.Landing.featuresSec.featureTabs[5].title = "🗓️ Gestion des contacts";
fr.Landing.featuresSec.featureTabs[5].description = "Le bot organise vos prospects selon leur degré d'intérêt.";

fr.Landing.howItWorksSec.introTagline = "✦ Comment ça marche";
fr.Landing.howItWorksSec.headlinePre = "Du premier message";
fr.Landing.howItWorksSec.headlineHighlight = "à la vente";
fr.Landing.howItWorksSec.subHeadline = "";
fr.Landing.howItWorksSec.steps[0].title = "1. Ajoutez vos offres";
fr.Landing.howItWorksSec.steps[0].description = "Saisissez les détails de vos produits ou services dans votre tableau de bord.";
fr.Landing.howItWorksSec.steps[1].title = "2. Le Bot prend le relais";
fr.Landing.howItWorksSec.steps[1].description = "Lorsqu'un client pose une question, l'IA répond avec précision.";
fr.Landing.howItWorksSec.steps[2].title = "3. Qualification";
fr.Landing.howItWorksSec.steps[2].description = "L'IA demande gentiment le numéro de téléphone pour planifier la suite de l'échange.";
fr.Landing.howItWorksSec.steps[3].title = "4. Concluez la vente";
fr.Landing.howItWorksSec.steps[3].description = "Accédez aux contacts qualifiés et appelez-les pour finaliser l'accord.";
fr.Landing.howItWorksSec.visualDemo.whatsAppBusinessDashboard = "taysir.one/agency/dashboard";
fr.Landing.howItWorksSec.cta.readyToGetStarted = "Prêt ?";
fr.Landing.howItWorksSec.cta.joinText = "";
fr.Landing.howItWorksSec.cta.startFreeTrial = "Commencer";

fr.Landing.useCasesSec.introTagline = "✦ Plateformes supportées";
fr.Landing.useCasesSec.headlinePre = "Servez vos clients";
fr.Landing.useCasesSec.headlineHighlight = "sur toutes les plateformes";
fr.Landing.useCasesSec.subHeadline = "";
fr.Landing.useCasesSec.useCases[0].title = "💚 WhatsApp Business";
fr.Landing.useCasesSec.useCases[0].description = "La réponse automatique la plus demandée en Algérie. Connexion directe via l'API Meta ✅";
fr.Landing.useCasesSec.useCases[1].title = "💙 Facebook Messenger";
fr.Landing.useCasesSec.useCases[1].description = "Réponse intelligente pour la page de l'agence. Transformez les visiteurs en rendez-vous ✅";
fr.Landing.useCasesSec.useCases[2].title = "🟣 Instagram DM";
fr.Landing.useCasesSec.useCases[2].description = "Idéal pour les concessionnaires de luxe. Réponse instantanée et professionnelle ✅";

fr.Landing.pricingSec.introTagline = "✦ Tarifs";
fr.Landing.pricingSec.headlinePre = "Un plan pro, à moitié";
fr.Landing.pricingSec.headlineHighlight = "prix d'un employé";
fr.Landing.pricingSec.subHeadline = "";

fr.Landing.testimonialsSec.introTagline = "✦ Histoires de succès";
fr.Landing.testimonialsSec.headlinePre = "Les agences";
fr.Landing.testimonialsSec.headlineHighlight = "nous font confiance";
fr.Landing.testimonialsSec.subHeadline = "";
fr.Landing.testimonialsSec.testimonials[0].name = "Mounir Q.";
fr.Landing.testimonialsSec.testimonials[0].role = "Agence Immobilière";
fr.Landing.testimonialsSec.testimonials[0].text = "La plateforme m'a évité de répondre à des centaines de curieux. Le bot donne les détails et ne me passe que les sérieux.";
fr.Landing.testimonialsSec.testimonials[1].name = "Redouane M.";
fr.Landing.testimonialsSec.testimonials[1].role = "Showroom Auto";
fr.Landing.testimonialsSec.testimonials[1].text = "Les messages ne s'arrêtent jamais. Taysir One centralise tout, nous savons exactement qui est le client sérieux.";
fr.Landing.testimonialsSec.testimonials[2].name = "Hamid S.";
fr.Landing.testimonialsSec.testimonials[2].role = "Promoteur Immobilier";
fr.Landing.testimonialsSec.testimonials[2].text = "Simplicité incroyable. Connecté en 5 minutes. Le meilleur investissement pour toute agence.";

fr.Landing.ctaSec.headline = "Prêt à transformer les demandes en ventes?";
fr.Landing.ctaSec.subHeadline = "Inscrivez-vous gratuitement et lancez-vous en quelques minutes. Sans carte bancaire.";
fr.Landing.ctaSec.buttons.startTrial = "Commencer gratuitement";

fr.Landing.footerSec.brandSection.description = "Taysir One - La plateforme n°1 de gestion des leads et ventes en ligne en Algérie.";

// Arabic Translations
ar.Landing.header.getstart = "ابدأ مجاناً";
ar.Landing.header.Navlinks = ["الرئيسية", "المميزات", "كيف نعمل", "تسجيل الدخول", "لوحة التحكم"];
ar.Landing.heroSec.animatedBgGreenText = "✦ للبائعين، التجار، والمهنيين المحترفين";
ar.Landing.heroSec.headline = "حوّل عملائك المحتملين";
ar.Landing.heroSec.highlightText = "إلى فرص مبيعات مؤكدة";
ar.Landing.heroSec.subHeadline = "Taysir One يجمع رسائل فيسبوك وواتساب في مكان واحد. البوت المدعوم بالذكاء الاصطناعي الخاص بنا يجيب على الأسئلة الفنية ويفلتر العملاء الجادين نيابة عنك.";
ar.Landing.heroSec.startTrialButton = "ابدأ مجاناً";
ar.Landing.heroSec.trustedByText = "موثوق من المحترفين";

ar.Landing.featuresSec.introTagline = "✦ المميزات";
ar.Landing.featuresSec.headlinePre = "وداعاً";
ar.Landing.featuresSec.headlineHighlight = "للردود المكررة";
ar.Landing.featuresSec.subHeadline = "نظام ذكي يقوم بفلترة وجمع بيانات المهتمين تلقائياً.";
ar.Landing.featuresSec.featureTabs[0].title = "🤖 وكيل الذكاء الاصطناعي";
ar.Landing.featuresSec.featureTabs[0].description = "البوت الذكي يجيب بدقة على استفسارات العملاء حول منتجاتك، خدماتك أو عروضك 24/7 وبكل دقة.";
ar.Landing.featuresSec.featureTabs[1].title = "📞 جمع الأرقام";
ar.Landing.featuresSec.featureTabs[1].description = "الذكاء الاصطناعي يطلب بلطف ويسجل رقم العميل المحتمل في قائمة اتصال مهيكلة.";
ar.Landing.featuresSec.featureTabs[2].title = "💬 صندوق رسائل موحد";
ar.Landing.featuresSec.featureTabs[2].description = "إدارة رسائل WhatsApp و Facebook و Instagram من واجهة واحدة.";
ar.Landing.featuresSec.featureTabs[3].title = "🛡️ فلترة ذكية";
ar.Landing.featuresSec.featureTabs[3].description = "الذكاء الاصطناعي يميز بين العميل الجاد والمجرد الفضولي، ويتجاهل الرسائل غير المفيدة.";
ar.Landing.featuresSec.featureTabs[4].title = "📊 إحصائيات المبيعات";
ar.Landing.featuresSec.featureTabs[4].description = "اكتشف أي المنتجات والمنصات التي تولد أكبر قدر من الاهتمام والمبيعات.";
ar.Landing.featuresSec.featureTabs[5].title = "🗓️ إدارة جهات الاتصال";
ar.Landing.featuresSec.featureTabs[5].description = "يُنظم البوت العملاء المحتملين تلقائيًا بناءً على مستوى اهتمامهم.";

ar.Landing.howItWorksSec.introTagline = "✦ كيف تعمل المنصة";
ar.Landing.howItWorksSec.headlinePre = "من الرسالة الأولى";
ar.Landing.howItWorksSec.headlineHighlight = "حتى المبيعات المؤكدة";
ar.Landing.howItWorksSec.subHeadline = "";
ar.Landing.howItWorksSec.steps[0].title = "١. أضف عروضك";
ar.Landing.howItWorksSec.steps[0].description = "أدخل تفاصيل منتجاتك أو خدماتك في لوحة التحكم الخاصة بك.";
ar.Landing.howItWorksSec.steps[1].title = "٢. البوت يستلم المهمة";
ar.Landing.howItWorksSec.steps[1].description = "عندما يسأل العميل سؤالاً، يجيب الذكاء الاصطناعي بدقة تامة وبلا توقف.";
ar.Landing.howItWorksSec.steps[2].title = "٣. تقييم العميل";
ar.Landing.howItWorksSec.steps[2].description = "الذكاء الاصطناعي يطلب بلطف رقم الهاتف لتحديد موعد للمرحلة القادمة.";
ar.Landing.howItWorksSec.steps[3].title = "٤. إغلاق الصفقة";
ar.Landing.howItWorksSec.steps[3].description = "تمتع بالوصول إلى جهات الاتصال المؤهلة واتصل بهم لإنهاء الصفقة بنجاح.";
ar.Landing.howItWorksSec.visualDemo.whatsAppBusinessDashboard = "taysir.one/agency/dashboard";
ar.Landing.howItWorksSec.cta.readyToGetStarted = "جاهز؟";
ar.Landing.howItWorksSec.cta.joinText = "";
ar.Landing.howItWorksSec.cta.startFreeTrial = "ابدأ العمل";

ar.Landing.useCasesSec.introTagline = "✦ المنصات المدعومة";
ar.Landing.useCasesSec.headlinePre = "خدمة زبائنك";
ar.Landing.useCasesSec.headlineHighlight = "عبر المنصات";
ar.Landing.useCasesSec.subHeadline = "";
ar.Landing.useCasesSec.useCases[0].title = "💚 واتساب بزنس";
ar.Landing.useCasesSec.useCases[0].description = "الرد الآلي الأكثر طلباً في الجزائر. ربط مباشر عبر Meta API ✅";
ar.Landing.useCasesSec.useCases[1].title = "💙 فيسبوك Messenger";
ar.Landing.useCasesSec.useCases[1].description = "رد ذكي على رسائل صفحة الوكالة. تحويل الزوار إلى مواعيد ✅";
ar.Landing.useCasesSec.useCases[2].title = "🟣 إنستجرام DM";
ar.Landing.useCasesSec.useCases[2].description = "مثالي لمعارض السيارات الفاخرة. رد فوري ومهني ✅";

ar.Landing.pricingSec.introTagline = "✦ الأسعار";
ar.Landing.pricingSec.headlinePre = "باقة احترافية بثمن بخس";
ar.Landing.pricingSec.headlineHighlight = "نصف تكلفة الموظف";
ar.Landing.pricingSec.subHeadline = "";

ar.Landing.testimonialsSec.introTagline = "✦ قصص نجاح";
ar.Landing.testimonialsSec.headlinePre = "وكالات وعملاء";
ar.Landing.testimonialsSec.headlineHighlight = "يثقون بنا دائماً";
ar.Landing.testimonialsSec.subHeadline = "";
ar.Landing.testimonialsSec.testimonials[0].name = "منير .ق";
ar.Landing.testimonialsSec.testimonials[0].role = "وكالة عقارية";
ar.Landing.testimonialsSec.testimonials[0].text = "المنصة وفرت عليّ عناء الرد على مئات الأشخاص الذين يسألون فقط بدافع الفضول. البوت يعطي التفاصيل ولا يعطيني إلا رقم الزبون الجاد.";
ar.Landing.testimonialsSec.testimonials[1].name = "رضوان .م";
ar.Landing.testimonialsSec.testimonials[1].role = "معرض سيارات";
ar.Landing.testimonialsSec.testimonials[1].text = "في معرض السيارات، الرسائل لا تتوقف. Taysir One يجمع لنا كل الطلبات في مكان واحد، ونعرف بالضبط من هو الزبون الجاد من رقم هاتفه.";
ar.Landing.testimonialsSec.testimonials[2].name = "حميد .س";
ar.Landing.testimonialsSec.testimonials[2].role = "مروج عقاري";
ar.Landing.testimonialsSec.testimonials[2].text = "سهولة الاستخدام مذهلة. ربطنا الصفحة في 5 دقائق والبوت بدأ الرد فوراً. أنصح به لأي صاحب وكالة يريد تنظيم عمله.";

ar.Landing.ctaSec.headline = "جاهز لتحويل الاستفسارات إلى مبيعات؟";
ar.Landing.ctaSec.subHeadline = "سجّل مجاناً وابدأ في دقائق، ولا تطلب بطاقة ائتمان.";
ar.Landing.ctaSec.buttons.startTrial = "ابدأ مجاناً";

ar.Landing.footerSec.brandSection.description = "Taysir One المنصة رقم 1 لإدارة المبيعات والعملاء المحتملين في الجزائر.";

saveJson('./client/src/lib/translations/en.json', en);
saveJson('./client/src/lib/translations/fr.json', fr);
saveJson('./client/src/lib/translations/ar.json', ar);
console.log('JSON structure preserved and deeply mapped successfully!');
