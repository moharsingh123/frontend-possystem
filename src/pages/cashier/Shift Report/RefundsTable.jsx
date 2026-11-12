import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export default function RefundsTable({ shift }) {
    const refunds = shift?.refunds || [];
    return (
        <Card>
            <CardContent>
                <h2 className="mb-4 text-xl font-semibold">Recent Refunds</h2>
                {refunds.length ? (
                    <Table>
                        <TableHeader><TableRow><TableHead>Refund ID</TableHead><TableHead>Order ID</TableHead><TableHead>Time</TableHead><TableHead>Reason</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                        <TableBody>{refunds.map((refund) => (
                            <TableRow key={refund.id}>
                                <TableCell>{refund.id}</TableCell>
                                <TableCell>{refund.orderId ?? "—"}</TableCell>
                                <TableCell>{refund.createdAt ? new Date(refund.createdAt).toLocaleString() : "—"}</TableCell>
                                <TableCell>{refund.reason || "—"}</TableCell>
                                <TableCell className="text-right">{currency.format(refund.amount ?? 0)}</TableCell>
                            </TableRow>
                        ))}</TableBody>
                    </Table>
                ) : <p className="text-sm text-muted-foreground">No refunds recorded for this shift yet.</p>}
            </CardContent>
        </Card>
    );
}
