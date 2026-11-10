import { useEffect, useState } from "react";
import { Activity, CircleCheck, Store, UserRound } from "lucide-react";
import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";

export default function AdminDashboard() {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;
        api.get("/api/stores", { headers: getAuthHeader() })
            .then((response) => {
                if (!cancelled) setStores(Array.isArray(response.data) ? response.data : []);
            })
            .catch((requestError) => {
                if (!cancelled) setError(requestError.response?.data?.message || requestError.message || "Unable to load platform summary.");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, []);

    const active = stores.filter((store) => store.status === "ACTIVE").length;
    const pending = stores.filter((store) => store.status === "PENDING").length;
    const blocked = stores.filter((store) => store.status === "BLOCKED").length;
    const metrics = [
        { label: "Total stores", value: stores.length, icon: Store },
        { label: "Active stores", value: active, icon: CircleCheck },
        { label: "Pending review", value: pending, icon: Activity },
        { label: "Blocked stores", value: blocked, icon: UserRound },
    ];

    return (
        <main className="mx-auto max-w-7xl p-4 md:p-8">
            <h2 className="text-2xl font-bold">Platform overview</h2>
            <p className="mt-1 text-sm text-muted-foreground">Monitor store registrations and platform access.</p>
            {error && <p role="alert" className="mt-5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="rounded-xl border bg-card p-5">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">{label}<Icon className="h-4 w-4" aria-hidden="true" /></div>
                        <p className="mt-3 text-2xl font-bold">{loading ? "…" : value}</p>
                    </div>
                ))}
            </div>
            <section className="mt-6 overflow-hidden rounded-xl border bg-card">
                <div className="border-b p-4"><h3 className="font-semibold">Recently registered stores</h3></div>
                {loading ? <p className="p-5 text-sm text-muted-foreground">Loading stores...</p> : stores.length ? (
                    <div className="divide-y">
                        {stores.slice(0, 6).map((store) => (
                            <div key={store.id} className="flex items-center justify-between gap-3 p-4">
                                <div><p className="font-medium">{store.brand || `Store #${store.id}`}</p><p className="text-sm text-muted-foreground">{store.storeAdmin?.email || store.storeType || "Store"}</p></div>
                                <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">{store.status || "UNKNOWN"}</span>
                            </div>
                        ))}
                    </div>
                ) : <p className="p-5 text-sm text-muted-foreground">No stores have registered yet.</p>}
            </section>
        </main>
    );
}
