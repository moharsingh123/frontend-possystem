import { CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export default function PaymentSummaryCard({ shift }) {
    const summaries = shift?.paymentSummaries || [];
    return (
        <Card>
            <CardContent>
                <h2 className="mb-4 text-xl font-semibold">Payment Summary</h2>
                {summaries.length ? (
                    <div className="space-y-3">
                        {summaries.map((payment) => (
                            <div key={payment.type} className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"><CreditCard className="h-5 w-5" /></div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex justify-between gap-3"><span className="font-medium">{payment.type}</span><span className="font-bold">{currency.format(payment.totalAmount ?? 0)}</span></div>
                                    <div className="flex justify-between text-sm text-muted-foreground"><span>{payment.transactionCount ?? 0} transactions</span><span>{Number(payment.percentage ?? 0).toFixed(2)}%</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-sm text-muted-foreground">No payments recorded for this shift yet.</p>}
            </CardContent>
        </Card>
    );
}
