import { useCallback, useEffect, useState } from "react";
import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";

export default function StoreList({ statusFilter, title = "Stores" }) {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    const loadStores = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await api.get("/api/stores", { headers: getAuthHeader() });
            const rows = Array.isArray(response.data) ? response.data : [];
            setStores(statusFilter ? rows.filter((store) => store.status === statusFilter) : rows);
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Unable to load stores.");
        } finally {
            setLoading(false);
        }
    }, [statusFilter]);

    useEffect(() => { loadStores(); }, [loadStores]);

    async function moderateStore(store, status) {
        setUpdatingId(store.id);
        setError("");
        setNotice("");
        try {
            await api.put(`/api/stores/${store.id}/moderate`, null, {
                params: { status },
                headers: getAuthHeader(),
            });
            setNotice(`${store.brand || `Store #${store.id}`} is now ${status.toLowerCase()}.`);
            await loadStores();
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Unable to update store status.");
        } finally {
            setUpdatingId(null);
        }
    }

    return (
        <main className="mx-auto max-w-7xl p-4 md:p-8">
            <div className="mb-5">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">Review registered stores and moderate their platform access.</p>
            </div>
            {error && <p role="alert" className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
            {notice && <p role="status" className="mb-4 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800">{notice}</p>}
            <section className="overflow-x-auto rounded-xl border bg-card">
                {loading ? <p className="p-6 text-sm text-muted-foreground">Loading stores...</p> : stores.length ? (
                    <table className="w-full min-w-[700px] text-sm">
                        <thead className="bg-muted/40 text-left text-muted-foreground">
                            <tr><th className="px-4 py-3 font-medium">Store</th><th className="px-4 py-3 font-medium">Owner</th><th className="px-4 py-3 font-medium">Type</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 text-right font-medium">Actions</th></tr>
                        </thead>
                        <tbody className="divide-y">
                            {stores.map((store) => (
                                <tr key={store.id}>
                                    <td className="px-4 py-3"><p className="font-medium">{store.brand || `Store #${store.id}`}</p><p className="text-xs text-muted-foreground">{store.contact?.email || store.contact?.phone || "No contact details"}</p></td>
                                    <td className="px-4 py-3">{store.storeAdmin?.fullName || store.storeAdmin?.email || "—"}</td>
                                    <td className="px-4 py-3">{store.storeType || "—"}</td>
                                    <td className="px-4 py-3"><span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">{store.status || "UNKNOWN"}</span></td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            {store.status !== "ACTIVE" && <button type="button" disabled={updatingId === store.id} onClick={() => moderateStore(store, "ACTIVE")} className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-50">Approve</button>}
                                            {store.status !== "BLOCKED" && <button type="button" disabled={updatingId === store.id} onClick={() => moderateStore(store, "BLOCKED")} className="rounded-md border px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:opacity-50">Block</button>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : <p className="p-6 text-sm text-muted-foreground">{statusFilter ? `No ${statusFilter.toLowerCase()} stores.` : "No stores have registered yet."}</p>}
            </section>
        </main>
    );
}
