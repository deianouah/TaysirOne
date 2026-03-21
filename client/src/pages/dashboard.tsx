/**
 * ============================================================
 * © 2025 Diploy — a brand of Bisht Technologies Private Limited
 * Original Author: BTPL Engineering Team
 * Website: https://diploy.in
 * Contact: cs@diploy.in
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */

import { useMemo, useState } from "react";
import { Link } from "wouter";
import { DollarSign, Package, Percent, Users } from "lucide-react";

type LeadStatus = "new" | "appointment" | "sale";

interface LeadRow {
  id: number;
  name: string;
  state: string;
  status: LeadStatus;
  price: number;
}

const SAMPLE_LEADS: LeadRow[] = [
  {
    id: 1,
    name: "Rami Khaled",
    state: "Alger",
    status: "new",
    price: 25000,
  },
  {
    id: 2,
    name: "Yasmine Ben",
    state: "Oran",
    status: "appointment",
    price: 42000,
  },
  {
    id: 3,
    name: "Sami Haddad",
    state: "Constantine",
    status: "sale",
    price: 78000,
  },
  {
    id: 4,
    name: "Leila Souissi",
    state: "Annaba",
    status: "new",
    price: 16000,
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "DZD",
    maximumFractionDigits: 0,
  }).format(value);
}

function StatsCard({
  title,
  value,
  delta,
  icon,
  lightColor = "bg-indigo-50",
  darkColor = "text-indigo-600",
}: {
  title: string;
  value: string;
  delta?: string;
  icon: React.ReactNode;
  lightColor?: string;
  darkColor?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${lightColor}`}
        >
          <div className={`h-6 w-6 ${darkColor}`}>{icon}</div>
        </div>
      </div>
      {delta ? (
        <p className="mt-3 text-sm font-medium text-green-600">{delta}</p>
      ) : null}
    </div>
  );
}

function StatusPill({
  label,
  count,
  bg,
  icon,
}: {
  label: string;
  count: number;
  bg: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-xl ${bg} flex items-center justify-center`}>{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-700">{label}</p>
          <p className="text-2xl font-semibold text-gray-900">{count}</p>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | LeadStatus>("all");

  const leads = useMemo(() => SAMPLE_LEADS, []);

  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) =>
        search
          ? lead.name.toLowerCase().includes(search.toLowerCase()) ||
            lead.state.toLowerCase().includes(search.toLowerCase())
          : true
      )
      .filter((lead) => (statusFilter === "all" ? true : lead.status === statusFilter));
  }, [leads, search, statusFilter]);

  const stats = useMemo(() => {
    const totalLeads = leads.length;
    const productsActifs = 0;
    const potentialSales = leads.reduce((sum, lead) => sum + lead.price, 0);
    const conversionRate = totalLeads > 0 ? 0 : 0;
    return {
      totalLeads,
      productsActifs,
      potentialSales,
      conversionRate,
    };
  }, [leads]);

  const statusCounts = useMemo(() => {
    const counts = { new: 0, appointment: 0, sale: 0 };
    leads.forEach((lead) => {
      counts[lead.status] += 1;
    });
    return counts;
  }, [leads]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord</h1>
            <p className="mt-1 text-sm text-gray-600">
              Bienvenue dans votre espace de gestion. كل شيء تحت السيطرة.
            </p>
          </div>
          <Link
            href="/leads"
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            Voir tous les leads
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total des leads"
            value={stats.totalLeads.toString()}
            delta="+0%"
            icon={<Users className="h-5 w-5" />}
            lightColor="bg-indigo-50"
            darkColor="text-indigo-600"
          />
          <StatsCard
            title="Produits actifs"
            value={stats.productsActifs.toString()}
            icon={<Package className="h-5 w-5" />}
            lightColor="bg-blue-50"
            darkColor="text-blue-600"
          />
          <StatsCard
            title="Ventes potentielles"
            value={formatCurrency(stats.potentialSales)}
            icon={<DollarSign className="h-5 w-5" />}
            lightColor="bg-emerald-50"
            darkColor="text-emerald-600"
          />
          <StatsCard
            title="Taux de conversion"
            value={`${stats.conversionRate}%`}
            icon={<Percent className="h-5 w-5" />}
            lightColor="bg-purple-50"
            darkColor="text-purple-600"
          />
        </div>

        <section className="mt-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">المهتمين (Leads)</h2>
              <p className="mt-1 text-sm text-gray-600">
                Suivez les prospects et avancez-les dans votre pipeline.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Filtrer :</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="all">Tous</option>
                  <option value="new">⏳ Nouveau</option>
                  <option value="appointment">🤝 Rendez-vous</option>
                  <option value="sale">🏷️ Vente</option>
                </select>
              </div>
              <div className="relative w-full sm:w-72">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un lead..."
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  🔎
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <StatusPill
              label="⏳ Nouveau"
              count={statusCounts.new}
              bg="bg-yellow-50"
              icon={<span className="text-lg">⏳</span>}
            />
            <StatusPill
              label="🤝 Rendez-vous"
              count={statusCounts.appointment}
              bg="bg-blue-50"
              icon={<span className="text-lg">🤝</span>}
            />
            <StatusPill
              label="🏷️ Vente"
              count={statusCounts.sale}
              bg="bg-emerald-50"
              icon={<span className="text-lg">🏷️</span>}
            />
          </div>

          <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col gap-2 px-6 py-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Derniers leads</h3>
                <p className="text-sm text-gray-600">
                  Liste des dernières opportunités enregistrées.
                </p>
              </div>
              <Link
                href="/leads"
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                Voir tout
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      # Opportunité
                    </th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Lead
                    </th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      État
                    </th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Prix
                    </th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {filteredLeads.slice(0, 6).map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {lead.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                        {lead.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                        {lead.state}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                        {formatCurrency(lead.price)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            lead.status === "new"
                              ? "bg-yellow-100 text-yellow-700"
                              : lead.status === "appointment"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {lead.status === "new"
                            ? "⏳ Nouveau"
                            : lead.status === "appointment"
                            ? "🤝 Rendez-vous"
                            : "🏷️ Vente"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
