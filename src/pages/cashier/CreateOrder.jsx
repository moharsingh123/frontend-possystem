import { useCallback, useEffect, useMemo, useState } from "react";
import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";
import { getSessionUser } from "@/utils/session";
import CartSection from "./CartSection/CartSection";
import CustomerPaymentSection from "./CustomerPaymentSection/CustomerPaymentSection";
import ProductSection from "./ProductSection/ProductSection";

export default function CreateOrder() {
    const [products, setProducts] = useState([]);
    const [stockByProduct, setStockByProduct] = useState({});
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [paymentType, setPaymentType] = useState("CASH");
    const total = useMemo(
        () => cart.reduce((sum, item) => sum + Number(item.sellingPrice) * item.quantity, 0),
        [cart],
    );

    useEffect(() => {
        let cancelled = false;
        async function loadProducts() {
            setLoading(true);
            setError("");
            
            try {
                const headers = getAuthHeader();
                let cashier = getSessionUser();
                if (!cashier?.branchId) {
                    const profileResponse = await api.get("/api/users/profile", { headers });
                    cashier = profileResponse.data;
                    localStorage.setItem("user", JSON.stringify(cashier));
                }
                if (!cashier?.branchId) {
                    throw new Error("Your account is not assigned to a branch. Ask an administrator to assign one.");
                }

                const branchResponse = await api.get(`/api/branches/${cashier.branchId}`, { headers });
                const storeId = branchResponse.data?.storeId ?? branchResponse.data?.store?.id;
                if (!storeId) {
                    throw new Error("The cashier's branch is not linked to a store.");
                }

                const [productResponse, inventoryResponse] = await Promise.all([
                    api.get(`/api/products/store/${storeId}`, { headers }),
                    api.get(`/api/inventories/branch/${cashier.branchId}`, { headers }),
                ]);
                if (!cancelled) {
                    setProducts(Array.isArray(productResponse.data) ? productResponse.data : []);
                    const inventory = Array.isArray(inventoryResponse.data) ? inventoryResponse.data : [];
                    setStockByProduct(Object.fromEntries(inventory.map((entry) => [entry.productId, entry.quantity])));
                }
            } catch (loadError) {
                if (!cancelled) {
                    setError(loadError.response?.data?.message || loadError.message || "Unable to load products.");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        loadProducts();
        return () => { cancelled = true; };
    }, []);

    const addToCart = useCallback((product) => {
        setError("");
        setSuccess("");
        const stock = stockByProduct[product.id];
        const existing = cart.find((item) => item.id === product.id);
        const nextQuantity = (existing?.quantity ?? 0) + 1;
        if (Number.isFinite(stock) && nextQuantity > stock) {
            setError(`Only ${stock} unit(s) of ${product.name} are in stock.`);
            return;
        }
        setCart((current) => {
            const currentItem = current.find((item) => item.id === product.id);
            return currentItem
                ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
                : [...current, { ...product, quantity: 1 }];
        });
    }, [cart, stockByProduct]);

    function updateQuantity(productId, quantity) {
        const stock = stockByProduct[productId];
        if (quantity > (stock ?? Infinity)) {
            setError(`Only ${stock} unit(s) of this product are in stock.`);
            return;
        }
        setError("");
        setCart((current) => quantity < 1
            ? current.filter((item) => item.id !== productId)
            : current.map((item) => item.id === productId ? { ...item, quantity } : item));
    }

    async function submitOrder() {
        if (!cart.length) {
            setError("Add at least one product before completing the order.");
            return;
        }
        setSubmitting(true);
        setError("");
        setSuccess("");
        try {
            const payload = {
                paymentType,
                customer: selectedCustomer ? { id: Number(selectedCustomer.id) } : null,
                items: cart.map((item) => ({
                    productId: Number(item.id),
                    quantity: item.quantity,
                })),
            };
            const response = await api.post("/api/orders", payload, { headers: getAuthHeader() });
            setCart([]);
            setSelectedCustomer(null);
            setSuccess(`Order #${response.data.id} completed successfully.`);
        } catch (submitError) {
            setError(submitError.response?.data?.message || submitError.message || "Unable to complete the order.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="mx-auto w-full max-w-[1500px] p-4 md:p-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-bold">Create order</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Choose products, attach a customer, and take payment.</p>
                </div>
                <p className="text-sm text-muted-foreground">{cart.reduce((sum, item) => sum + item.quantity, 0)} items in cart</p>
            </div>
            {error && <p role="alert" className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
            {success && <p role="status" className="mb-4 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800">{success}</p>}

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(340px,0.9fr)]">
                <ProductSection
                    products={products}
                    stockByProduct={stockByProduct}
                    loading={loading}
                    onAdd={addToCart}
                />
                <div className="space-y-5">
                    <CartSection items={cart} onQuantityChange={updateQuantity} />
                    <CustomerPaymentSection
                        customer={selectedCustomer}
                        onCustomerChange={setSelectedCustomer}
                        paymentType={paymentType}
                        onPaymentTypeChange={setPaymentType}
                        total={total}
                        submitting={submitting}
                        onSubmit={submitOrder}
                    />
                </div>
            </div>
        </main>
    );
}
