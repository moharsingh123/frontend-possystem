import { useEffect, useState } from "react";
import { EyeIcon, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getCashierOrders } from "@/utils/cashierOrders";

const OrderTable = ({ handleviewOrderDetails }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadOrders() {
            setLoading(true);
            setError("");

            try {
                const cashierOrders = await getCashierOrders();
                if (!cancelled) {
                    setOrders(cashierOrders);
                }
            } catch (loadError) {
                if (!cancelled) {
                    setError(loadError.response?.data?.message || loadError.message || "Unable to load order history.");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadOrders();
        return () => {
            cancelled = true;
        };
    }, []);

    const normalizedQuery = query.trim().toLowerCase();
    const filteredOrders = orders.filter((order) => (
        String(order.id ?? "").toLowerCase().includes(normalizedQuery)
        || (order.customer?.fullName ?? "").toLowerCase().includes(normalizedQuery)
    ));

    return (
        <div className="space-y-4">
            <div className="flex h-10 max-w-md items-center gap-2 rounded-md border bg-background px-3">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <input
                    type="search"
                    aria-label="Search order history"
                    placeholder="Search by order ID or customer name"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
                {query && (
                    <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                        <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                )}
            </div>
            {loading ? (
                <p className="p-4 text-sm text-muted-foreground">Loading order history...</p>
            ) : error ? (
                <p role="alert" className="p-4 text-sm text-destructive">{error}</p>
            ) : filteredOrders.length === 0 ? (
                <p className="p-4 text-sm text-muted-foreground">
                    {orders.length ? "No orders match your search." : "No orders found."}
                </p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order Id</TableHead>
                            <TableHead>Date/Time</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Payment Type</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>
                                    {order.createdAt ? new Date(order.createdAt).toLocaleString() : "—"}
                                </TableCell>
                                <TableCell>{order.customer?.fullName || "Walk-in customer"}</TableCell>
                                <TableCell>₹{Number(order.totalAmount || 0).toFixed(2)}</TableCell>
                                <TableCell>{order.paymentType || "—"}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleviewOrderDetails(order)}
                                        title="View Order Details"
                                        aria-label={`View order ${order.id}`}
                                    >
                                        <EyeIcon className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default OrderTable;
