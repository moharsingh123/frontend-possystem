import { Card, CardContent } from '@/components/ui/card'
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table'
const shiftData={
    refunds:[
        {
            id:1,
            orderId:101,
            reason:"Customer changed mind",
            createdAt:'2023-06-01 5:50 PM',
            amount:5000
        }
    ]
}

const RefundsTable= ()=>{
    return (
        <div>
                        <Card>
                            <CardContent>
                                <h2 className='text-xl font-semibold mb-4'>Recent Orders</h2>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className='w-[150px]'>Refund Id</TableHead>
                                            <TableHead className='w-[150px]'>Order Id</TableHead>
                                            <TableHead className='w-[150px]'>Time</TableHead>
                                            <TableHead className='w-[100px]'>Reason</TableHead>
                                            <TableHead className='text-right'>Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {shiftData.refunds.map((refund) => (
                                            <TableRow key={refund.id}>
                                                <TableCell>RED-{refund.id}</TableCell>
                                                <TableCell>ORD-{refund.orderId}</TableCell>
                                                <TableCell>{refund.createdAt}</TableCell>
                                                <TableCell>{refund.reason}</TableCell>
                                                <TableCell className='text-right'>₹{refund.amount}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
            
                        </Card>
        </div>
    )
}

export default RefundsTable