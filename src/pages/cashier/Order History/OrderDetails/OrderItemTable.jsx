
import React from 'react';

import { Card, CardContent } from '@/components/ui/card';

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table';

const OrderItemTable = ({ selectedOrder }) => {
    // Safely handle missing order items
    const items = Array.isArray(selectedOrder?.items)
        ? selectedOrder.items
        : [];

    return (
        <Card>
            <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-4">
                    Order Items
                </h2>

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

                                const quantity = Number(
                                    item.quantity ?? 0
                                );

                                const total = Number(
                                    item.totalPrice ??
                                    item.price ??
                                    (Number(item.unitPrice ?? product.sellingPrice ?? 0) * quantity)
                                );
                                const price = quantity > 0 ? total / quantity : 0;

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
            </CardContent>
        </Card>
    );
};

export default OrderItemTable;




// import React from 'react';
// import { Card, CardContent } from '@/components/ui/card'
// import {
//     Table,
//     TableHeader,
//     TableRow,
//     TableHead,
//     TableBody,
//     TableCell,
// } from '@/components/ui/table'

// const OrderItemTable= ({selectedOrder})=>{
//     return(
//             <Card>
//                 <CardContent>
//                     <h2 className='text-xl font-semibold mb-4'>Order Items</h2>
//                     <Table>
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead className='w-[150px]'>Image</TableHead>
//                                 <TableHead className='w-[150px]'>Item</TableHead>
//                                 <TableHead className='w-[100px]'>Quantity</TableHead>
//                                 <TableHead className='text-right'>price</TableHead>
//                                 <TableHead className='text-right'>Total</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {selectedOrder.items.map((item) => (
//                                 <TableRow key={item.id}>
//                                     <TableCell>
//                                         <div className='w-11 h-11'>
//                                             {item.product?.image && <img src={item.product.image} alt={item.name} 
//                                             className='w-11 h-11 object-cover rounded-md' />}
//                                         </div>
//                                     </TableCell>
//                                     <TableCell>
//                                         <div className='flex flex-col'>
//                                             <span className='font-medium'>{item.product?.name.slice(0,20)}...</span>
//                                             <span className='text-xs text-gray-500'>SKU: {item.product?.sku}</span>
//                                         </div>

//                                     </TableCell>
//                                     <TableCell>{item.quantity}</TableCell>
//                                     <TableCell>₹{item.product?.sellingPrice}</TableCell>
//                                     <TableCell className='text-right'>
//                                         ₹{(item.product?.sellingPrice * item.quantity).toFixed(2)}
//                                     </TableCell>
//                                     {/* <TableCell className='text-right'>₹{item.total}</TableCell> */}
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </CardContent>

//             </Card>
//     )
// }

// export default OrderItemTable;