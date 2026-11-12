import { Card, CardContent } from "@/components/ui/card";

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export default function TopSellingItems({ shift }) {
    const products = shift?.topSellingProducts || [];
    return (
        <Card>
            <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Top Selling Items</h2>
                {products.length ? (
                    <div className="space-y-4">
                        {products.map((product, index) => (
                            <div key={product.id} className="flex items-center justify-between gap-4">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">{index + 1}</div>
                                    <p className="truncate font-medium">{product.name}</p>
                                </div>
                                <span className="shrink-0 font-semibold">{currency.format(product.sellingPrice ?? 0)}</span>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-sm text-muted-foreground">No product sales recorded for this shift yet.</p>}
            </CardContent>
        </Card>
    );
}
