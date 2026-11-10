import StoreList from "./StoreList";

export default function PendingRequest() {
    return <StoreList statusFilter="PENDING" title="Pending store requests" />;
}
