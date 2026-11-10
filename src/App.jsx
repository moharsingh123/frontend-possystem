import { Navigate, Route, Routes } from "react-router";
import Login from "./pages/Auth/Login";
import RoleGate from "./components/RoleGate";
import AdminRoutes from "./routes/AdminRoutes";
import BranchRoutes from "./routes/BranchRoutes";
import CashierRoutes from "./routes/CashierRoutes";
import StoreRoutes from "./routes/StoreRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cashier/*" element={<RoleGate roles={["ROLE_BRANCH_CASHIER"]}><CashierRoutes /></RoleGate>} />
      <Route path="/branch/*" element={<RoleGate roles={["ROLE_BRANCH_MANAGER"]}><BranchRoutes /></RoleGate>} />
      <Route path="/store/*" element={<RoleGate roles={["ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"]}><StoreRoutes /></RoleGate>} />
      <Route path="/super-admin/*" element={<RoleGate roles={["ROLE_ADMIN"]}><AdminRoutes /></RoleGate>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
