import { useCallback, useEffect, useMemo, useState } from "react";
import { Boxes, CircleDollarSign, ClipboardList, UsersRound } from "lucide-react";
import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";
import { getSessionUser } from "@/utils/session";

function useBranchData(load) {
    const branchId = getSessionUser()?.branchId;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(Boolean(branchId));
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;
        if (!branchId) return undefined;
        load(branchId)
            .then((response) => {
                if (!cancelled) setData(Array.isArray(response.data) ? response.data : []);
            })
            .catch((requestError) => {
                if (!cancelled) setError(requestError.response?.data?.message || requestError.message || "Unable to load branch data.");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, [branchId, load]);

    return { data, loading: branchId ? loading : false, error: branchId ? error : "Your account is not assigned to a branch.", branchId };
}

function Metric({ label, value, icon: Icon }) {
    return (
        <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                {label}<Icon className="h-4 w-4" aria-hidden="true" />
            </div>
            <p className="mt-3 text-2xl font-bold">{value}</p>
        </div>
    );
}

export function BranchDashboard() {
    const branchId = getSessionUser()?.branchId;
    const [summary, setSummary] = useState({ orders: [], inventory: [], employees: [] });
    const [loading, setLoading] = useState(Boolean(branchId));
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;
        async function load() {
            if (!branchId) {
                setError("Your account is not assigned to a branch.");
                setLoading(false);
                return;
            }
            try {
                const headers = getAuthHeader();
                const [orders, inventory, employees] = await Promise.all([
                    api.get(`/api/orders/today/branch/${branchId}`, { headers }),
                    api.get(`/api/inventories/branch/${branchId}`, { headers }),
                    api.get(`/api/employees/branch/${branchId}`, { headers }),
                ]);
                if (!cancelled) {
                    setSummary({
                        orders: Array.isArray(orders.data) ? orders.data : [],
                        inventory: Array.isArray(inventory.data) ? inventory.data : [],
                        employees: Array.isArray(employees.data) ? employees.data : [],
                    });
                }
            } catch (requestError) {
                if (!cancelled) setError(requestError.response?.data?.message || requestError.message || "Unable to load dashboard.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, [branchId]);

    const sales = summary.orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-8">
            <h2 className="text-2xl font-bold">Branch overview</h2>
            <p className="mt-1 text-sm text-muted-foreground">Today's sales, orders, stock and team.</p>
            {error && <p role="alert" className="mt-5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Metric label="Today's orders" value={loading ? "…" : summary.orders.length} icon={ClipboardList} />
                <Metric label="Today's sales" value={loading ? "…" : sales.toLocaleString("en-IN", { style: "currency", currency: "INR" })} icon={CircleDollarSign} />
                <Metric label="Tracked products" value={loading ? "…" : summary.inventory.length} icon={Boxes} />
                <Metric label="Branch team" value={loading ? "…" : summary.employees.length} icon={UsersRound} />
            </div>
            <section className="mt-6 overflow-hidden rounded-xl border bg-card">
                <div className="border-b p-4"><h3 className="font-semibold">Recent orders today</h3></div>
                {loading ? <p className="p-6 text-sm text-muted-foreground">Loading orders...</p> : summary.orders.length ? (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[560px] text-sm">
                            <thead className="bg-muted/40 text-left text-muted-foreground"><tr><th className="px-4 py-3 font-medium">Order</th><th className="px-4 py-3 font-medium">Time</th><th className="px-4 py-3 font-medium">Payment</th><th className="px-4 py-3 text-right font-medium">Amount</th></tr></thead>
                            <tbody className="divide-y">{summary.orders.slice(0, 8).map((order) => (
                                <tr key={order.id}><td className="px-4 py-3 font-medium">#{order.id}</td><td className="px-4 py-3 text-muted-foreground">{order.createdAt ? new Date(order.createdAt).toLocaleTimeString() : "—"}</td><td className="px-4 py-3">{order.paymentType || "—"}</td><td className="px-4 py-3 text-right">{Number(order.totalAmount || 0).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</td></tr>
                            ))}</tbody>
                        </table>
                    </div>
                ) : <p className="p-6 text-sm text-muted-foreground">No orders have been placed today.</p>}
            </section>
        </main>
    );
}

export function BranchOrders() {
    const load = useMemo(() => (id) => api.get(`/api/orders/branch/${id}`, { headers: getAuthHeader() }), []);
    const { data: orders, loading, error } = useBranchData(load);
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-8">
            <h2 className="text-2xl font-bold">Branch orders</h2>
            {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
            <section className="mt-5 overflow-x-auto rounded-xl border bg-card">
                {loading ? <p className="p-6 text-sm text-muted-foreground">Loading orders...</p> : orders.length ? (
                    <table className="w-full min-w-[640px] text-sm">
                        <thead className="bg-muted/40 text-left text-muted-foreground"><tr><th className="px-4 py-3 font-medium">Order</th><th className="px-4 py-3 font-medium">Customer</th><th className="px-4 py-3 font-medium">Cashier</th><th className="px-4 py-3 font-medium">Payment</th><th className="px-4 py-3 text-right font-medium">Total</th></tr></thead>
                        <tbody className="divide-y">{orders.map((order) => (
                            <tr key={order.id}><td className="px-4 py-3 font-medium">#{order.id}</td><td className="px-4 py-3">{order.customer?.fullName || "Walk-in"}</td><td className="px-4 py-3">{order.cashier?.fullName || "—"}</td><td className="px-4 py-3">{order.paymentType}</td><td className="px-4 py-3 text-right">{Number(order.totalAmount || 0).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</td></tr>
                        ))}</tbody>
                    </table>
                ) : <p className="p-6 text-sm text-muted-foreground">No orders found.</p>}
            </section>
        </main>
    );
}

export function BranchInventory() {
    const load = useMemo(() => (id) => api.get(`/api/inventories/branch/${id}`, { headers: getAuthHeader() }), []);
    const { data: inventory, loading, error } = useBranchData(load);
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-8">
            <h2 className="text-2xl font-bold">Branch inventory</h2>
            <p className="mt-1 text-sm text-muted-foreground">Stock levels reported by the inventory service.</p>
            {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
            <section className="mt-5 overflow-x-auto rounded-xl border bg-card">
                {loading ? <p className="p-6 text-sm text-muted-foreground">Loading inventory...</p> : inventory.length ? (
                    <table className="w-full min-w-[560px] text-sm">
                        <thead className="bg-muted/40 text-left text-muted-foreground"><tr><th className="px-4 py-3 font-medium">Product</th><th className="px-4 py-3 font-medium">SKU</th><th className="px-4 py-3 text-right font-medium">Quantity</th><th className="px-4 py-3 text-right font-medium">Last update</th></tr></thead>
                        <tbody className="divide-y">{inventory.map((entry) => (
                            <tr key={entry.id}><td className="px-4 py-3 font-medium">{entry.product?.name || `Product #${entry.productId}`}</td><td className="px-4 py-3 text-muted-foreground">{entry.product?.sku || "—"}</td><td className={`px-4 py-3 text-right ${entry.quantity <= 5 ? "font-semibold text-destructive" : ""}`}>{entry.quantity ?? 0}</td><td className="px-4 py-3 text-right text-muted-foreground">{entry.lastUpdate ? new Date(entry.lastUpdate).toLocaleString() : "—"}</td></tr>
                        ))}</tbody>
                    </table>
                ) : <p className="p-6 text-sm text-muted-foreground">No inventory records found.</p>}
            </section>
        </main>
    );
}

export function BranchEmployees() {
    const branchId = getSessionUser()?.branchId;
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "" });
    const [loading, setLoading] = useState(Boolean(branchId));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    const loadEmployees = useCallback(async () => {
        if (!branchId) return;
        try {
            const response = await api.get(`/api/employees/branch/${branchId}`, { headers: getAuthHeader() });
            setEmployees(Array.isArray(response.data) ? response.data : []);
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Unable to load employees.");
        } finally {
            setLoading(false);
        }
    }, [branchId]);
    useEffect(() => {
        loadEmployees();
    }, [loadEmployees]);

    async function addEmployee(event) {
        event.preventDefault();
        setSaving(true);
        setError("");
        setNotice("");
        try {
            await api.post(`/api/employees/branch/${branchId}`, { ...form, role: "ROLE_BRANCH_CASHIER" }, { headers: getAuthHeader() });
            setForm({ fullName: "", email: "", phone: "", password: "" });
            setNotice("Cashier account created.");
            await loadEmployees();
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Unable to add employee.");
        } finally {
            setSaving(false);
        }
    }
    async function removeEmployee(employee) {
        if (!window.confirm(`Remove ${employee.fullName}?`)) return;
        setError("");
        try {
            await api.delete(`/api/employees/${employee.id}`, { headers: getAuthHeader() });
            await loadEmployees();
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Unable to remove employee.");
        }
    }

    return (
        <main className="mx-auto max-w-7xl p-4 md:p-8">
            <h2 className="text-2xl font-bold">Branch team</h2>
            {(branchId ? error : "Your account is not assigned to a branch.") && <p role="alert" className="mt-4 text-sm text-destructive">{branchId ? error : "Your account is not assigned to a branch."}</p>}
            {notice && <p role="status" className="mt-4 text-sm text-green-700">{notice}</p>}
            <form onSubmit={addEmployee} className="mt-5 grid gap-3 rounded-xl border bg-card p-4 sm:grid-cols-2 xl:grid-cols-5">
                {["fullName", "email", "phone", "password"].map((field) => (
                    <label key={field} className="space-y-1 text-xs font-medium capitalize text-muted-foreground">
                        {field === "fullName" ? "Full name" : field}
                        <input required={field === "fullName" || field === "email" || field === "password"} type={field === "password" ? "password" : field === "email" ? "email" : "text"} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="h-10 w-full rounded-md border bg-background px-3 text-sm font-normal text-foreground" />
                    </label>
                ))}
                <button disabled={saving || !branchId} className="self-end rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">{saving ? "Creating..." : "Add cashier"}</button>
            </form>
            <section className="mt-5 overflow-hidden rounded-xl border bg-card">
                {loading ? <p className="p-6 text-sm text-muted-foreground">Loading team...</p> : employees.length ? employees.map((employee) => (
                    <div key={employee.id} className="flex items-center justify-between border-b p-4 last:border-0">
                        <div><p className="font-medium">{employee.fullName}</p><p className="text-sm text-muted-foreground">{employee.email} · {employee.role}</p></div>
                        <button type="button" onClick={() => removeEmployee(employee)} className="rounded-md border px-3 py-2 text-sm text-destructive hover:bg-destructive/10">Remove</button>
                    </div>
                )) : <p className="p-6 text-sm text-muted-foreground">No employees found.</p>}
            </section>
        </main>
    );
}
