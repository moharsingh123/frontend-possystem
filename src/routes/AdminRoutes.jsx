import { Route, Routes } from "react-router";
import AdminLayout from "@/pages/superAdmin/AdminLayout";
import AdminDashboard from "@/pages/superAdmin/Dashboard/AdminDashboard";
import PendingRequest from "@/pages/superAdmin/PendingRequest";
import StoreList from "@/pages/superAdmin/StoreList";

export default function AdminRoutes() {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="stores" element={<StoreList />} />
                <Route path="requests" element={<PendingRequest />} />
            </Route>
        </Routes>
    );
}
