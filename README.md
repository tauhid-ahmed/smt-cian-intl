# Cian International

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smt-cian-intl
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure Environment Variables**

   Create a `.env.local` file in the root directory (copy from `.env.example`):
   
   ```bash
   cp .env.example .env.local
   ```

   Update the values in `.env.local`:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://206.162.244.175:6006/api/v1
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=959795390198-ijbhg4ob84kgulhod8iauk56iu9s779h.apps.googleusercontent.com
   ```

   **⚠️ CRITICAL - Must Do After Creating `.env.local`:**
   - **STOP** your development server (if running)
   - **RESTART** the development server completely
   - Environment variables are only loaded when Next.js starts
   - If you don't restart, the app will not see your `.env.local` file

   **Important:** 
   - The `.env.local` file is already in `.gitignore` and won't be committed to git
   - Each team member must create their own `.env.local` file from `.env.example`
   - Change the API URL in `.env.local` to match your backend server
   - The Google Client ID is already set in `.env.example` - make sure it's copied to `.env.local`
   - For different environments (development, staging, production), update these values accordingly

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

### Required Variables

- `NEXT_PUBLIC_API_BASE_URL` - Backend API base URL (e.g., `http://206.162.244.175:6006/api/v1`)
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` - Google OAuth 2.0 Client ID for Google login functionality

### Configuration

All API endpoints are configured in `lib/config/api.ts`. The API base URL is read from the `NEXT_PUBLIC_API_BASE_URL` environment variable.

**To change the API URL:**
1. Update the value in `.env.local` file
2. Restart the development server
3. The change will be applied automatically

**Note:** In development mode, the app uses a Next.js API proxy (`/api/proxy`) to avoid CORS issues. The proxy forwards requests to the backend URL specified in `NEXT_PUBLIC_API_BASE_URL`.

### Troubleshooting

**Google Login not working:**

1. **Check if `.env.local` file exists:**
   ```bash
   # In the project root directory, verify the file exists
   ls .env.local  # Linux/Mac
   dir .env.local  # Windows
   ```

2. **If file doesn't exist, create it:**
   ```bash
   # Copy from example
   cp .env.example .env.local
   # OR manually create .env.local with:
   NEXT_PUBLIC_API_BASE_URL=http://206.162.244.175:6006/api/v1
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=959795390198-ijbhg4ob84kgulhod8iauk56iu9s779h.apps.googleusercontent.com
   ```

3. **Verify the file contents:**
   - Open `.env.local` and ensure both variables are present
   - Make sure there are no extra spaces or quotes around the values
   - The file should be in the root directory (same level as `package.json`)

4. **Restart the development server:**
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   # OR
   yarn dev
   ```

5. **Check browser console:**
   - Open browser DevTools (F12)
   - Look for warnings like "Google Client ID is not set"
   - Check for any Google OAuth related errors

6. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - Or clear browser cache completely

**API requests failing:**
- Verify `NEXT_PUBLIC_API_BASE_URL` is correctly set in `.env.local`
- Make sure the backend server is running and accessible
- Check that the proxy route (`/api/proxy`) is working correctly

## Project Structure

- `/app` - Next.js app router pages and API routes
- `/components` - React components
- `/features` - Feature-based modules (auth, player, etc.)
- `/lib` - Utility functions and configurations
  - `/lib/api` - RTK Query API slices
  - `/lib/config` - Configuration files (API endpoints, etc.)
  - `/lib/store` - Redux store configuration
- `/providers` - React context providers
- `/styles` - Global styles

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **State Management:** Redux Toolkit with RTK Query
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Form Handling:** React Hook Form with Zod validation
- **Notifications:** React Hot Toast

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

**For production deployment:**
1. Set the `NEXT_PUBLIC_API_BASE_URL` environment variable in your Vercel project settings
2. Set the `NEXT_PUBLIC_GOOGLE_CLIENT_ID` environment variable in your Vercel project settings
3. Ensure CORS is properly configured on your backend server
4. Deploy using Vercel CLI or connect your GitHub repository

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
