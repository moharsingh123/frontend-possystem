import { Boxes, GitBranch, LayoutDashboard, Settings2, UsersRound } from "lucide-react";
import { Navigate, Route, Routes } from "react-router";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { StoreBranches, StoreDashboard, StoreEmployees, StoreProducts, StoreProfile } from "@/pages/store/StorePages";


const navigation = [
    { to: ".", label: "Overview", icon: LayoutDashboard },
    { to: "branches", label: "Branches", icon: GitBranch },
    { to: "products", label: "Products", icon: Boxes },
    { to: "employees", label: "Employees", icon: UsersRound },
    { to: "settings", label: "Store profile", icon: Settings2 },
];

export default function StoreRoutes() {
    return (
        <Routes>
            <Route element={<WorkspaceLayout title="Store workspace" navItems={navigation} />}>
                <Route index element={<StoreDashboard />} />
                <Route path="branches" element={<StoreBranches />} />
                <Route path="products" element={<StoreProducts />} />
                <Route path="employees" element={<StoreEmployees />} />
                <Route path="team" element={<Navigate to="/store/employees" replace />} />
                <Route path="settings" element={<StoreProfile />} />
            </Route>
        </Routes>
    );
}
