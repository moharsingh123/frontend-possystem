import { useEffect, useState } from "react";
import { EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";
import { getSessionUser } from "@/utils/session";

const OrderTable = ({ handleviewOrderDetails }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadOrders() {
            setLoading(true);
            setError("");

            try {
                let cashier = getSessionUser();
                if (!cashier?.id) {
                    const profileResponse = await api.get("/api/users/profile", {
                        headers: getAuthHeader(),
                    });
                    cashier = profileResponse.data;
                    localStorage.setItem("user", JSON.stringify(cashier));
                }
                if (!cashier?.id) {
                    throw new Error("Unable to identify the signed-in cashier.");
                }

                const response = await api.get(`/api/orders/cashier/${cashier.id}`, {
                    headers: getAuthHeader(),
                });
                if (!cancelled) {
                    setOrders(Array.isArray(response.data) ? response.data : []);
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

    if (loading) {
        return <p className="p-4 text-sm text-muted-foreground">Loading order history...</p>;
    }

    if (error) {
        return <p role="alert" className="p-4 text-sm text-destructive">{error}</p>;
    }

    if (orders.length === 0) {
        return <p className="p-4 text-sm text-muted-foreground">No orders found.</p>;
    }

    return (
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
                {orders.map((order) => (
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
    );
};

export default OrderTable;
