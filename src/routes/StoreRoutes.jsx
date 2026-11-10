import { Boxes, GitBranch, LayoutDashboard, Settings2, UsersRound } from "lucide-react";
import { Route, Routes } from "react-router";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { StoreBranches, StoreDashboard, StoreProducts, StoreProfile, StoreTeam } from "@/pages/store/StorePages";

const navigation = [
    { to: ".", label: "Overview", icon: LayoutDashboard },
    { to: "branches", label: "Branches", icon: GitBranch },
    { to: "products", label: "Products", icon: Boxes },
    { to: "team", label: "Team", icon: UsersRound },
    { to: "settings", label: "Store profile", icon: Settings2 },
];

export default function StoreRoutes() {
    return (
        <Routes>
            <Route element={<WorkspaceLayout title="Store workspace" navItems={navigation} />}>
                <Route index element={<StoreDashboard />} />
                <Route path="branches" element={<StoreBranches />} />
                <Route path="products" element={<StoreProducts />} />
                <Route path="team" element={<StoreTeam />} />
                <Route path="settings" element={<StoreProfile />} />
            </Route>
        </Routes>
    );
}
