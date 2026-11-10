import { useEffect, useState } from "react";
import { Pencil, Plus, Search, Trash2, UserRound, X } from "lucide-react";
import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";

const emptyCustomer = { fullName: "", email: "", phone: "" };

export default function CustomerLookup() {
    const [customers, setCustomers] = useState([]);
    const [query, setQuery] = useState("");
    const [form, setForm] = useState(emptyCustomer);
    const [editingId, setEditingId] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    async function loadCustomers(search = "") {
        setLoading(true);
        setError("");
        try {
            const response = search
                ? await api.get("/api/customers/search", { params: { q: search }, headers: getAuthHeader() })
                : await api.get("/api/customers", { headers: getAuthHeader() });
            setCustomers(Array.isArray(response.data) ? response.data : []);
        } catch (loadError) {
            setError(loadError.response?.data?.message || loadError.message || "Unable to load customers.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => loadCustomers(query.trim()), query.trim() ? 250 : 0);
        return () => clearTimeout(timer);
    }, [query]);

    function startCreate() {
        setEditingId(null);
        setForm(emptyCustomer);
        setFormOpen(true);
        setNotice("");
    }

    function startEdit(customer) {
        setEditingId(customer.id);
        setForm({
            fullName: customer.fullName || "",
            email: customer.email || "",
            phone: customer.phone || "",
        });
        setFormOpen(true);
        setNotice("");
    }

    async function saveCustomer(event) {
        event.preventDefault();
        setSaving(true);
        setError("");
        try {
            if (editingId) {
                await api.put(`/api/customers/${editingId}`, form, { headers: getAuthHeader() });
                setNotice("Customer updated.");
            } else {
                await api.post("/api/customers", form, { headers: getAuthHeader() });
                setNotice("Customer created.");
            }
            setFormOpen(false);
            setForm(emptyCustomer);
            setEditingId(null);
            await loadCustomers(query.trim());
        } catch (saveError) {
            setError(saveError.response?.data?.message || saveError.message || "Unable to save customer.");
        } finally {
            setSaving(false);
        }
    }

    async function removeCustomer(customer) {
        if (!window.confirm(`Delete ${customer.fullName}?`)) return;
        setError("");
        setNotice("");
        try {
            await api.delete(`/api/customers/${customer.id}`, { headers: getAuthHeader() });
            setNotice("Customer deleted.");
            await loadCustomers(query.trim());
        } catch (deleteError) {
            setError(deleteError.response?.data?.message || deleteError.message || "Unable to delete customer.");
        }
    }

    return (
        <main className="mx-auto w-full max-w-6xl p-4 md:p-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-bold">Customer management</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Find and maintain customer records.</p>
                </div>
                <button type="button" onClick={startCreate} className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90">
                    <Plus className="h-4 w-4" /> Add customer
                </button>
            </div>

            {error && <p role="alert" className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
            {notice && <p role="status" className="mb-4 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800">{notice}</p>}

            {formOpen && (
                <form onSubmit={saveCustomer} className="mb-5 rounded-xl border bg-card p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold">{editingId ? "Edit customer" : "New customer"}</h3>
                        <button type="button" aria-label="Close form" onClick={() => setFormOpen(false)} className="rounded p-1 hover:bg-muted"><X className="h-4 w-4" /></button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <label className="space-y-1 text-sm font-medium">
                            Full name
                            <input required value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} className="h-10 w-full rounded-md border bg-background px-3 font-normal" />
                        </label>
                        <label className="space-y-1 text-sm font-medium">
                            Phone
                            <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="h-10 w-full rounded-md border bg-background px-3 font-normal" />
                        </label>
                        <label className="space-y-1 text-sm font-medium">
                            Email
                            <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="h-10 w-full rounded-md border bg-background px-3 font-normal" />
                        </label>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <button type="button" onClick={() => setFormOpen(false)} className="h-9 rounded-md border px-4 text-sm">Cancel</button>
                        <button type="submit" disabled={saving} className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50">{saving ? "Saving..." : "Save customer"}</button>
                    </div>
                </form>
            )}

            <section className="overflow-hidden rounded-xl border bg-card">
                <div className="border-b p-4">
                    <label className="flex h-10 max-w-sm items-center gap-2 rounded-md border px-3">
                        <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search customers" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
                    </label>
                </div>
                {loading ? <p className="p-8 text-center text-sm text-muted-foreground">Loading customers...</p>
                    : customers.length ? (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px] text-sm">
                                <thead className="bg-muted/40 text-left text-muted-foreground">
                                    <tr><th className="px-4 py-3 font-medium">Customer</th><th className="px-4 py-3 font-medium">Phone</th><th className="px-4 py-3 font-medium">Email</th><th className="px-4 py-3 text-right font-medium">Actions</th></tr>
                                </thead>
                                <tbody className="divide-y">
                                    {customers.map((customer) => (
                                        <tr key={customer.id}>
                                            <td className="px-4 py-3">
                                                <span className="flex items-center gap-2 font-medium"><UserRound className="h-4 w-4 text-muted-foreground" />{customer.fullName}</span>
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">{customer.phone || "—"}</td>
                                            <td className="px-4 py-3 text-muted-foreground">{customer.email || "—"}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex justify-end gap-2">
                                                    <button type="button" onClick={() => startEdit(customer)} aria-label={`Edit ${customer.fullName}`} className="rounded border p-2 hover:bg-muted"><Pencil className="h-4 w-4" /></button>
                                                    <button type="button" onClick={() => removeCustomer(customer)} aria-label={`Delete ${customer.fullName}`} className="rounded border p-2 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : <p className="p-8 text-center text-sm text-muted-foreground">No customers found.</p>}
            </section>
        </main>
    );
}
