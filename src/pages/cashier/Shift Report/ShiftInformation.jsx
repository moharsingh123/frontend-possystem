import react from 'react'
import { Card, CardContent } from '../../../components/ui/card.jsx'

const shiftData={
    cashier :{
        fullName:"Mohar singh yadav"
    },
    shiftStart:"2024-06-01 09:00 AM",
    shiftEnd:"2024-06-01 05:00 PM"
}
const ShiftInformation= ()=>{
    return (
       <Card>
            <CardContent>
                <h2 className='text-xl font-semibold mb-4'>Shift Information</h2>

                <div className='space-y-2'>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Cashier:</span>
                        <span className='font-medium'>{shiftData.cashier.fullName}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Shift Start:</span>
                        <span className='font-medium'>{shiftData.shiftStart}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Shift End:</span>
                        <span className='font-medium'>{shiftData.shiftEnd}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground '>Duration:</span>
                        <span className='font-medium'>{"8 hours"}</span>
                    </div>

                </div>
            </CardContent>
       </Card>
    )
}

export default ShiftInformation