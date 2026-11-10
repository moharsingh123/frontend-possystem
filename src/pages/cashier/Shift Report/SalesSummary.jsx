import { Card, CardContent } from '@/components/ui/card'
import react from 'react'
const shiftData={
    totalOrders:153   ,
    totalSales:89000,
    totalRefund:10000,
    netSales:50000
}
const SalesSummary= ()=>{
    return (
       <Card>
            <CardContent>
                <h2 className='text-xl font-semibold mb-4'>Sales Summary</h2>

                <div className='space-y-2'>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Total Orders:</span>
                        <span className='font-medium'>{shiftData.totalOrders}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Total Sales:</span>
                        <span className='font-medium'>{shiftData.totalSales}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground '>Total Refund:</span>
                        <span className='font-medium text-red-500 '>-₹{shiftData.totalRefund}</span>
                    </div>
                    <div className='flex justify-between border-t-2'>
                        <span className='text-muted-foreground'>Net Sales:</span>
                        <span className='font-medium  '>{shiftData.netSales}</span>
                    </div>

                </div>
            </CardContent>
       </Card>
    )
}

export default SalesSummary