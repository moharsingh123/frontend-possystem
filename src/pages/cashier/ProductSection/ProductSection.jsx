import { useMemo, useState } from "react";
import { Search, ShoppingBag } from "lucide-react";

export default function ProductSection({ products, stockByProduct, loading, onAdd }) {
    const [query, setQuery] = useState("");
    const filteredProducts = useMemo(() => {
        const normalized = query.trim().toLowerCase();
        if (!normalized) return products;
        return products.filter((product) =>
            [product.name, product.sku, product.brand].some((value) => value?.toLowerCase().includes(normalized)),
        );
    }, [products, query]);

    return (
        <section className="rounded-xl border bg-card p-4 md:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 className="font-semibold">Products</h3>
                    <p className="text-sm text-muted-foreground">Select an item to add it to the cart.</p>
                </div>
                <label className="flex h-10 w-full items-center gap-2 rounded-md border px-3 sm:w-64">
                    <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <input
                        aria-label="Search products"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search products"
                        className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                    />
                </label>
            </div>
            {loading ? (
                <p className="py-12 text-center text-sm text-muted-foreground">Loading products...</p>
            ) : filteredProducts.length ? (
                <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                    {filteredProducts.map((product) => {
                        const stock = stockByProduct[product.id];
                        return (
                            <button
                                type="button"
                                key={product.id}
                                onClick={() => onAdd(product)}
                                disabled={stock === 0}
                                className="flex min-h-32 flex-col items-start justify-between rounded-lg border p-4 text-left transition hover:border-primary hover:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span className="w-full">
                                    <span className="block font-medium">{product.name}</span>
                                    <span className="mt-1 block text-xs text-muted-foreground">{product.brand || product.sku || "Product"}</span>
                                </span>
                                <span className="mt-4 flex w-full items-end justify-between gap-2">
                                    <span className="font-semibold">{Number(product.sellingPrice).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
                                    <span className="text-xs text-muted-foreground">{stock === undefined ? "Add item" : `${stock} in stock`}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center py-12 text-center text-muted-foreground">
                    <ShoppingBag className="mb-3 h-8 w-8" aria-hidden="true" />
                    <p className="font-medium">No products found</p>
                    <p className="mt-1 text-sm">Try another search or add products to this store.</p>
                </div>
            )}
        </section>
    );
}
