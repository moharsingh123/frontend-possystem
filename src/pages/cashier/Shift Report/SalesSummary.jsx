import { Card, CardContent } from "@/components/ui/card";

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export default function SalesSummary({ shift }) {
    return (
        <Card>
            <CardContent>
                <h2 className="mb-4 text-xl font-semibold">Sales Summary</h2>
                <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-muted-foreground">Total Orders:</span><span className="font-medium">{shift?.totalOrders ?? 0}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Total Sales:</span><span className="font-medium">{currency.format(shift?.totalSales ?? 0)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Total Refunds:</span><span className="font-medium text-red-500">−{currency.format(shift?.totalRefunds ?? 0)}</span></div>
                    <div className="flex justify-between border-t pt-2"><span className="text-muted-foreground">Net Sales:</span><span className="font-medium">{currency.format(shift?.netSale ?? 0)}</span></div>
                </div>
            </CardContent>
        </Card>
    );
}
