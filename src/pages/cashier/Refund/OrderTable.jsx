import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table'
import { getCashierOrders } from '@/utils/cashierOrders';

const OrderTable = ({ handleSelectOrder }) => {
    const [orders, setOrders] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

        async function loadOrders() {
            try {
                const cashierOrders = await getCashierOrders();
                if (!cancelled) setOrders(cashierOrders);
            } catch (loadError) {
                if (!cancelled) {
                    setError(loadError.response?.data?.message || loadError.message || 'Unable to load orders.');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadOrders();
        return () => {
            cancelled = true;
        };
    }, []);

    const normalizedQuery = query.trim().toLowerCase();
    const filteredOrders = orders.filter((order) => (
        String(order.id ?? '').toLowerCase().includes(normalizedQuery)
        || (order.customer?.fullName ?? '').toLowerCase().includes(normalizedQuery)
    ));

    return (
        <div className="space-y-4 p-4">
            <div className="flex h-10 max-w-md items-center gap-2 rounded-md border bg-background px-3">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <input
                    type="search"
                    aria-label="Search orders for return or refund"
                    placeholder="Search by order ID or customer name"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
                {query && (
                    <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
                        <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                )}
            </div>
            {loading ? (
                <p className="p-4 text-sm text-muted-foreground">Loading orders...</p>
            ) : error ? (
                <p role="alert" className="p-4 text-sm text-destructive">{error}</p>
            ) : filteredOrders.length === 0 ? (
                <p className="p-4 text-sm text-muted-foreground">
                    {orders.length ? 'No orders match your search.' : 'No orders available for return or refund.'}
                </p>
            ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className=''>Order Id</TableHead>
                                <TableHead className=''>Date/Time</TableHead>
                                <TableHead className=''>Customer</TableHead>
                                <TableHead className=''>Amount</TableHead>
                                <TableHead className=''>Payment Type</TableHead>
                                <TableHead className=''>Status</TableHead>
                                <TableHead className='text-right'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.createdAt ? new Date(order.createdAt).toLocaleString() : '—'}</TableCell>
                                    <TableCell>{order.customer?.fullName || 'Walk-in customer'}</TableCell>
                                    <TableCell className=''>₹{Number(order.totalAmount || 0).toFixed(2)}</TableCell>
                                    <TableCell>{order.paymentType || '—'}</TableCell>
                                    <TableCell>{order.status || 'Completed'}</TableCell>

                                    <TableCell className="text-right p-card">
                                        <Button
                                            size="sm"
                                            onClick={() => handleSelectOrder(order)}
                                            title="Select order for return"
                                        >
                                            Select for return
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            )}
        </div>  
    )
}

export default OrderTable