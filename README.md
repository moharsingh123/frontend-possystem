# POS frontend

React/Vite frontend for the POS backend.

## Run locally on Windows

Start MySQL with the database configured in `possystem/src/main/resources/application.properties`, then open two terminals from the project root:

```powershell
# Terminal 1: backend (requires the Java version in possystem/pom.xml)
cd .\possystem
.\mvnw.cmd spring-boot:run

# Terminal 2: frontend
cd .\pos-frontend
npm run dev
```

Open `http://localhost:5173` and sign in with an account already present in the backend database. The frontend calls the Spring Boot API at `http://localhost:8080` by default; set `VITE_API_URL` in a local `.env` file to use another API address. The backend CORS configuration allows both `http://localhost:5173` and `http://127.0.0.1:5173`.

The login redirects to the workspace allowed by the account's role. Use separate accounts to view each role's pages; a cashier account does not also get store-admin or super-admin access.

## Role workspaces

- `ROLE_BRANCH_CASHIER`: POS order creation and customer management, with the existing order, refund and shift-summary routes retained.
- `ROLE_BRANCH_MANAGER`: branch overview, orders, inventory and team.
- `ROLE_STORE_ADMIN` / `ROLE_STORE_MANAGER`: store overview, branches, products, team and store profile.
- `ROLE_ADMIN`: platform overview, store moderation and pending store requests.

Subscription-plan screens are not enabled because the backend does not currently expose subscription or plan endpoints.
