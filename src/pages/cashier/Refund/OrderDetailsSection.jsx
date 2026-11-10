import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeftIcon } from "lucide-react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table';
const OrderDetailsSection =({handleSelectOrder , selectedOrder})=>{
    const items = Array.isArray(selectedOrder?.items) ? selectedOrder.items : [];

    return(
        <div className="w-1/2 border-r p-4 p-card ">
            <div className="mb-4">
                <Button className='gap-2'onClick={()=>handleSelectOrder(null)} ><ChevronLeftIcon/>  back to Order</Button>
            </div>

            <Card>
                <CardContent>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="font-semibold text-lg">Order {selectedOrder.id}</h2>
                            <p>{selectedOrder.createdAt}</p>
                        </div>
                        <div>{selectedOrder.paymenttype}</div>
                        {/* <Badge variant={"outline"}>
                                {selectedOrder.paymenttype}
                        </Badge> */}
                    </div>
                    <div className="mb-4">
                        <h3 className="font-medium text-sm text-muted-foreground">{selectedOrder?.customer?.fullName}</h3>
                        <h3 className="text-sm">{selectedOrder?.customer?.phone}</h3>
                    </div>
                    <div>
                        <h2 className="font-medium text-sm text-muted-foreground">Order Summary</h2>
                    </div>
                    <div className='text-sm'>
                        <div className="flex justify-between">
                            <span>Total Items: {items.length}</span>
                        </div>
                        <div>
                            <span>
                                Order Total:💲{selectedOrder.totalAmount}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex-1 overflow-auto mt-5">
                <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                                
                            

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">
                                            Image
                                        </TableHead>

                                        <TableHead className="w-[180px]">
                                            Item
                                        </TableHead>

                                        <TableHead className="w-[100px]">
                                            Quantity
                                        </TableHead>

                                        <TableHead className="text-right">
                                            Price
                                        </TableHead>

                                        <TableHead className="text-right">
                                            Total
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {items.length > 0 ? (
                                        items.map((item, index) => {
                                            const product = item.product || {};

                                            // Support common image field names
                                            const productImage =
                                                product.image ||
                                                product.images?.[0] ||
                                                product.imageUrl ||
                                                item.image ||
                                                '';

                                            // Support common product-name fields
                                            const productName =
                                                product.name ||
                                                item.name ||
                                                'Unknown Item';

                                            // Use the saved order price when available
                                            const price = Number(
                                                item.price ??
                                                item.unitPrice ??
                                                product.sellingPrice ??
                                                0
                                            );

                                            const quantity = Number(
                                                item.quantity ?? 0
                                            );

                                            const total = price * quantity;

                                            return (
                                                <TableRow
                                                    key={
                                                        item._id ||
                                                        item.id ||
                                                        `${product._id || productName}-${index}`
                                                    }
                                                >
                                                    {/* Product Image */}
                                                    <TableCell>
                                                        <div className="w-11 h-11">
                                                            {productImage ? (
                                                                <img
                                                                    src={productImage}
                                                                    alt={productName}
                                                                    className="w-11 h-11 object-cover rounded-md"
                                                                />
                                                            ) : (
                                                                <div className="w-11 h-11 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                                                                    No image
                                                                </div>
                                                            )}
                                                        </div>
                                                    </TableCell>

                                                    {/* Product Details */}
                                                    <TableCell>
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">
                                                                {productName.length > 20
                                                                    ? `${productName.slice(0, 20)}...`
                                                                    : productName}
                                                            </span>

                                                            <span className="text-xs text-gray-500">
                                                                SKU:{' '}
                                                                {product.sku ||
                                                                    item.sku ||
                                                                    'N/A'}
                                                            </span>
                                                        </div>
                                                    </TableCell>

                                                    {/* Quantity */}
                                                    <TableCell>
                                                        {quantity}
                                                    </TableCell>

                                                    {/* Unit Price */}
                                                    <TableCell className="text-right">
                                                        ₹{price.toFixed(2)}
                                                    </TableCell>

                                                    {/* Item Total */}
                                                    <TableCell className="text-right">
                                                        ₹{total.toFixed(2)}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={5}
                                                className="text-center py-6 text-muted-foreground"
                                            >
                                                No order items found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
      
            </div>


        </div>

    )
}

export default OrderDetailsSection