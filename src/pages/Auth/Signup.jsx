import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { ShoppingCartPlusIcon } from "lucide-react";
import { signup } from "@/Redux Toolkit/features/Auth/authThunk";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getHomePath } from "@/utils/session";

const roles = [
    { value: "ROLE_STORE_ADMIN", label: "Store administrator" },
    { value: "ROLE_STORE_MANAGER", label: "Store manager" },
    { value: "ROLE_BRANCH_MANAGER", label: "Branch manager" },
    { value: "ROLE_BRANCH_CASHIER", label: "Branch cashier" },
];

export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);
    const [details, setDetails] = useState({
        fullName: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        confirmPassword: "",
    });
    const [formError, setFormError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setFormError("");
        if (details.password !== details.confirmPassword) {
            setFormError("Passwords do not match.");
            return;
        }

        try {
            const userData = {
                fullName: details.fullName,
                email: details.email,
                phone: details.phone,
                role: details.role,
                password: details.password,
            };
            const response = await dispatch(signup(userData)).unwrap();
            const homePath = getHomePath(response.user?.role);
            if (homePath === "/login") {
                setFormError("This account does not have a supported POS workspace role.");
                return;
            }
            navigate(homePath, { replace: true });
        } catch {
            // The rejected message is rendered from the auth slice.
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <section className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <ShoppingCartPlusIcon aria-hidden="true" />
                    </div>
                    <h1 className="text-2xl font-bold">Create your POS Pro account</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Enter your details to get started.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full name</Label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            required
                            value={details.fullName}
                            onChange={(event) => setDetails((current) => ({ ...current, fullName: event.target.value }))}
                            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={details.email}
                            onChange={(event) => setDetails((current) => ({ ...current, email: event.target.value }))}
                            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone number <span className="font-normal text-muted-foreground">(optional)</span></Label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            value={details.phone}
                            onChange={(event) => setDetails((current) => ({ ...current, phone: event.target.value }))}
                            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Workspace role</Label>
                        <select
                            id="role"
                            name="role"
                            required
                            value={details.role}
                            onChange={(event) => setDetails((current) => ({ ...current, role: event.target.value }))}
                            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                        >
                            <option value="" disabled>Select a role</option>
                            {roles.map((role) => (
                                <option key={role.value} value={role.value}>{role.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={details.password}
                            onChange={(event) => setDetails((current) => ({ ...current, password: event.target.value }))}
                            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm password</Label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={details.confirmPassword}
                            onChange={(event) => setDetails((current) => ({ ...current, confirmPassword: event.target.value }))}
                            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                        />
                    </div>
                    {(formError || error) && (
                        <p role="alert" className="text-sm text-destructive">{formError || error}</p>
                    )}
                    <Button className="w-full" disabled={loading} type="submit">
                        {loading ? "Creating account..." : "Create account"}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link className="font-medium text-primary underline-offset-4 hover:underline" to="/login">
                        Sign in
                    </Link>
                </p>
            </section>
        </main>
    );
}
