import React from 'react';
import OrderInformation from './OrderInformation.jsx';
import CustomerInformation from './CustomerInformation.jsx';
import OrderItemTable from './OrderItemTable.jsx';

// component
// order Information component
// customer Information component
// Order Items component
const OrderDetails = ({ selectedOrder }) => {
    return (
        <div>
            <div className='grid grid-cols-2 gap-4 mb-4'>
                <OrderInformation selectedOrder={selectedOrder}/>
                {/* <CustomerInformation selectedCustomer={selectedOrder.customer}/>/ */}
                <CustomerInformation selectedOrder={selectedOrder} />
            </div>
            <OrderItemTable selectedOrder={selectedOrder} />
        </div>


    )
}

export default OrderDetails;


















// const OrderDetails = ({ order }) => (
//     <dl className='mt-4 grid grid-cols-2 gap-4 text-sm'>
//         <div>
//             <dt className='text-muted-foreground'>Order ID</dt>
//             <dd className='font-medium'>{order.id}</dd>
//         </div>
//         <div>
//             <dt className='text-muted-foreground'>Date/Time</dt>
//             <dd className='font-medium'>{order.createdAt}</dd>
//         </div>
//         <div>
//             <dt className='text-muted-foreground'>Customer</dt>
//             <dd className='font-medium'>{order.customer.fullName}</dd>
//         </div>
//         <div>
//             <dt className='text-muted-foreground'>Payment Type</dt>
//             <dd className='font-medium'>{order.paymenttype}</dd>
//         </div>
//         <div>
//             <dt className='text-muted-foreground'>Status</dt>
//             <dd className='font-medium'>{order.status}</dd>
//         </div>
//         <div>
//             <dt className='text-muted-foreground'>Total</dt>
//             <dd className='font-medium'>₹{order.totalAmount}</dd>
//         </div>
//     </dl>
// );

// export default OrderDetails;