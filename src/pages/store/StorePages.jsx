import { useEffect, useState } from "react";
import { Boxes, GitBranch, Plus, Store as StoreIcon } from "lucide-react";
import { Link } from "react-router";
import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";
import { getSessionUser } from "@/utils/session";

function useStore() {
    const [store, setStore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;
        const user = getSessionUser();
        const endpoint = user?.role === "ROLE_STORE_ADMIN" ? "/api/stores/admin" : "/api/stores/employee";
        api.get(endpoint, { headers: getAuthHeader() })
            .then((response) => {
                if (!cancelled) setStore(response.data);
            })
            .catch((requestError) => {
                if (!cancelled && requestError.response?.status !== 404) {
                    setError(requestError.response?.data?.message || requestError.message || "Unable to load store.");
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, []);

    return { store, setStore, loading, error };
}

function PageHeader({ title, description }) {
    return <div className="mb-5"><h2 className="text-2xl font-bold">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{description}</p></div>;
}

function StoreNotice({ error, notice }) {
    return (
        <>
            {error && <p role="alert" className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
            {notice && <p role="status" className="mb-4 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800">{notice}</p>}
        </>
    );
}

function StoreRequired() {
    return (
        <div className="rounded-xl border bg-card p-6">
            <p className="font-medium">This account is not connected to a store.</p>
            <p className="mt-1 text-sm text-muted-foreground">Employee accounts must be created by a store administrator so they are linked to the correct store. Sign in with that administrator account or ask them to create your employee account.</p>
            <Link to="/store" className="mt-4 inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
                Go to store overview
            </Link>
        </div>
    );
}

export function StoreDashboard() {
    const { store, setStore, loading, error } = useStore();
    const [summary, setSummary] = useState({ branches: [], products: [] });
    const [summaryError, setSummaryError] = useState("");

    useEffect(() => {
        if (!store?.id) return;
        let cancelled = false;
        Promise.all([
            api.get(`/api/branches/store/${store.id}`, { headers: getAuthHeader() }),
            api.get(`/api/products/store/${store.id}`, { headers: getAuthHeader() }),
        ]).then(([branches, products]) => {
            if (!cancelled) {
                setSummary({
                    branches: Array.isArray(branches.data) ? branches.data : [],
                    products: Array.isArray(products.data) ? products.data : [],
                });
            }
        }).catch((requestError) => {
            if (!cancelled) setSummaryError(requestError.response?.data?.message || requestError.message || "Unable to load store metrics.");
        });
        return () => { cancelled = true; };
    }, [store?.id]);

    return (
        <main className="mx-auto max-w-7xl p-4 md:p-8">
            <PageHeader title={`Welcome${store?.brand ? `, ${store.brand}` : ""}`} description="Your store at a glance." />
            <StoreNotice error={store ? summaryError : error} />
            {!loading && !store && getSessionUser()?.role === "ROLE_STORE_ADMIN" && (
                <StoreSetup onCreated={setStore} />
            )}
            <div className="grid gap-4 sm:grid-cols-3">
                {[
                    { label: "Store status", value: loading ? "…" : store?.status || "Unknown", icon: StoreIcon },
                    { label: "Branches", value: loading ? "…" : summary.branches.length, icon: GitBranch },
                    { label: "Products", value: loading ? "…" : summary.products.length, icon: Boxes },
                ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="rounded-xl border bg-card p-5">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">{label}<Icon className="h-4 w-4" /></div>
                        <p className="mt-3 text-2xl font-bold">{value}</p>
                    </div>
                ))}
            </div>
            <section className="mt-6 rounded-xl border bg-card p-5">
                <h3 className="font-semibold">Store information</h3>
                {loading ? <p className="mt-3 text-sm text-muted-foreground">Loading store profile...</p> : store ? (
                    <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                        <div><dt className="text-muted-foreground">Type</dt><dd className="mt-1 font-medium">{store.storeType || "Not set"}</dd></div>
                        <div><dt className="text-muted-foreground">Description</dt><dd className="mt-1 font-medium">{store.description || "No description"}</dd></div>
                        <div><dt className="text-muted-foreground">Email</dt><dd className="mt-1 font-medium">{store.contact?.email || "—"}</dd></div>
                        <div><dt className="text-muted-foreground">Phone</dt><dd className="mt-1 font-medium">{store.contact?.phone || "—"}</dd></div>
                    </dl>
                ) : <p className="mt-3 text-sm text-muted-foreground">No store profile is connected to this account.</p>}
            </section>
        </main>
    );
}

function StoreSetup({ onCreated }) {
    const [form, setForm] = useState({
        brand: "",
        storeType: "",
        description: "",
        contact: { address: "", phone: "", email: "" },
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    async function createStore(event) {
        event.preventDefault();
        setSaving(true);
        setError("");
        try {
            const response = await api.post("/api/stores", form, { headers: getAuthHeader() });
            onCreated(response.data);
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Unable to create store.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={createStore} className="mb-6 rounded-xl border bg-card p-5">
            <h3 className="font-semibold">Set up your store</h3>
            <p className="mt-1 text-sm text-muted-foreground">Create a store profile to start managing branches and products.</p>
            {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-medium">Store name<input required value={form.brand} onChange={(event) => setForm({ ...form, brand: event.target.value })} className="h-10 w-full rounded-md border bg-background px-3 font-normal" /></label>
                <label className="space-y-1 text-sm font-medium">Store type<input value={form.storeType} onChange={(event) => setForm({ ...form, storeType: event.target.value })} className="h-10 w-full rounded-md border bg-background px-3 font-normal" /></label>
                <label className="space-y-1 text-sm font-medium">Address<input value={form.contact.address} onChange={(event) => setForm({ ...form, contact: { ...form.contact, address: event.target.value } })} className="h-10 w-full rounded-md border bg-background px-3 font-normal" /></label>
                <label className="space-y-1 text-sm font-medium">Phone<input value={form.contact.phone} onChange={(event) => setForm({ ...form, contact: { ...form.contact, phone: event.target.value } })} className="h-10 w-full rounded-md border bg-background px-3 font-normal" /></label>
                <label className="space-y-1 text-sm font-medium">Email<input type="email" value={form.contact.email} onChange={(event) => setForm({ ...form, contact: { ...form.contact, email: event.target.value } })} className="h-10 w-full rounded-md border bg-background px-3 font-normal" /></label>
                <label className="space-y-1 text-sm font-medium sm:col-span-2">Description<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="min-h-20 w-full rounded-md border bg-background p-3 font-normal" /></label>
            </div>
            <button disabled={saving} className="mt-4 h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50">{saving ? "Creating..." : "Create store"}</button>
        </form>
    );
}

export function StoreBranches() {
    const { store, loading: storeLoading, error: storeError } = useStore();
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [saving, setSaving] = useState(false);
    const isStoreAdmin = getSessionUser()?.role === "ROLE_STORE_ADMIN";
    const [form, setForm] = useState({ name: "", address: "", phone: "", email: "", openTime: "09:00", closeTime: "18:00" });

    async function loadBranches(storeId) {
        setLoading(true);
        try {
            const response = await api.get(`/api/branches/store/${storeId}`, { headers: getAuthHeader() });
            setBranches(Array.isArray(response.data) ? response.data : []);
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Unable to load branches.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (store?.id) loadBranches(store.id);
    }, [store?.id]);

    async function createBranch(event) {
        event.preventDefault();
        setSaving(true);
        setError("");
        setNotice("");
        try {
            await api.post("/api/branches", {
                ...form,
                storeId: store.id,
                workingDays: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"],
                openTime: `${form.openTime}:00`,
                closeTime: `${form.closeTime}:00`,
            }, { headers: getAuthHeader() });
            setForm({ name: "", address: "", phone: "", email: "", openTime: "09:00", closeTime: "18:00" });
            setNotice("Branch created.");
            await loadBranches(store.id);
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Unable to create branch.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <main className="mx-auto max-w-7xl p-4 md:p-8">
            <PageHeader title="Branches" description="Manage locations linked to your store." />
            <StoreNotice error={storeError || error} notice={notice} />
            {isStoreAdmin && store && (
                <form onSubmit={createBranch} className="mb-5 grid gap-3 rounded-xl border bg-card p-4 sm:grid-cols-2 xl:grid-cols-4">
                    {["name", "address", "phone", "email"].map((field) => (
                        <label key={field} className="space-y-1 text-xs font-medium capitalize text-muted-foreground">
                            {field}
                            <input required={field === "name"} type={field === "email" ? "email" : "text"} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="h-10 w-full rounded-md border bg-background px-3 text-sm font-normal text-foreground" />
                        </label>
                    ))}
                    <label className="space-y-1 text-xs font-medium text-muted-foreground">Opening time<input type="time" value={form.openTime} onChange={(event) => setForm({ ...form, openTime: event.target.value })} className="h-10 w-full rounded-md border bg-background px-3 text-sm text-foreground" /></label>
                    <label className="space-y-1 text-xs font-medium text-muted-foreground">Closing time<input type="time" value={form.closeTime} onChange={(event) => setForm({ ...form, closeTime: event.target.value })} className="h-10 w-full rounded-md border bg-background px-3 text-sm text-foreground" /></label>
                    <button disabled={saving} className="inline-flex h-10 items-center justify-center gap-2 self-end rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"><Plus className="h-4 w-4" />{saving ? "Creating..." : "Add branch"}</button>
                </form>
            )}
            {storeLoading || loading ? <p className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">Loading branches...</p> : branches.length ? (
                <div className="grid gap-4 md:grid-cols-2">
                    {branches.map((branch) => (
                        <article key={branch.id} className="rounded-xl border bg-card p-5">
                            <h3 className="font-semibold">{branch.name}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{branch.address || "No address"}</p>
                            <p className="mt-3 text-sm">{branch.phone || "No phone"}{branch.email ? ` · ${branch.email}` : ""}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{branch.openTime || "—"} – {branch.closeTime || "—"}</p>
                        </article>
                    ))}
                </div>
            ) : <p className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">{store ? "No branches found." : "Create or connect a store profile before managing branches."}</p>}
        </main>
    );
}

export function StoreProducts() {
    const { store, loading: storeLoading, error: storeError } = useStore();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ name: "", sku: "", brand: "", mrp: "", sellingPrice: "", categoryId: "" });

    async function loadProducts(storeId) {
        setError("");
        let productError = "";
        let categoryError = "";
        try {
            const productResponse = await api.get(`/api/products/store/${storeId}`, { headers: getAuthHeader() });
            setProducts(Array.isArray(productResponse.data) ? productResponse.data : []);
        } catch (requestError) {
            productError = requestError.response?.data?.message || requestError.message || "Unable to load products.";
        }
        try {
            const categoryResponse = await api.get(`/api/categories/store/${storeId}`, { headers: getAuthHeader() });
            setCategories(Array.isArray(categoryResponse.data) ? categoryResponse.data : []);
        } catch (requestError) {
            categoryError = requestError.response?.data?.message || requestError.message || "Unable to load categories.";
        }
        setError([productError, categoryError && `Unable to load categories: ${categoryError}`].filter(Boolean).join(" "));
    }
    useEffect(() => {
        if (store?.id) loadProducts(store.id);
    }, [store?.id]);

    async function createProduct(event) {
        event.preventDefault();
        setSaving(true);
        setError("");
        setNotice("");
        try {
            await api.post("/api/products", {
                name: form.name,
                sku: form.sku,
                brand: form.brand,
                mrp: Number(form.mrp),
                sellingPrice: Number(form.sellingPrice),
                storeId: store.id,
                categoryId: form.categoryId ? Number(form.categoryId) : null,
            }, { headers: getAuthHeader() });
            setForm({ name: "", sku: "", brand: "", mrp: "", sellingPrice: "", categoryId: "" });
            setNotice("Product added.");
            await loadProducts(store.id);
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Unable to add product.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <main className="mx-auto max-w-7xl p-4 md:p-8">
            <PageHeader title="Product catalogue" description="Products are shared across branches in this store." />
            <StoreNotice error={storeError || error} notice={notice} />
            {getSessionUser()?.role === "ROLE_STORE_ADMIN" && store && (
                <form onSubmit={createProduct} className="mb-5 grid gap-3 rounded-xl border bg-card p-4 sm:grid-cols-2 xl:grid-cols-6">
                    {["name", "sku", "brand", "mrp", "sellingPrice"].map((field) => (
                        <label key={field} className="space-y-1 text-xs font-medium capitalize text-muted-foreground">{field === "sellingPrice" ? "Selling price" : field}
                            <input required={field === "name" || field === "sku" || field === "mrp" || field === "sellingPrice"} type={field === "mrp" || field === "sellingPrice" ? "number" : "text"} min={field === "mrp" || field === "sellingPrice" ? "0" : undefined} step={field === "mrp" || field === "sellingPrice" ? "0.01" : undefined} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="h-10 w-full rounded-md border bg-background px-3 text-sm font-normal text-foreground" />
                        </label>
                    ))}
                    <label className="space-y-1 text-xs font-medium text-muted-foreground">Category
                        <select value={form.categoryId} onChange={(event) => setForm({ ...form, categoryId: event.target.value })} className="h-10 w-full rounded-md border bg-background px-3 text-sm text-foreground"><option value="">Uncategorized</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>
                    </label>
                    <button disabled={saving} className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50">{saving ? "Saving..." : "Add product"}</button>
                </form>
            )}
            {storeLoading ? <p className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">Loading products...</p> : products.length ? (
                <section className="overflow-x-auto rounded-xl border bg-card">
                    <table className="w-full min-w-[620px] text-sm">
                        <thead className="bg-muted/40 text-left text-muted-foreground"><tr><th className="px-4 py-3 font-medium">Product</th><th className="px-4 py-3 font-medium">SKU</th><th className="px-4 py-3 font-medium">Category</th><th className="px-4 py-3 text-right font-medium">Price</th></tr></thead>
                        <tbody className="divide-y">{products.map((product) => <tr key={product.id}><td className="px-4 py-3 font-medium">{product.name}</td><td className="px-4 py-3 text-muted-foreground">{product.sku}</td><td className="px-4 py-3">{product.category?.name || "—"}</td><td className="px-4 py-3 text-right">{Number(product.sellingPrice || 0).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</td></tr>)}</tbody>
                    </table>
                </section>
            ) : store ? <p className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">No products in this store yet.</p> : !storeLoading && <StoreRequired />}
        </main>
    );
}

export function StoreEmployees() {
    const { store, loading: storeLoading, error: storeError } = useStore();
    const [employees, setEmployees] = useState([]);
    const [branches, setBranches] = useState([]);
    const [employeesLoading, setEmployeesLoading] = useState(false);
    const [branchesLoading, setBranchesLoading] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [saving, setSaving] = useState(false);
    const [linking, setLinking] = useState(false);
    const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "", role: "ROLE_STORE_MANAGER", branchId: "" });
    const [linkForm, setLinkForm] = useState({ email: "", role: "ROLE_STORE_MANAGER", branchId: "" });
    const isStoreAdmin = getSessionUser()?.role === "ROLE_STORE_ADMIN";

    async function loadEmployees(storeId) {
        setEmployeesLoading(true);
        setError("");
        try {
            const response = await api.get(`/api/employees/store/${storeId}`, { headers: getAuthHeader() });
            setEmployees(Array.isArray(response.data) ? response.data : []);
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Unable to load employees.");
        } finally {
            setEmployeesLoading(false);
        }
    }
    async function loadBranches(storeId) {
        setBranchesLoading(true);
        try {
            const response = await api.get(`/api/branches/store/${storeId}`, { headers: getAuthHeader() });
            setBranches(Array.isArray(response.data) ? response.data : []);
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Unable to load store branches.");
        } finally {
            setBranchesLoading(false);
        }
    }
    useEffect(() => {
        if (store?.id) {
            loadEmployees(store.id);
            loadBranches(store.id);
        }
    }, [store?.id]);

    async function createEmployee(event) {
        event.preventDefault();
        setSaving(true);
        setError("");
        setNotice("");
        try {
            await api.post(`/api/employees/store/${store.id}`, {
                ...form,
                branchId: form.branchId ? Number(form.branchId) : null,
            }, { headers: getAuthHeader() });
            setForm({ fullName: "", email: "", phone: "", password: "", role: "ROLE_STORE_MANAGER", branchId: "" });
            setNotice("Employee account created.");
            await loadEmployees(store.id);
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Unable to create employee.");
        } finally {
            setSaving(false);
        }
    }
    async function linkEmployee(event) {
        event.preventDefault();
        setLinking(true);
        setError("");
        setNotice("");
        try {
            await api.post(`/api/employees/store/${store.id}/link`, {
                ...linkForm,
                branchId: linkForm.branchId ? Number(linkForm.branchId) : null,
            }, { headers: getAuthHeader() });
            setLinkForm({ email: "", role: "ROLE_STORE_MANAGER", branchId: "" });
            setNotice(linkForm.role === "ROLE_BRANCH_CASHIER" || linkForm.role === "ROLE_BRANCH_MANAGER"
                ? "Employee account connected and branch assignment saved."
                : "Employee account connected to this store.");
            await loadEmployees(store.id);
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Unable to link employee.");
        } finally {
            setLinking(false);
        }
    }
    async function removeEmployee(employee) {
        if (!window.confirm(`Remove ${employee.fullName}?`)) return;
        try {
            await api.delete(`/api/employees/${employee.id}`, { headers: getAuthHeader() });
            await loadEmployees(store.id);
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Unable to remove employee.");
        }
    }

    return (
        <main className="mx-auto max-w-7xl p-4 md:p-8">
            <PageHeader title="Employees" description="Manage employee accounts connected to this store." />
            <StoreNotice error={[storeError, error].filter(Boolean).join(" ")} notice={notice} />
            {isStoreAdmin && store && (
                <form onSubmit={createEmployee} className="mb-5 grid gap-3 rounded-xl border bg-card p-4 sm:grid-cols-2 xl:grid-cols-6">
                    {["fullName", "email", "phone", "password"].map((field) => (
                        <label key={field} className="space-y-1 text-xs font-medium capitalize text-muted-foreground">{field === "fullName" ? "Full name" : field}
                            <input required={field === "fullName" || field === "email" || field === "password"} type={field === "password" ? "password" : field === "email" ? "email" : "text"} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="h-10 w-full rounded-md border bg-background px-3 text-sm font-normal text-foreground" />
                        </label>
                    ))}
                    <label className="space-y-1 text-xs font-medium text-muted-foreground">Role
                        <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value, branchId: "" })} className="h-10 w-full rounded-md border bg-background px-3 text-sm text-foreground"><option value="ROLE_STORE_MANAGER">Store manager</option><option value="ROLE_BRANCH_MANAGER">Branch manager</option></select>
                    </label>
                    {form.role === "ROLE_BRANCH_MANAGER" && (
                        <label className="space-y-1 text-xs font-medium text-muted-foreground">Branch
                            <select required value={form.branchId} onChange={(event) => setForm({ ...form, branchId: event.target.value })} disabled={branchesLoading || !branches.length} className="h-10 w-full rounded-md border bg-background px-3 text-sm text-foreground">
                                <option value="">{branchesLoading ? "Loading branches..." : "Select a branch"}</option>
                                {branches.map((branch) => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
                            </select>
                        </label>
                    )}
                    <button disabled={saving || (form.role === "ROLE_BRANCH_MANAGER" && (!form.branchId || branchesLoading))} className="h-10 self-end rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50">{saving ? "Creating..." : "Add employee"}</button>
                </form>
            )}
            {isStoreAdmin && store && (
                <form onSubmit={linkEmployee} className="mb-5 grid gap-3 rounded-xl border bg-card p-4 sm:grid-cols-4">
                    <div className="sm:col-span-4">
                        <h3 className="font-semibold">Link an existing account</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Connect an employee account to this store, or assign a branch to an existing branch employee who is currently unassigned.</p>
                    </div>
                    <label className="space-y-1 text-xs font-medium text-muted-foreground">Employee email
                        <input required type="email" value={linkForm.email} onChange={(event) => setLinkForm({ ...linkForm, email: event.target.value })} className="h-10 w-full rounded-md border bg-background px-3 text-sm font-normal text-foreground" />
                    </label>
                    <label className="space-y-1 text-xs font-medium text-muted-foreground">Account role
                        <select value={linkForm.role} onChange={(event) => setLinkForm({ ...linkForm, role: event.target.value, branchId: "" })} className="h-10 w-full rounded-md border bg-background px-3 text-sm text-foreground">
                            <option value="ROLE_STORE_MANAGER">Store manager</option>
                            <option value="ROLE_BRANCH_MANAGER">Branch manager</option>
                            <option value="ROLE_BRANCH_CASHIER">Branch cashier</option>
                        </select>
                    </label>
                    {(linkForm.role === "ROLE_BRANCH_MANAGER" || linkForm.role === "ROLE_BRANCH_CASHIER") && (
                        <label className="space-y-1 text-xs font-medium text-muted-foreground">Branch
                            <select required value={linkForm.branchId} onChange={(event) => setLinkForm({ ...linkForm, branchId: event.target.value })} disabled={branchesLoading || !branches.length} className="h-10 w-full rounded-md border bg-background px-3 text-sm text-foreground">
                                <option value="">{branchesLoading ? "Loading branches..." : "Select a branch"}</option>
                                {branches.map((branch) => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
                            </select>
                        </label>
                    )}
                    <button disabled={linking || ((linkForm.role === "ROLE_BRANCH_MANAGER" || linkForm.role === "ROLE_BRANCH_CASHIER") && (!linkForm.branchId || branchesLoading))} className="h-10 self-end rounded-md border px-4 text-sm font-medium disabled:opacity-50">{linking ? "Linking..." : "Link account"}</button>
                </form>
            )}
            {storeLoading || employeesLoading ? <p className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">Loading employees...</p> : !store ? <StoreRequired /> : employees.length ? (
                <section className="divide-y rounded-xl border bg-card">
                    {employees.map((employee) => {
                        const branch = branches.find((item) => item.id === employee.branchId);
                        const isBranchEmployee = employee.role === "ROLE_BRANCH_MANAGER" || employee.role === "ROLE_BRANCH_CASHIER";
                        return <div key={employee.id} className="flex items-center justify-between gap-3 p-4"><div><p className="font-medium">{employee.fullName}</p><p className="text-sm text-muted-foreground">{employee.email} · {employee.role}{isBranchEmployee ? ` · ${branch?.name || "No branch assigned"}` : ""}</p></div>{isStoreAdmin && <button type="button" onClick={() => removeEmployee(employee)} className="rounded-md border px-3 py-2 text-sm text-destructive hover:bg-destructive/10">Remove</button>}</div>;
                    })}
                </section>
            ) : <p className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">No employees found.</p>}
        </main>
    );
}

export function StoreProfile() {
    const { store, loading, error: loadError } = useStore();
    const [form, setForm] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    useEffect(() => {
        if (store) setForm({
            brand: store.brand || "",
            storeType: store.storeType || "",
            description: store.description || "",
            contact: {
                address: store.contact?.address || "",
                email: store.contact?.email || "",
                phone: store.contact?.phone || "",
            },
        });
    }, [store]);

    async function saveProfile(event) {
        event.preventDefault();
        setSaving(true);
        setError("");
        setNotice("");
        try {
            await api.put(`/api/stores/${store.id}`, form, { headers: getAuthHeader() });
            setNotice("Store profile saved.");
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Unable to save profile.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <main className="mx-auto max-w-4xl p-4 md:p-8">
            <PageHeader title="Store profile" description="Update your store details and contact information." />
            <StoreNotice error={loadError || error} notice={notice} />
            {loading ? <p className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">Loading profile...</p> : form ? (
                <form onSubmit={saveProfile} className="space-y-4 rounded-xl border bg-card p-5">
                    {["brand", "storeType", "description"].map((field) => <label key={field} className="block space-y-1 text-sm font-medium capitalize">{field === "brand" ? "Store name" : field}<input required={field === "brand"} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="h-10 w-full rounded-md border bg-background px-3 font-normal" /></label>)}
                    <div className="grid gap-4 sm:grid-cols-3">{["address", "phone", "email"].map((field) => <label key={field} className="block space-y-1 text-sm font-medium capitalize">{field}<input type={field === "email" ? "email" : "text"} value={form.contact[field]} onChange={(event) => setForm({ ...form, contact: { ...form.contact, [field]: event.target.value } })} className="h-10 w-full rounded-md border bg-background px-3 font-normal" /></label>)}</div>
                    <button disabled={saving || getSessionUser()?.role !== "ROLE_STORE_ADMIN"} className="h-10 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground disabled:opacity-50">{saving ? "Saving..." : "Save profile"}</button>
                    {getSessionUser()?.role !== "ROLE_STORE_ADMIN" && <p className="text-sm text-muted-foreground">Only a store administrator can edit this profile.</p>}
                </form>
            ) : <StoreRequired />}
        </main>
    );
}
