import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const CustomerInformation= ({selectedOrder})=>{
    return(
        <Card>
            <CardContent className='p-4'>
                <h3 className='font-semibold mb-2'>Customer Information</h3>
                <div className='space-y-1 text-sm'>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Name:</span>
                        <span>{selectedOrder.customer?.fullName || 'Walk-in customer'}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground'>
                            Phone: 
                        </span>
                        <span className={'capitalize'}>
                            {selectedOrder.customer?.phone || 'N/A'}
                        </span>
                    </div>


                </div>
            </CardContent>

        </Card>
    )
}

export default CustomerInformation;