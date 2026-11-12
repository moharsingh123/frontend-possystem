import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ShiftReportHeader({ shift, loading, onStart, onEnd, onLogout }) {
    const active = Boolean(shift && !shift.shiftEnd);
    return (
        <div className="border-b bg-card p-4">
            <div className="flex items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">Shift Summary</h1>
                {active ? (
                    <Button variant="destructive" className="flex items-center gap-2" disabled={loading} onClick={onEnd}>
                        <ArrowRight aria-hidden="true" />
                        {loading ? "Ending shift..." : "End Shift"}
                    </Button>
                ) : shift ? (
                    <Button variant="outline" disabled={loading} onClick={onLogout}>Sign Out</Button>
                ) : (
                    <Button className="flex items-center gap-2" disabled={loading} onClick={onStart}>
                        <Play aria-hidden="true" />
                        {loading ? "Starting shift..." : "Start Shift"}
                    </Button>
                )}
            </div>
        </div>
    );
}
