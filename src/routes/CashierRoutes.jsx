import React from 'react';
import { Route, Routes } from 'react-router';
import CashierDashboardLayout from '@/pages/cashier/CashierDashboardLayout'
import CreateOrder from '@/pages/cashier/CreateOrder'
import OrderHistory from '@/pages/cashier/Order History/orderHistory';
import CustomerLookup from '@/pages/cashier/Customer Management/CustomerLookup'
import RefundPage from '@/pages/cashier/Refund/RefundPage';
import ShiftSummaryPage from '@/pages/cashier/Shift Report/ShiftSummaryPage';
const CashierRoutes= ()=>{
    return (
        <Routes>
            <Route element={<CashierDashboardLayout/>}>
                <Route index element={<CreateOrder/>}/>
                <Route path='orders' element={<OrderHistory/>}/>
                <Route path='customers' element={<CustomerLookup/>}/>
                <Route path='returns' element={<RefundPage/>}/>
                <Route path='shift-summary' element={<ShiftSummaryPage/>}/>
            </Route>
        </Routes>
    )
}

export default CashierRoutes;