# FreshWise AI

FreshWise AI is a local-first university entrepreneurship project that connects household inventory, conservative freshness guidance, personalized meal recommendations, grocery budgeting, nutrition logging, and waste tracking.

## What is implemented

- Credentials registration and login with NextAuth, bcrypt password hashing, JWT sessions, protected user routes, and server-side admin checks.
- Four-step onboarding with BMI and Mifflin–St Jeor calorie estimates, dietary preferences, allergies, household size, and budget.
- MongoDB-backed inventory CRUD, atomic quantity deductions, purchase conversion, and recorded consumption/discard activity.
- Deterministic freshness priorities that distinguish use-by from best-before dates and exclude unsafe items.
- A seeded catalog of 56 recipes and an explainable recommendation engine that applies diet/allergy restrictions before ranking.
- Confirm-to-cook flow, dedupe protection, shopping list generation, estimated INR prices, and purchase-to-inventory conversion.
- Nutrition and waste dashboards that use confirmed activity only; no invented impact or savings.
- Protected admin summary, user list, upload validation, data export, and account deletion.
- Unit tests for BMI/calorie calculations, food safety priorities, dietary/allergy filtering, recommendation inputs, and budget math.

FreshWise AI provides estimated nutrition and food freshness guidance. It does not replace professional medical advice or official food-safety guidance.

## Windows setup

### 1. Install prerequisites

Install [Node.js LTS](https://nodejs.org/) and [MongoDB Community Server](https://www.mongodb.com/try/download/community). During MongoDB setup, enable **Install MongoD as a Service**.

Open PowerShell and verify:

```powershell
node --version
npm --version
Get-Service MongoDB
```

If the MongoDB service is stopped:

```powershell
Start-Service MongoDB
```

Run PowerShell as Administrator only if Windows requires it to start the service.

### 2. Configure FreshWise

From this project directory:

```powershell
npm install
Copy-Item .env.example .env.local
npm run secret
```

Open `.env.local` and replace `NEXTAUTH_SECRET` with the generated value. Keep the default local URI:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/freshwise_ai
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret
```

### 3. Seed and run

```powershell
npm run seed
npm run dev
```

Open <http://localhost:3000>. If port 3000 is busy, Next.js prints the alternate local URL (usually port 3001) in the terminal; update `NEXTAUTH_URL` to match it and restart.

Demo user: `alex@freshwise.local` / `FreshWise123!`

Admin user: `admin@freshwise.local` / `AdminFresh123!`

These credentials are local demo data only. Change them before any real use.

## Verification

```powershell
npm test
npm run typecheck
npm run build
```

## Common Windows fixes

- **`ECONNREFUSED 127.0.0.1:27017`**: MongoDB is not running. Check `Get-Service MongoDB`, then start the service or launch `mongod` with your configured data directory.
- **PowerShell blocks npm scripts**: run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, or use Command Prompt for npm commands.
- **Authentication redirects to the wrong port**: set `NEXTAUTH_URL` to the exact URL printed by `npm run dev`.
- **Seed cannot connect**: verify `MONGODB_URI`, avoid `localhost` DNS ambiguity by using `127.0.0.1`, and confirm the MongoDB service is listening.
- **Stale Next.js state**: stop the server, delete `.next`, and run `npm run dev` again.

## Architecture

`src/app/api` contains authenticated route handlers. `src/models` holds Mongoose schemas and indexes. `src/lib` contains the cached database connection, auth configuration, safety-aware freshness logic, calorie estimates, meal ranking, and grocery optimization. The dashboard is under the `(user)` route group, and admin authorization is enforced in both its layout and API.

The local prototype intentionally avoids multi-document MongoDB transactions so it works with a standalone Community Server. Critical quantity changes use conditional atomic updates, and duplicate purchase/cook operations use unique dedupe keys.
