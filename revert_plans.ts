
import { db } from './server/db.ts';
import { plans } from './shared/schema.ts';
import { eq } from 'drizzle-orm';

async function revert() {
  try {
    await db.update(plans).set({
      name: 'Starter',
      description: 'Découvrez la puissance du bot. Idéal pour tester la plateforme.',
      badge: 'Gratuit',
      features: [
        { name: '1 WhatsApp Channel', included: true },
        { name: 'Up to 500 Contacts', included: true },
        { name: '1 Automation Workflow', included: true },
        { name: 'Basic Analytics', included: true },
        { name: 'Template Management', included: true },
        { name: '1,000 API Requests/month', included: true },
        { name: 'Community Support', included: true },
        { name: 'AI Auto-Reply', included: false },
        { name: 'Team Members', included: false },
        { name: 'Priority Support', included: false }
      ]
    }).where(eq(plans.name, 'الباقة المبتدئة'));

    await db.update(plans).set({
      name: 'Pro',
      description: 'Le plan complet pour les activités sérieuses. WhatsApp + Facebook + Instagram.',
      badge: 'Le plus populaire ⭐',
      features: [
        { name: '3 WhatsApp Channels', included: true },
        { name: 'Up to 5,000 Contacts', included: true },
        { name: '10 Automation Workflows', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'Template Management', included: true },
        { name: '50,000 API Requests/month', included: true },
        { name: 'AI Auto-Reply', included: true },
        { name: 'Up to 5 Team Members', included: true },
        { name: 'Campaign Scheduling', included: true },
        { name: 'VIP Dedicated Support', included: true }
      ]
    }).where(eq(plans.name, 'الباقة الاحترافية'));

    await db.update(plans).set({
      name: 'Elite',
      description: 'Pour les groupes et entreprises multi-établissements. Accès illimité avec support premium.',
      badge: 'Elite Business 👑',
      features: [
        { name: 'Unlimited WhatsApp Channels', included: true },
        { name: 'Unlimited Contacts', included: true },
        { name: 'Unlimited Automations', included: true },
        { name: 'Advanced Analytics & Reports', included: true },
        { name: 'Template Management', included: true },
        { name: 'Unlimited API Requests', included: true },
        { name: 'AI Auto-Reply + Knowledge Base', included: true },
        { name: 'Unlimited Team Members', included: true },
        { name: 'Campaign Scheduling', included: true },
        { name: 'Priority VIP Support + Training', included: true }
      ]
    }).where(eq(plans.name, 'باقة النخبة'));

    console.log('Successfully reverted plans data');
  } catch (e) {
    console.error(e);
  }
  process.exit(0);
}

revert();
