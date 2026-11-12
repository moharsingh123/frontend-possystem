import { Card, CardContent } from "@/components/ui/card";

function formatDateTime(value) {
    return value ? new Date(value).toLocaleString() : "—";
}

function formatDuration(start, end) {
    if (!start) return "—";
    const durationMs = Math.max(0, new Date(end || Date.now()) - new Date(start));
    const totalMinutes = Math.floor(durationMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
}

export default function ShiftInformation({ shift }) {
    return (
        <Card>
            <CardContent>
                <h2 className="mb-4 text-xl font-semibold">Shift Information</h2>
                <div className="space-y-2">
                    <div className="flex justify-between gap-4"><span className="text-muted-foreground">Cashier:</span><span className="text-right font-medium">{shift?.cashier?.fullName || "—"}</span></div>
                    <div className="flex justify-between gap-4"><span className="text-muted-foreground">Shift Start:</span><span className="text-right font-medium">{formatDateTime(shift?.shiftStart)}</span></div>
                    <div className="flex justify-between gap-4"><span className="text-muted-foreground">Shift End:</span><span className="text-right font-medium">{shift?.shiftEnd ? formatDateTime(shift.shiftEnd) : "In progress"}</span></div>
                    <div className="flex justify-between gap-4"><span className="text-muted-foreground">Duration:</span><span className="text-right font-medium">{formatDuration(shift?.shiftStart, shift?.shiftEnd)}</span></div>
                </div>
            </CardContent>
        </Card>
    );
}
