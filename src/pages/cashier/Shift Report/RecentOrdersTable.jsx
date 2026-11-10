import { Card, CardContent } from '@/components/ui/card'
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table'

const shiftData= {
    recentOrders:[
        {
            id:1,
            createdAt:'2023-06-01 10:30 AM',
            paymenttype:'CASH',
            totalAmount:5000
        },
        {
            id:2,
            createdAt:'2023-06-01 11:45 AM',
            paymenttype:'CARD',
            totalAmount:7500
        }
    ]
}
const RecentOrdersTable= ()=>{
    return (
        <div>
            <Card>
                <CardContent>
                    <h2 className='text-xl font-semibold mb-4'>Recent Orders</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[150px]'>Order Id</TableHead>
                                <TableHead className='w-[150px]'>Time</TableHead>
                                <TableHead className='w-[100px]'>Payment</TableHead>
                                <TableHead className='text-right'>Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {shiftData.recentOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.createdAt}</TableCell>
                                    <TableCell>{order.paymenttype}</TableCell>
                                    <TableCell className='text-right'>₹{order.totalAmount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>

            </Card>
        </div>
    )
}

export default RecentOrdersTable
