import { Card, CardContent } from '@/components/ui/card'
import { CreditCard } from 'lucide-react'
import react from 'react'

const shiftData={
    paymentSummary:[
        {
            type:"CASH",
            totalAmount:50000,
            transactionCount:7
        },
        {
            type:"CARD",
            totalAmount:5000,
            transactionCount:2
        },
        {
            type:"UPI",
            totalAmount:10000,
            transactionCount:10
        }
    ], 
    totalSales:55000,

}
const PaymentSummaryCard= ()=>{
    return (
        <Card>
            <CardContent> 
                <h2 className='text-xl font-semibold mb-4'>Payment Summary</h2>
                <div className='space-y-2'>
                    {shiftData.paymentSummary.map((payment)=>(
                        <div key={payment.type} className='flex justify-between items-center'>
                            <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-white mr-4'>
                            <CreditCard/>

                            </div>
                            <div className='flex-1'>
                                <div className="flex justify-between">
                                    <span className='font-medium'>{payment.type}</span>
                                    <span className='font-bold'>₹{payment.totalAmount} </span>
                                </div>
                                <div className='flex justify-between text-sm text-muted-foreground'>
                                    <span>{payment.transactionCount} transactions</span>
                                    <span>{(payment.totalAmount/shiftData.totalSales * 100).toFixed(2)}%</span>
                                </div>

                            </div>

                            {/* <span className='text-muted-foreground'>{payment.type}:</span>      
                            <span className='font-medium'>₹{payment.totalAmount} ({payment.transactionCount} transactions)</span> */}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default PaymentSummaryCard