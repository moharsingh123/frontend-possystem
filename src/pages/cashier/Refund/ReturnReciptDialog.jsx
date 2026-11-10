import { useState } from "react"
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table';

import { Printer3dIcon } from "lucide-react";

const ReturnReciptDialog= ({
    showReturnReciptDialog,
    setShowReturnReciptDialog,
    selectedOrder
})=>{
    const items = Array.isArray(selectedOrder?.items) ? selectedOrder.items : [];
    const [receiptDate] = useState(() => new Date());
    const receiptNumber = receiptDate.getTime().toString().slice(-8);

    return(
        <Dialog open={showReturnReciptDialog} onOpenChange={setShowReturnReciptDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Return Recipt
                    </DialogTitle>
                </DialogHeader>
            <div className="bg-background max-h-96 overflow-y-auto">
                <div>
                    <h3 className="font-bold text-lg">SUPER-MART</h3>
                    <p>khailar BHEL Jhansi UP</p>
                    <p>Tel; 8985741220</p>

                </div>
                <div className="text-center mb-4">
                    <h4 className="font-bold">Return Recipt</h4>
                </div>
                
                <div className="">
                    <p>Return #: RTN-{receiptNumber}</p>
                    <p>Original Order: {selectedOrder.id}</p>
                     <p>Date :{receiptDate.toLocaleString()}</p>
                     <p>Customer: {selectedOrder?.customer?.fullName}</p>
                </div>
                
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
                 <DialogFooter>
                    <Button>
                        <Printer3dIcon className="h-4 w-4" />
                        Print & Complete
                    </Button>
                 </DialogFooter>

            </div>
            </DialogContent>
        </Dialog>
        
    )
}

export default ReturnReciptDialog