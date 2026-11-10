import React, { useState } from 'react';
import OrderTable from './OrderTable';
import OrderDetailsSection from './OrderDetailsSection'
import ReturnItemsSection from './ReturnItemSection';
import ReturnReciptDialog from './ReturnReciptDialog';

// Structure of the RefundPage component
const RefundPage=()=>{
    const [selectedOrder , setSelectedOrder]= useState(null)
    const [showReturnReciptDialog , setShowReturnReciptDialog] = useState(false)
    const handleSelectOrder= (order)=>setSelectedOrder(order);

    
    return(
        <div className='h-full flex flex-col'>
            <div className='p-4 bg-card border-b'>
                <h1 className="text-2xl font-bold">Return/Refund</h1>

            </div>
            <div className='overflow-hidden'>
                {!selectedOrder ?(<OrderTable handleSelectOrder={handleSelectOrder}/>):
                    ( <div className='flex'>
                      <OrderDetailsSection handleSelectOrder={handleSelectOrder  } selectedOrder={selectedOrder}/>
                      <ReturnItemsSection selectedOrder={selectedOrder} setShowReturnReciptDialog={setShowReturnReciptDialog} />
                      </div>
                    )               
                
                
                }

            </div>
            {selectedOrder && (
                <ReturnReciptDialog 
                showReturnReciptDialog={showReturnReciptDialog} 
                setShowReturnReciptDialog={setShowReturnReciptDialog}
                selectedOrder={selectedOrder}
                />)}
        </div>
    )
}
export default RefundPage;