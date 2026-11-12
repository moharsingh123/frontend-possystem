import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";
import { getSessionUser } from "@/utils/session";

export async function getCashierOrders() {
    let cashier = getSessionUser();
    if (!cashier?.id) {
        const profileResponse = await api.get("/api/users/profile", {
            headers: getAuthHeader(),
        });
        cashier = profileResponse.data;
        localStorage.setItem("user", JSON.stringify(cashier));
    }
    if (!cashier?.id) {
        throw new Error("Unable to identify the signed-in cashier.");
    }

    const response = await api.get(`/api/orders/cashier/${cashier.id}`, {
        headers: getAuthHeader(),
    });
    return Array.isArray(response.data) ? response.data : [];
}
