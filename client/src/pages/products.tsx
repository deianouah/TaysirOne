import { Link } from "wouter";
import { Package, ShoppingCart } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Mes Produits & Offres
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Gérez vos produits, offres et catalogues dans un seul endroit.
            </p>
          </div>
          <Link
            href="/products/new"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700"
          >
            <ShoppingCart className="h-4 w-4" />
            Ajouter un produit
          </Link>
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center">
          <Package className="mx-auto h-10 w-10 text-indigo-500" />
          <h2 className="mt-4 text-lg font-semibold text-gray-900">
            Aucune donnée disponible
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Commencez en créant votre premier produit ou offre.
          </p>
        </div>
      </div>
    </div>
  );
}
