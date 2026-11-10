import { X } from 'lucide-react';
import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button';

const Sidebar= ({navItems, onClose})=>{
    return (

        <div className='w-64 border-r border-border bg-sidebar p-4 
        flex flex-col h-full relative'>

            <div className='flex items-center justify-between'>
                <h1  className='text-xl font-bold text-sidebar-foreground'>
                    POS SYSTEM
                </h1>
                <Button onClick={onClose} size={"icon"}> 
                    <X/> 
                </Button>
            </div>

            <nav aria-label="Cashier navigation" className="mt-6 flex flex-col gap-2">
                {navItems.map(({ path, icon, label }) => (
                    <NavLink
                        key={path}
                        to={path}
                        end={path === '/cashier'}
                        onClick={onClose}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                isActive
                                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                            }`
                        }
                    >
                        {icon}
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

        </div>
    )
}

export default Sidebar;
