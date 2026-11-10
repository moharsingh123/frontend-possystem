import { Boxes, ClipboardList, LayoutDashboard, UsersRound } from "lucide-react";
import { Route, Routes } from "react-router";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { BranchDashboard, BranchEmployees, BranchInventory, BranchOrders } from "@/pages/branch/BranchPages";

const navigation = [
    { to: ".", label: "Overview", icon: LayoutDashboard },
    { to: "orders", label: "Orders", icon: ClipboardList },
    { to: "inventory", label: "Inventory", icon: Boxes },
    { to: "team", label: "Team", icon: UsersRound },
];

export default function BranchRoutes() {
    return (
        <Routes>
            <Route element={<WorkspaceLayout title="Branch workspace" navItems={navigation} />}>
                <Route index element={<BranchDashboard />} />
                <Route path="orders" element={<BranchOrders />} />
                <Route path="inventory" element={<BranchInventory />} />
                <Route path="team" element={<BranchEmployees />} />
            </Route>
        </Routes>
    );
}
