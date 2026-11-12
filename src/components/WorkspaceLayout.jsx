import { LogOut } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "@/Redux Toolkit/features/Auth/authSlice";
import { getSessionUser } from "@/utils/session";

export default function WorkspaceLayout({ title, navItems }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = getSessionUser();

    function handleLogout() {
        dispatch(logout());
        navigate("/login", { replace: true });
    }

    return (
        <div className="min-h-screen bg-muted/30 md:flex">
            <aside className="border-b bg-card p-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
                <h1 className="px-2 text-lg font-bold">{title}</h1>
                <p className="px-2 pt-1 text-xs text-muted-foreground">POS management workspace</p>
                <nav aria-label={`${title} navigation`} className="mt-5 flex flex-wrap gap-2 md:flex-col">
                    {navItems.map(({ to, label, icon: Icon, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end ?? to === "."}
                            className={({ isActive }) => `flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                        >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                            {label}
                        </NavLink>
                    ))}
                </nav>
                <div className="mt-6 hidden border-t pt-4 md:block">
                    <p className="truncate px-2 text-sm font-medium">{user?.fullName || user?.email || "Signed in"}</p>
                    <button type="button" onClick={handleLogout} className="mt-3 flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                        <LogOut className="h-4 w-4" /> Sign out
                    </button>
                </div>
            </aside>
            <div className="min-w-0 flex-1">
                <header className="flex items-center justify-between border-b bg-card px-5 py-3 md:px-8">
                    <span className="font-semibold">{title}</span>
                    <span className="text-sm text-muted-foreground">{user?.fullName || user?.email}</span>
                </header>
                <Outlet />
            </div>
        </div>
    );
}
