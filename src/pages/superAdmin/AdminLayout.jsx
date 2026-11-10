import { LayoutDashboard, Store, UsersRound } from "lucide-react";
import WorkspaceLayout from "@/components/WorkspaceLayout";

const navigation = [
    { to: ".", label: "Overview", icon: LayoutDashboard },
    { to: "stores", label: "Stores", icon: Store },
    { to: "requests", label: "Pending requests", icon: UsersRound },
];

export default function AdminLayout() {
    return <WorkspaceLayout title="Platform admin" navItems={navigation} />;
}
