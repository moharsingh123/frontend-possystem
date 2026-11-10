import { useEffect, useState } from "react";
import { Check, Search, UserRound, X } from "lucide-react";
import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";

export default function CustomerPaymentSection({
    customer,
    onCustomerChange,
    paymentType,
    onPaymentTypeChange,
    total,
    submitting,
    onSubmit,
}) {
    const [query, setQuery] = useState("");
    const [matches, setMatches] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searchError, setSearchError] = useState("");

    useEffect(() => {
        const value = query.trim();
        if (customer || value.length < 2) {
            return undefined;
        }
        let cancelled = false;
        const timer = setTimeout(async () => {
            setSearching(true);
            setSearchError("");
            try {
                const response = await api.get("/api/customers/search", {
                    params: { q: value },
                    headers: getAuthHeader(),
                });
                if (!cancelled) setMatches(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                if (!cancelled) setSearchError(error.response?.data?.message || error.message || "Customer search failed.");
            } finally {
                if (!cancelled) setSearching(false);
            }
        }, 250);
        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [customer, query]);

    function chooseCustomer(value) {
        onCustomerChange(value);
        setQuery("");
        setMatches([]);
    }

    return (
        <section className="rounded-xl border bg-card p-4 md:p-5">
            <h3 className="font-semibold">Customer & payment</h3>
            <div className="mt-4 space-y-4">
                <div>
                    <label htmlFor="customer-search" className="mb-2 block text-sm font-medium">Customer (optional)</label>
                    {customer ? (
                        <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/30 p-3">
                            <div className="flex min-w-0 items-center gap-2">
                                <UserRound className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium">{customer.fullName}</p>
                                    <p className="truncate text-xs text-muted-foreground">{customer.phone || customer.email || "Customer selected"}</p>
                                </div>
                            </div>
                            <button type="button" onClick={() => chooseCustomer(null)} aria-label="Remove customer" className="rounded p-1 hover:bg-muted">
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="relative">
                            <div className="flex h-10 items-center gap-2 rounded-md border px-3">
                                <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                                <input
                                    id="customer-search"
                                    value={query}
                                    onChange={(event) => {
                                        setQuery(event.target.value);
                                        setMatches([]);
                                        setSearchError("");
                                    }}
                                    placeholder="Search by name, phone or email"
                                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                                />
                            </div>
                            {searchError && <p role="alert" className="mt-1 text-xs text-destructive">{searchError}</p>}
                            {query.trim().length > 1 && (
                                <div className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border bg-popover shadow-lg">
                                    {searching ? <p className="p-3 text-sm text-muted-foreground">Searching...</p>
                                        : matches.length ? matches.map((match) => (
                                            <button type="button" key={match.id} onClick={() => chooseCustomer(match)} className="block w-full border-b px-3 py-2 text-left last:border-0 hover:bg-muted">
                                                <span className="block text-sm font-medium">{match.fullName}</span>
                                                <span className="text-xs text-muted-foreground">{match.phone || match.email}</span>
                                            </button>
                                        )) : <p className="p-3 text-sm text-muted-foreground">No matching customers.</p>}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div>
                    <label htmlFor="payment-type" className="mb-2 block text-sm font-medium">Payment method</label>
                    <select id="payment-type" value={paymentType} onChange={(event) => onPaymentTypeChange(event.target.value)} className="h-10 w-full rounded-md border bg-background px-3 text-sm">
                        <option value="CASH">Cash</option>
                        <option value="UPI">UPI</option>
                        <option value="CARD">Card</option>
                    </select>
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                    <span className="font-medium">Total</span>
                    <span className="text-xl font-bold">{total.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
                </div>
                <button
                    type="button"
                    disabled={submitting || total <= 0}
                    onClick={onSubmit}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {submitting ? "Processing..." : <><Check className="h-4 w-4" /> Complete order</>}
                </button>
            </div>
        </section>
    );
}
