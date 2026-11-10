import { Card, CardContent } from '@/components/ui/card'

const shiftData = {
topSellingProduct: [
{
id: 1,
name: "Coca Cola",
sellingPrice: 20,
quantity: 10,
},
{
id: 2,
name: "Maza",
sellingPrice: 40,
quantity: 5,
},
{
id: 3,
name: "Diet Coke",
sellingPrice: 70,
quantity: 8,
},
],
}

const TopSellingItems = () => {
return ( <Card> <CardContent className="p-6"> <h2 className="text-xl font-semibold mb-4">
Top Selling Items </h2>

            <div className="space-y-4">
                {shiftData.topSellingProduct.map((product, index) => (
                    <div
                        key={product.id}
                        className="flex items-center justify-between gap-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                                {index + 1}
                            </div>

                            <div>
                                <p className="font-medium">
                                    {product.name}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    {product.quantity} units sold
                                </p>
                            </div>
                        </div>

                        <span className="font-semibold">
                            ₹{product.sellingPrice}
                        </span>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)


}

export default TopSellingItems
