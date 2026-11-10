export const getAuthToken = () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
        throw new Error("No token found in local storage");
    }
    return token;
};

export const getAuthHeader = () => ({
    Authorization: `Bearer ${getAuthToken()}`,
    "Content-Type": "application/json",
});
