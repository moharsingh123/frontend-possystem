import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ShoppingCartPlusIcon } from "lucide-react";
import { login } from "@/Redux Toolkit/features/Auth/authThunk";
import { logout as clearAuth } from "@/Redux Toolkit/features/Auth/authSlice";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getHomePath, getSessionUser } from "@/utils/session";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [accessError, setAccessError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setAccessError("");
        try {
            const response = await dispatch(login(credentials)).unwrap();
            const homePath = getHomePath(response.user?.role);
            if (homePath === "/login") {
                setAccessError("This account does not have a supported POS workspace role.");
                return;
            }
            navigate(homePath, { replace: true });
        } catch {
            // The rejected message is rendered from the auth slice.
        }
    }
    const savedUser = getSessionUser();
    const hasUnsupportedSession = Boolean(savedUser && localStorage.getItem("jwt") && getHomePath(savedUser.role) === "/login");

    return (
        <main className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <section className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <ShoppingCartPlusIcon aria-hidden="true" />
                    </div>
                    <h1 className="text-2xl font-bold">Sign in to POS Pro</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Use your account to open your workspace.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="username"
                            required
                            value={credentials.email}
                            onChange={(event) => setCredentials((current) => ({ ...current, email: event.target.value }))}
                            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={credentials.password}
                            onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))}
                            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                        />
                    </div>
                    {(accessError || (hasUnsupportedSession ? "This account does not have a supported POS workspace role." : error)) && (
                        <p role="alert" className="text-sm text-destructive">{accessError || (hasUnsupportedSession ? "This account does not have a supported POS workspace role." : error)}</p>
                    )}
                    <Button className="w-full" disabled={loading} type="submit">
                        {loading ? "Signing in..." : "Sign in"}
                    </Button>
                    {hasUnsupportedSession && (
                        <button type="button" onClick={() => dispatch(clearAuth())} className="w-full text-sm text-muted-foreground underline">
                            Sign out
                        </button>
                    )}
                </form>
            </section>
        </main>
    );
}
