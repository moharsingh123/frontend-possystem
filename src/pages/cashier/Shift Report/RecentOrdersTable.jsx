import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export default function RecentOrdersTable({ shift }) {
    const orders = shift?.recentOrders || [];
    return (
        <Card>
            <CardContent>
                <h2 className="mb-4 text-xl font-semibold">Recent Orders</h2>
                {orders.length ? (
                    <Table>
                        <TableHeader><TableRow><TableHead>Order ID</TableHead><TableHead>Time</TableHead><TableHead>Payment</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                        <TableBody>{orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.createdAt ? new Date(order.createdAt).toLocaleString() : "—"}</TableCell>
                                <TableCell>{order.paymentType || "—"}</TableCell>
                                <TableCell className="text-right">{currency.format(order.totalAmount ?? 0)}</TableCell>
                            </TableRow>
                        ))}</TableBody>
                    </Table>
                ) : <p className="text-sm text-muted-foreground">No orders recorded for this shift yet.</p>}
            </CardContent>
        </Card>
    );
}
