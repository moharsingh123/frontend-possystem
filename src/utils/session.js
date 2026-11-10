export function getSessionUser() {
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Unable to read the saved user session", error);
        return null;
    }
}

export function getHomePath(role) {
    switch (role) {
        case "ROLE_ADMIN":
            return "/super-admin";
        case "ROLE_STORE_ADMIN":
        case "ROLE_STORE_MANAGER":
            return "/store";
        case "ROLE_BRANCH_MANAGER":
            return "/branch";
        case "ROLE_BRANCH_CASHIER":
            return "/cashier";
        default:
            return "/login";
    }
}
