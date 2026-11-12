import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "@/Redux Toolkit/features/Auth/authSlice";
import { endShift, getCurrentShiftProgress, getShiftReportByDate, startShift } from "@/Redux Toolkit/features/ShiftReport/shiftReportThunk";
import { getSessionUser } from "@/utils/session";
import PaymentSummaryCard from './PaymentSummaryCard.jsx';
import RecentOrdersTable from './RecentOrdersTable.jsx';
import RefundsTable from './RefundsTable.jsx';
import SalesSummary from './SalesSummary.jsx';
import ShiftInformation from './ShiftInformation.jsx';
import ShiftReportHeader from './ShiftReportHeader.jsx';
import TopSellingItems from './TopsSellingItems.jsx';

const ShiftSummaryPage=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentShift, selectedShift, loading, error } = useSelector((state) => state.shiftReport);

    useEffect(() => {
        async function loadShift() {
            try {
                await dispatch(getCurrentShiftProgress()).unwrap();
            } catch {
                const cashierId = getSessionUser()?.id;
                if (!cashierId) return;
                const now = new Date();
                const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
                try {
                    await dispatch(getShiftReportByDate({ cashierId, date })).unwrap();
                } catch {
                    // The rejected message is shown from the shift report state.
                }
            }
        }
        loadShift();
    }, [dispatch]);

    async function handleStartShift() {
        try {
            await dispatch(startShift()).unwrap();
        } catch {
            // The rejected message is shown from the shift report state.
        }
    }

    async function handleEndShift() {
        try {
            await dispatch(endShift()).unwrap();
        } catch {
            // The rejected message is shown from the shift report state.
        }
    }

    function handleLogout() {
        dispatch(logout());
        navigate("/login", { replace: true });
    }

    const shift = currentShift || selectedShift;

    return (
        <div className='h-full flex  flex-col'>
            <ShiftReportHeader shift={shift} loading={loading} onStart={handleStartShift} onEnd={handleEndShift} onLogout={handleLogout} />
            <div className='flex-1 overflow-auto p-4'>
                {error && <p role="alert" className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
                {loading && !currentShift ? (
                    <p className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">Loading current shift...</p>
                ) : shift ? (
                <div className='grid grid-cols-1 md:grid-cols-2  mb-6 gap-6'>
                    <ShiftInformation shift={shift}/>
                    <SalesSummary shift={shift}/>
                </div>
                ) : (
                    <p className="mb-6 rounded-xl border bg-card p-6 text-sm text-muted-foreground">No active shift was found. Start a shift to begin tracking sales, payments, orders, and refunds.</p>
                )}
                {shift && (
                    <>
                <div className='grid grid-cols-1 md:grid-cols-2  mb-6 gap-6'>
                    <PaymentSummaryCard shift={shift}/>
                    <TopSellingItems shift={shift}/>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2  mb-6 gap-6'>
                    <RecentOrdersTable shift={shift}/>
                    <RefundsTable shift={shift}/>
                </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ShiftSummaryPage;