import { useCallback, useEffect, useState } from "react";
import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";
import { getSessionUser } from "@/utils/session";

export default function StoreCategories() {
    const [storeId, setStoreId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    useEffect(() => {
        let cancelled = false;
        async function loadStore() {
            const user = getSessionUser();
            const endpoint = user?.role === "ROLE_STORE_ADMIN" ? "/api/stores/admin" : "/api/stores/employee";
            try {
                const response = await api.get(endpoint, { headers: getAuthHeader() });
                if (!cancelled) setStoreId(response.data?.id ?? null);
            } catch (requestError) {
                if (!cancelled && requestError.response?.status !== 404) {
                    setError(requestError.response?.data?.message || requestError.message || "Unable to load store.");
                }
            }
        }
        loadStore();
        return () => { cancelled = true; };
    }, []);

    const loadCategories = useCallback(async () => {
        if (!storeId) return;
        const response = await api.get(`/api/categories/store/${storeId}`, { headers: getAuthHeader() });
        setCategories(Array.isArray(response.data) ? response.data : []);
    }, [storeId]);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            if (!storeId) {
                setLoading(false);
                return;
            }
            setLoading(true);
            setError("");
            try {
                const response = await api.get(`/api/categories/store/${storeId}`, { headers: getAuthHeader() });
                if (!cancelled) setCategories(Array.isArray(response.data) ? response.data : []);
            } catch (requestError) {
                if (!cancelled) setError(requestError.response?.data?.message || requestError.message || "Unable to load categories.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, [storeId]);

    async function saveCategory(event) {
        event.preventDefault();
        setSaving(true);
        setError("");
        setNotice("");
        try {
            if (editingId) {
                await api.put(`/api/categories/${editingId}`, { name, storeId }, { headers: getAuthHeader() });
                setNotice("Category updated.");
            } else {
                await api.post("/api/categories", { name, storeId }, { headers: getAuthHeader() });
                setNotice("Category added.");
            }
            setName("");
            setEditingId(null);
            await loadCategories();
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Unable to save category.");
        } finally {
            setSaving(false);
        }
    }

    async function deleteCategory(category) {
        if (!window.confirm(`Delete category "${category.name}"?`)) return;
        setError("");
        setNotice("");
        try {
            await api.delete(`/api/categories/${category.id}`, { headers: getAuthHeader() });
            setNotice("Category deleted.");
            await loadCategories();
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Unable to delete category.");
        }
    }

    return (
        <main className="mx-auto max-w-7xl p-4 md:p-8">
            <h2 className="text-2xl font-bold">Product categories</h2>
            <p className="mt-1 text-sm text-muted-foreground">Manage categories used by products in this store.</p>
            {error && <p role="alert" className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
            {notice && <p role="status" className="mt-4 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800">{notice}</p>}
            <form onSubmit={saveCategory} className="mt-5 flex flex-wrap items-end gap-3 rounded-xl border bg-card p-4">
                <label className="min-w-60 flex-1 space-y-1 text-sm font-medium">Category name
                    <input required maxLength={100} value={name} onChange={(event) => setName(event.target.value)} className="h-10 w-full rounded-md border bg-background px-3 text-sm font-normal" />
                </label>
                <button disabled={saving || !storeId} className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50">{saving ? "Saving..." : editingId ? "Save category" : "Add category"}</button>
                {editingId && <button type="button" onClick={() => { setEditingId(null); setName(""); }} className="h-10 rounded-md border px-4 text-sm">Cancel</button>}
            </form>
            <section className="mt-5 divide-y rounded-xl border bg-card">
                {loading ? <p className="p-6 text-sm text-muted-foreground">Loading categories...</p> : categories.length ? categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between gap-3 p-4">
                        <span className="font-medium">{category.name}</span>
                        <div className="flex gap-2">
                            <button type="button" onClick={() => { setEditingId(category.id); setName(category.name); setNotice(""); }} className="rounded-md border px-3 py-2 text-sm">Edit</button>
                            <button type="button" onClick={() => deleteCategory(category)} className="rounded-md border px-3 py-2 text-sm text-destructive">Delete</button>
                        </div>
                    </div>
                )) : <p className="p-6 text-sm text-muted-foreground">No categories have been created yet.</p>}
            </section>
        </main>
    );
}
