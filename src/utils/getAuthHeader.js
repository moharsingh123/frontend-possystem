export const getAuthToken = () => {
    const storedToken = localStorage.getItem("jwt");
    const token = storedToken?.replace(/^Bearer\s*/i, "").trim();
    if (!token) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        throw new Error("Your session token is missing. Please sign in again.");
    }
    return token;
};

export const getAuthHeader = () => ({
    Authorization: `Bearer ${getAuthToken()}`,
    "Content-Type": "application/json",
});
