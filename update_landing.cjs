const fs = require('fs');
const path = './client/src/lib/translations/en.json';

const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Update Header
data.Landing.header.getstart = "Commencer gratuitement";
data.Landing.header.Navlinks = ["Accueil", "Fonctionnalités", "Comment ça marche", "Connexion", "Tableau de bord"];

// Update Hero
data.Landing.heroSec.animatedBgGreenText = "✦ Pour les vendeurs, commerçants et prestataires professionnels";
data.Landing.heroSec.headline = "Convertissez vos prospects";
data.Landing.heroSec.highlightText = "en opportunités";
data.Landing.heroSec.subHeadline = "Taysir One centralise vos messages Facebook et WhatsApp. Notre bot IA répond aux questions techniques et qualifie les prospects à votre place.";
data.Landing.heroSec.startTrialButton = "Commencer gratuitement";
data.Landing.heroSec.stats = [
  { label: "Professionnels & Pros", suffix: "+" },
  { label: "Leads / Mois", suffix: "+" },
  { label: "Précision de l'IA", suffix: "%" }
];

// Update Features
data.Landing.featuresSec.introTagline = "✦ Fonctionnalités";
data.Landing.featuresSec.headlinePre = "Fini les";
data.Landing.featuresSec.headlineHighlight = "réponses répétitives";
data.Landing.featuresSec.subHeadline = "Un système intelligent qui filtre et collecte les données automatiquement.";
if(data.Landing.featuresSec.featureTabs && data.Landing.featuresSec.featureTabs.length >= 6) {
  data.Landing.featuresSec.featureTabs[0].title = "🤖 Agent IA";
  data.Landing.featuresSec.featureTabs[0].description = "Le bot intelligent répond avec précision aux détails de vos produits, services ou offres 24/7.";
  data.Landing.featuresSec.featureTabs[1].title = "📞 Collecte de numéros";
  data.Landing.featuresSec.featureTabs[1].description = "L'IA demande et enregistre le numéro du prospect dans une liste de contacts structurée.";
  data.Landing.featuresSec.featureTabs[2].title = "💬 Boîte de réception unifiée";
  data.Landing.featuresSec.featureTabs[2].description = "Gérez les messages WhatsApp, Facebook et Instagram depuis une seule interface.";
  data.Landing.featuresSec.featureTabs[3].title = "🛡️ Filtrage intelligent";
  data.Landing.featuresSec.featureTabs[3].description = "L'IA distingue un client sérieux d'un simple curieux et ignore les messages inutiles.";
  data.Landing.featuresSec.featureTabs[4].title = "📊 Statistiques des ventes";
  data.Landing.featuresSec.featureTabs[4].description = "Découvrez quels produits et plateformes génèrent le plus d'intérêt.";
  data.Landing.featuresSec.featureTabs[5].title = "🗓️ Gestion des contacts";
  data.Landing.featuresSec.featureTabs[5].description = "Le bot organise vos prospects selon leur degré d'intérêt.";
}

// Update How It Works
data.Landing.howItWorksSec.introTagline = "✦ Comment ça marche";
data.Landing.howItWorksSec.headlinePre = "Du premier message";
data.Landing.howItWorksSec.headlineHighlight = "à la vente";
data.Landing.howItWorksSec.subHeadline = "";
if(data.Landing.howItWorksSec.steps && data.Landing.howItWorksSec.steps.length >= 4) {
  data.Landing.howItWorksSec.steps[0].title = "1. Ajoutez vos offres";
  data.Landing.howItWorksSec.steps[0].description = "Saisissez les détails de vos produits ou services dans votre tableau de bord.";
  data.Landing.howItWorksSec.steps[1].title = "2. Le Bot prend le relais";
  data.Landing.howItWorksSec.steps[1].description = "Lorsqu'un client pose une question, l'IA répond avec précision.";
  data.Landing.howItWorksSec.steps[2].title = "3. Qualification";
  data.Landing.howItWorksSec.steps[2].description = "L'IA demande gentiment le numéro de téléphone pour planifier la suite de l'échange.";
  data.Landing.howItWorksSec.steps[3].title = "4. Concluez la vente";
  data.Landing.howItWorksSec.steps[3].description = "Accédez aux contacts qualifiés et appelez-les pour finaliser l'accord.";
}
data.Landing.howItWorksSec.visualDemo.whatsAppBusinessDashboard = "taysir.one/agency/dashboard";

// Update Use Cases (Supported Platforms)
data.Landing.useCasesSec.introTagline = "✦ المنصات المدعومة";
data.Landing.useCasesSec.headlinePre = "خدمة زبائنك";
data.Landing.useCasesSec.headlineHighlight = "عبر المنصات";
data.Landing.useCasesSec.subHeadline = "";
if(data.Landing.useCasesSec.useCases && data.Landing.useCasesSec.useCases.length >= 3) {
  data.Landing.useCasesSec.useCases[0].title = "💚 واتساب بزنس";
  data.Landing.useCasesSec.useCases[0].description = "الرد الآلي الأكثر طلباً في الجزائر. ربط مباشر عبر Meta API ✅";
  data.Landing.useCasesSec.useCases[1].title = "💙 فيسبوك Messenger";
  data.Landing.useCasesSec.useCases[1].description = "رد ذكي على رسائل صفحة الوكالة. تحويل الزوار إلى مواعيد ✅";
  data.Landing.useCasesSec.useCases[2].title = "🟣 إنستجرام DM";
  data.Landing.useCasesSec.useCases[2].description = "مثالي لمعارض السيارات الفاخرة. رد فوري ومهني ✅";
}

// Update Pricing
data.Landing.pricingSec.introTagline = "✦ الأسعار";
data.Landing.pricingSec.headlinePre = "باقة احترافية، بنصف";
data.Landing.pricingSec.headlineHighlight = "سعر موظف";
data.Landing.pricingSec.subHeadline = "";

// Update Testimonials
data.Landing.testimonialsSec.introTagline = "✦ قصص نجاح";
data.Landing.testimonialsSec.headlinePre = "وكالات تثق";
data.Landing.testimonialsSec.headlineHighlight = "بنا";
data.Landing.testimonialsSec.subHeadline = "";
if(data.Landing.testimonialsSec.testimonials && data.Landing.testimonialsSec.testimonials.length >= 3) {
  data.Landing.testimonialsSec.testimonials[0].name = "منير .ق";
  data.Landing.testimonialsSec.testimonials[0].role = "وكالة عقارية · القبة";
  data.Landing.testimonialsSec.testimonials[0].text = "المنصة وفرت عليّ عناء الرد على مئات الأشخاص الذين يسألون فقط بدافع الفضول. البوت يعطي التفاصيل ولا يعطيني إلا رقم الزبون الجاد.";
  data.Landing.testimonialsSec.testimonials[0].results = "🏠";
  
  data.Landing.testimonialsSec.testimonials[1].name = "رضوان .م";
  data.Landing.testimonialsSec.testimonials[1].role = "معرض سيارات · سطيف";
  data.Landing.testimonialsSec.testimonials[1].text = "في معرض السيارات، الرسائل لا تتوقف. Taysir One يجمع لنا كل الطلبات في مكان واحد، ونعرف بالضبط من هو الزبون الجاد من رقم هاتفه.";
  data.Landing.testimonialsSec.testimonials[1].results = "🚗";
  
  data.Landing.testimonialsSec.testimonials[2].name = "حميد .س";
  data.Landing.testimonialsSec.testimonials[2].role = "مروج عقاري · بجاية";
  data.Landing.testimonialsSec.testimonials[2].text = "سهولة الاستخدام مذهلة. ربطنا الصفحة في 5 دقائق والبوت بدأ الرد فوراً. أنصح به لأي صاحب وكالة يريد تنظيم عمله.";
  data.Landing.testimonialsSec.testimonials[2].results = "🏢";
}

// Update CTA
data.Landing.ctaSec.headline = "جاهز لتحويل الاستفسارات إلى مبيعات؟";
data.Landing.ctaSec.subHeadline = "سجّل مجاناً وابدأ في دقائق. لا بطاقة بنكية مطلوبة.";
data.Landing.ctaSec.buttons.startTrial = "Commencer gratuitement";

// Update Footer
data.Landing.footerSec.brandSection.description = "Taysir One - La plateforme n°1 de gestion des leads et ventes en ligne en Algérie.";

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Translations updated successfully');
