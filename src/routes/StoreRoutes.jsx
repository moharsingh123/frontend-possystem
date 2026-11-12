import { Boxes, GitBranch, LayoutDashboard, Settings2, Tags, UsersRound } from "lucide-react";
import { Navigate, Route, Routes } from "react-router";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { StoreBranches, StoreDashboard, StoreEmployees, StoreProducts, StoreProfile } from "@/pages/store/StorePages";
import StoreCategories from "@/pages/store/StoreCategories";


const navigation = [
    { to: "/store", label: "Overview", icon: LayoutDashboard, end: true },
    { to: "/store/branches", label: "Branches", icon: GitBranch, end: true },
    { to: "/store/products", label: "Products", icon: Boxes, end: true },
    { to: "/store/categories", label: "Categories", icon: Tags, end: true },
    { to: "/store/employees", label: "Employees", icon: UsersRound, end: true },
    { to: "/store/settings", label: "Store profile", icon: Settings2, end: true },
];

export default function StoreRoutes() {
    return (
        <Routes>
            <Route element={<WorkspaceLayout title="Store workspace" navItems={navigation} />}>
                <Route index element={<StoreDashboard />} />
                <Route path="branches" element={<StoreBranches />} />
                <Route path="products" element={<StoreProducts />} />
                <Route path="categories" element={<StoreCategories />} />
                <Route path="employees" element={<StoreEmployees />} />
                <Route path="team" element={<Navigate to="/store/employees" replace />} />
                <Route path="settings" element={<StoreProfile />} />
            </Route>
        </Routes>
    );
}
