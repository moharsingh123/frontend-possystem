import { Clock, ReceiptIcon, RotateCcw, ShoppingCart, UserRound } from 'lucide-react';
import { Outlet } from 'react-router';
import { useSidebar } from '../../../context/hook/useSidebar';
import { SidebarProvider } from '../../../context/SidebarProvider';
import POSHeader from './Header/POSHeader';
import Sidebar from './sidebar/Sidebar';
const navItems= [
    {
        path:'/cashier',
        icon:<ShoppingCart size={20}/>,
        label:"POS Terminal"
    },
    {
        path:'/cashier/orders',
        icon:<Clock size={20}/>,
        label:"Order History"
    },
    {
        path:'/cashier/customers',
        icon:<UserRound size={20}/>,
        label:"Customers"
    },
    {
        path:'/cashier/returns',
        icon:<RotateCcw size={20}/>,
        label:"Returns/Refund"
    },
    {
        path:'/cashier/shift-summary',
        icon:<ReceiptIcon size={20}/>,
        label:"Shift Summary"
    }
]
const LayoutContent= ()=>{
    const {sidebarOpen, setSidebarOpen} = useSidebar();
    return (
        <div className='flex h-screen bg-background'>

            {
                sidebarOpen && (
                    <button
                        type="button"
                        aria-label="Close navigation menu"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-20 bg-black/40"
                    />
                )
            }
            <div className={`fixed z-30 h-full transition-transform duration-200 ${sidebarOpen? "translate-x-0" :"-translate-x-full"}`}>
                <Sidebar navItems={navItems} onClose={()=>setSidebarOpen(false)}/>
            </ div>
            
            <div className='flex-1 overflow-auto'>
                <POSHeader/>
                <Outlet/>
            </div>
        </div>
    )
}

const CashierDashboardLayout =()=>{
    return(
        <SidebarProvider>
            <LayoutContent/>
        </SidebarProvider>
    )
}
export default CashierDashboardLayout;

// export default LayoutContent;