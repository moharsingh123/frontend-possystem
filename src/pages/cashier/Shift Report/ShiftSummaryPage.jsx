import PaymentSummaryCard from './PaymentSummaryCard.jsx';
import RecentOrdersTable from './RecentOrdersTable.jsx';
import RefundsTable from './RefundsTable.jsx';
import SalesSummary from './SalesSummary.jsx';
import ShiftInformation from './ShiftInformation.jsx';
import ShiftReportHeader from './ShiftReportHeader.jsx';
import TopSellingItems from './TopsSellingItems.jsx';

const ShiftSummaryPage=()=>{
    return (
        <div className='h-full flex  flex-col'>
            <ShiftReportHeader/>
            <div className='flex-1 overflow-auto p-4'>
                <div className='grid grid-cols-1 md:grid-cols-2  mb-6 gap-6'>
                    <ShiftInformation/>
                    <SalesSummary/>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2  mb-6 gap-6'>
                    <PaymentSummaryCard/>
                    <TopSellingItems/>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2  mb-6 gap-6'>
                    <RecentOrdersTable/>
                    <RefundsTable/>
                </div>

            </div>
        </div>
    )
}

export default ShiftSummaryPage;