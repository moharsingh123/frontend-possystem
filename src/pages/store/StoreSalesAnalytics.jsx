import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart3, CircleDollarSign, ClipboardList, RotateCcw } from "lucide-react";
import { loadStoreAnalytics } from "@/Redux Toolkit/features/Store Anaylytics/storeAnalyticsThunk";

const currency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
});

function toDateInputValue(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getDefaultRange() {
    const end = new Date();
    const start = new Date(end);
    start.setDate(start.getDate() - 29);
    return { startDate: toDateInputValue(start), endDate: toDateInputValue(end) };
}

function amount(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
}

function MetricCard({ label, value, icon: Icon }) {
    return (
        <article className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
                <span>{label}</span>
                <Icon className="h-4 w-4" aria-hidden="true" />
            </div>
            <p className="mt-3 text-2xl font-bold">{value}</p>
        </article>
    );
}

function formatDate(value) {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? String(value).slice(0, 10)
        : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function StoreSalesAnalytics() {
    const dispatch = useDispatch();
    const { storeName, branches, reports, loading, error } = useSelector(
        (state) => state.storeAnalytics,
    );
    const [dateRange, setDateRange] = useState(getDefaultRange);
    const [appliedRange, setAppliedRange] = useState(getDefaultRange);
    const [rangeError, setRangeError] = useState("");

    useEffect(() => {
        dispatch(loadStoreAnalytics(appliedRange));
    }, [dispatch, appliedRange]);

    const totals = useMemo(() => reports.reduce((result, report) => {
        const sales = amount(report.totalSales);
        const refunds = amount(report.totalRefunds);
        result.sales += sales;
        result.refunds += refunds;
        result.netSales += report.netSale == null ? sales - refunds : amount(report.netSale);
        result.orders += amount(report.totalOrders);
        return result;
    }, { sales: 0, refunds: 0, netSales: 0, orders: 0 }), [reports]);

    const dailySales = useMemo(() => {
        const byDay = new Map();
        reports.forEach((report) => {
            const day = String(report.shiftStart || "").slice(0, 10);
            if (!day) return;
            const current = byDay.get(day) || 0;
            const sales = report.netSale == null
                ? amount(report.totalSales) - amount(report.totalRefunds)
                : amount(report.netSale);
            byDay.set(day, current + sales);
        });
        return Array.from(byDay, ([day, netSales]) => ({ day, netSales }))
            .sort((a, b) => a.day.localeCompare(b.day))
            .slice(-14);
    }, [reports]);

    const branchTotals = useMemo(() => {
        const totalsByBranch = new Map(
            branches.map((branch) => [String(branch.id), {
                id: branch.id,
                name: branch.name || `Branch #${branch.id}`,
                sales: 0,
                refunds: 0,
                netSales: 0,
                orders: 0,
            }]),
        );
        reports.forEach((report) => {
            const key = String(report.branchId ?? report.branch?.id ?? "");
            const branch = totalsByBranch.get(key);
            if (!branch) return;
            const sales = amount(report.totalSales);
            const refunds = amount(report.totalRefunds);
            branch.sales += sales;
            branch.refunds += refunds;
            branch.netSales += report.netSale == null ? sales - refunds : amount(report.netSale);
            branch.orders += amount(report.totalOrders);
        });
        return Array.from(totalsByBranch.values())
            .sort((a, b) => b.netSales - a.netSales);
    }, [branches, reports]);

    const paymentTotals = useMemo(() => {
        const totalsByType = new Map();
        reports.forEach((report) => {
            (report.paymentSummaries || []).forEach((summary) => {
                const type = summary.type || "Other";
                const current = totalsByType.get(type) || { type, amount: 0, transactions: 0 };
                current.amount += amount(summary.totalAmount);
                current.transactions += amount(summary.transactionCount);
                totalsByType.set(type, current);
            });
        });
        return Array.from(totalsByType.values())
            .sort((a, b) => b.amount - a.amount);
    }, [reports]);

    function applyDateRange(event) {
        event.preventDefault();
        if (!dateRange.startDate || !dateRange.endDate || dateRange.startDate > dateRange.endDate) {
            setRangeError("Choose a valid date range.");
            return;
        }
        setRangeError("");
        setAppliedRange({ ...dateRange });
    }

    const maxDailySales = Math.max(0, ...dailySales.map((item) => item.netSales));

    return (
        <main className="mx-auto max-w-7xl p-4 md:p-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Sales analytics</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {storeName ? `${storeName} · ` : ""}Sales reported by branch shifts.
                    </p>
                </div>
                <form onSubmit={applyDateRange} className="flex flex-wrap items-end gap-3 rounded-xl border bg-card p-3">
                    <label className="space-y-1 text-xs font-medium text-muted-foreground">
                        From
                        <input
                            type="date"
                            value={dateRange.startDate}
                            max={dateRange.endDate}
                            onChange={(event) => setDateRange({ ...dateRange, startDate: event.target.value })}
                            className="h-9 rounded-md border bg-background px-2 text-sm text-foreground"
                        />
                    </label>
                    <label className="space-y-1 text-xs font-medium text-muted-foreground">
                        To
                        <input
                            type="date"
                            value={dateRange.endDate}
                            min={dateRange.startDate}
                            onChange={(event) => setDateRange({ ...dateRange, endDate: event.target.value })}
                            className="h-9 rounded-md border bg-background px-2 text-sm text-foreground"
                        />
                    </label>
                    <button
                        type="submit"
                        disabled={loading}
                        className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"
                    >
                        {loading ? "Loading..." : "Apply"}
                    </button>
                </form>
            </div>

            {rangeError && <p role="alert" className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{rangeError}</p>}
            {error && <p role="alert" className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
            {loading && <p role="status" className="mb-4 text-sm text-muted-foreground">Loading sales reports...</p>}

            <section aria-label="Sales totals" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard label="Gross sales" value={currency.format(totals.sales)} icon={CircleDollarSign} />
                <MetricCard label="Refunds" value={currency.format(totals.refunds)} icon={RotateCcw} />
                <MetricCard label="Net sales" value={currency.format(totals.netSales)} icon={BarChart3} />
                <MetricCard label="Orders" value={totals.orders.toLocaleString("en-IN")} icon={ClipboardList} />
            </section>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
                <section className="rounded-xl border bg-card p-5">
                    <h3 className="font-semibold">Net sales trend</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Daily net sales for the selected period (up to 14 days shown).</p>
                    {dailySales.length ? (
                        <div className="mt-6 flex h-52 items-end gap-2" role="img" aria-label="Daily net sales bar chart">
                            {dailySales.map(({ day, netSales }) => {
                                const height = maxDailySales > 0
                                    ? Math.max(4, (Math.max(0, netSales) / maxDailySales) * 100)
                                    : 4;
                                return (
                                    <div key={day} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2" title={`${formatDate(day)}: ${currency.format(netSales)}`}>
                                        <div className="w-full rounded-t bg-primary/80" style={{ height: `${height}%` }} />
                                        <span className="text-center text-[10px] text-muted-foreground">{new Date(`${day}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                                    </div>
                                );
                            })}
                        </div>
                    ) : <p className="mt-6 rounded-lg bg-muted/40 p-6 text-sm text-muted-foreground">No shift sales reports in this date range.</p>}
                </section>

                <section className="rounded-xl border bg-card p-5">
                    <h3 className="font-semibold">Payment methods</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Totals from shift payment summaries.</p>
                    {paymentTotals.length ? (
                        <div className="mt-4 divide-y">
                            {paymentTotals.map((payment) => (
                                <div key={payment.type} className="flex items-center justify-between gap-4 py-3">
                                    <div>
                                        <p className="font-medium">{payment.type}</p>
                                        <p className="text-xs text-muted-foreground">{payment.transactions} transactions</p>
                                    </div>
                                    <p className="font-semibold">{currency.format(payment.amount)}</p>
                                </div>
                            ))}
                        </div>
                    ) : <p className="mt-6 rounded-lg bg-muted/40 p-6 text-sm text-muted-foreground">No payment summaries available for this date range.</p>}
                </section>
            </div>

            <section className="mt-6 overflow-hidden rounded-xl border bg-card">
                <div className="border-b p-5">
                    <h3 className="font-semibold">Branch performance</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Sales aggregated from each branch’s shift reports.</p>
                </div>
                {branchTotals.length ? (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[620px] text-sm">
                            <thead className="bg-muted/40 text-left text-muted-foreground">
                                <tr><th className="px-4 py-3 font-medium">Branch</th><th className="px-4 py-3 text-right font-medium">Gross sales</th><th className="px-4 py-3 text-right font-medium">Refunds</th><th className="px-4 py-3 text-right font-medium">Net sales</th><th className="px-4 py-3 text-right font-medium">Orders</th></tr>
                            </thead>
                            <tbody className="divide-y">
                                {branchTotals.map((branch) => (
                                    <tr key={branch.id}>
                                        <td className="px-4 py-3 font-medium">{branch.name}</td>
                                        <td className="px-4 py-3 text-right">{currency.format(branch.sales)}</td>
                                        <td className="px-4 py-3 text-right">{currency.format(branch.refunds)}</td>
                                        <td className="px-4 py-3 text-right font-medium">{currency.format(branch.netSales)}</td>
                                        <td className="px-4 py-3 text-right">{branch.orders.toLocaleString("en-IN")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : <p className="p-6 text-sm text-muted-foreground">No branches are connected to this store.</p>}
            </section>

            <section className="mt-6 overflow-hidden rounded-xl border bg-card">
                <div className="border-b p-5">
                    <h3 className="font-semibold">Recent shift reports</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Latest reports included in the selected date range.</p>
                </div>
                {reports.length ? (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px] text-sm">
                            <thead className="bg-muted/40 text-left text-muted-foreground">
                                <tr><th className="px-4 py-3 font-medium">Date</th><th className="px-4 py-3 font-medium">Branch</th><th className="px-4 py-3 font-medium">Cashier</th><th className="px-4 py-3 text-right font-medium">Orders</th><th className="px-4 py-3 text-right font-medium">Gross sales</th><th className="px-4 py-3 text-right font-medium">Net sales</th></tr>
                            </thead>
                            <tbody className="divide-y">
                                {reports.slice(0, 10).map((report) => {
                                    const netSales = report.netSale == null
                                        ? amount(report.totalSales) - amount(report.totalRefunds)
                                        : amount(report.netSale);
                                    return (
                                        <tr key={report.id}>
                                            <td className="px-4 py-3">{formatDate(report.shiftStart)}</td>
                                            <td className="px-4 py-3">{report.branchName || `Branch #${report.branchId}`}</td>
                                            <td className="px-4 py-3">{report.cashier?.fullName || report.cashier?.email || `#${report.cashierId}`}</td>
                                            <td className="px-4 py-3 text-right">{amount(report.totalOrders).toLocaleString("en-IN")}</td>
                                            <td className="px-4 py-3 text-right">{currency.format(amount(report.totalSales))}</td>
                                            <td className="px-4 py-3 text-right font-medium">{currency.format(netSales)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : <p className="p-6 text-sm text-muted-foreground">No shift reports in this date range.</p>}
            </section>
        </main>
    );
}
