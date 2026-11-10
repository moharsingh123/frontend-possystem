import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

export default function CartSection({ items, onQuantityChange }) {
    const subtotal = items.reduce((sum, item) => sum + Number(item.sellingPrice) * item.quantity, 0);

    return (
        <section className="rounded-xl border bg-card p-4 md:p-5">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="font-semibold">Current order</h3>
                    <p className="text-sm text-muted-foreground">{items.length} product line(s)</p>
                </div>
                <ShoppingCart className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            </div>
            {!items.length ? (
                <p className="rounded-lg border border-dashed py-8 text-center text-sm text-muted-foreground">Your cart is empty.</p>
            ) : (
                <ul className="max-h-72 divide-y overflow-auto">
                    {items.map((item) => (
                        <li key={item.id} className="flex items-center justify-between gap-3 py-3">
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">{item.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {Number(item.sellingPrice).toLocaleString("en-IN", { style: "currency", currency: "INR" })} each
                                </p>
                            </div>
                            <div className="flex items-center gap-1">
                                <button type="button" aria-label={`Decrease ${item.name}`} onClick={() => onQuantityChange(item.id, item.quantity - 1)} className="rounded border p-1.5 hover:bg-muted">
                                    {item.quantity === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                                </button>
                                <span className="w-7 text-center text-sm">{item.quantity}</span>
                                <button type="button" aria-label={`Increase ${item.name}`} onClick={() => onQuantityChange(item.id, item.quantity + 1)} className="rounded border p-1.5 hover:bg-muted">
                                    <Plus className="h-3.5 w-3.5" />
                                </button>
                            </div>
                            <span className="w-20 text-right text-sm font-medium">
                                {(Number(item.sellingPrice) * item.quantity).toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-4 flex justify-between border-t pt-4 text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{subtotal.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
            </div>
        </section>
    );
}
