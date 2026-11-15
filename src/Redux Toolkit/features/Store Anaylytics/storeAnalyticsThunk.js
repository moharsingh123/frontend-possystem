import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";
import { getSessionUser } from "@/utils/session";

export const loadStoreAnalytics = createAsyncThunk(
    "storeAnalytics/load",
    async ({ startDate, endDate }, { rejectWithValue }) => {
        try {
            const user = getSessionUser();
            const storeEndpoint = user?.role === "ROLE_STORE_ADMIN"
                ? "/api/stores/admin"
                : "/api/stores/employee";
            const headers = getAuthHeader();
            const storeResponse = await api.get(storeEndpoint, { headers });
            const store = storeResponse.data;

            if (!store?.id) {
                return rejectWithValue("No store is connected to this account.");
            }

            const branchesResponse = await api.get(
                `/api/branches/store/${store.id}`,
                { headers },
            );
            const branches = Array.isArray(branchesResponse.data)
                ? branchesResponse.data
                : [];
            const reportsByBranch = await Promise.all(
                branches.map(async (branch) => {
                    const response = await api.get(
                        `/api/shift-reports/branch/${branch.id}`,
                        { headers },
                    );
                    const reports = Array.isArray(response.data) ? response.data : [];
                    return reports.map((report) => ({
                        ...report,
                        branchId: report.branchId ?? branch.id,
                        branchName: branch.name || `Branch #${branch.id}`,
                    }));
                }),
            );
            const reports = reportsByBranch
                .flat()
                .filter((report) => {
                    const reportDate = String(report.shiftStart || "").slice(0, 10);
                    return reportDate &&
                        reportDate >= startDate &&
                        reportDate <= endDate;
                })
                .sort((a, b) => String(b.shiftStart).localeCompare(String(a.shiftStart)));

            return {
                storeName: store.brand || "",
                branches,
                reports,
                startDate,
                endDate,
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "Unable to load sales analytics.",
            );
        }
    },
);