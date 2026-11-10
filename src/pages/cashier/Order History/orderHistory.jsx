import { useState } from 'react';
import OrderTable from './orderTable.jsx';
import OrderDetails from './OrderDetails/orderDetails.jsx';
import { Dialog } from '@base-ui/react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderHistory = () => {
    const [showOrderDetails, setShowOrderDetails] = useState(false);    
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleviewOrderDetails= (order)=>{
        setSelectedOrder(order);
        setShowOrderDetails(true);
    }

    return (
        <div className='h-full flex  flex-col flex-row'>
            <div className='flex-1 p-4 overflow-auto'>
                <OrderTable handleviewOrderDetails={handleviewOrderDetails} />
            </div>

            <Dialog.Root
                open={Boolean(selectedOrder)}
                onOpenChange={(open) => {
                    if (!open) setSelectedOrder(null);
                }}
            >
                <Dialog.Portal>
                    <Dialog.Backdrop className='fixed inset-0 bg-black/50' />
                    <Dialog.Popup className='fixed left-1/2 top-1/2 w-[min(56rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-6 shadow-lg'>
                        <Dialog.Title className='text-lg font-semibold'>
                            Order - Details
                        </Dialog.Title>
                        {selectedOrder && <OrderDetails selectedOrder={selectedOrder} />}
                        <div className='mt-6 flex justify-end'>
                            <Button>
                                <Download />
                                Download PDF
                            </Button>
                        </div>
                    </Dialog.Popup>
                </Dialog.Portal>
            </Dialog.Root>
        </div>  
    )
}

export default OrderHistory