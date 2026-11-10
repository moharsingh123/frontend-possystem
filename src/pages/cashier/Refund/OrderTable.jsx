// import React from 'react';

// const OrderTable=()=>{
//     return(
//         <div>OrderTable</div>
//     )
// }
// export default OrderTable;

import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table'
const Orders=[
    {
        id:1,
        createdAt:'2023-06-01 10:30 AM',
        customer:{
            fullName:"Munna Bhaiya",
            phone:"8659874563"
        },
        
        totalAmount:450,
        paymenttype:'CASH',
        status:'COMPLETED',
        items:[
            {
                id:2,
                product:{
                    image:"https://images.unsplash.com/photo-1547592180-85f173990554?w=88&h=88&fit=crop",
                    name:"Product 1",
                    sku:"P001",
                    sellingPrice:225,
                },
                quantity:2,

            }
        ]
    }
]
const OrderTable = ({ handleSelectOrder }) => {
    return (
        <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className=''>Order Id</TableHead>
                                <TableHead className=''>Date/Time</TableHead>
                                <TableHead className=''>Customer</TableHead>
                                <TableHead className=''>Amount</TableHead>
                                <TableHead className=''>Payment Type</TableHead>
                                <TableHead className=''>Status</TableHead>
                                <TableHead className='text-right'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.createdAt}</TableCell>
                                    <TableCell>{order.customer.fullName}</TableCell>
                                    <TableCell className=''>₹{order.totalAmount}</TableCell>
                                    <TableCell>{order.paymenttype}</TableCell>
                                    <TableCell>{order.status}</TableCell>

                                    <TableCell className="text-right p-card">
                                       
                                            <Button                 
                                                size="sm"
                                                onClick={() => handleSelectOrder(order)}
                                                title="View Order Details"
                                            >
                                                Select for return 
                                            </Button>

             
                                       
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
        </div>  
    )
}

export default OrderTable