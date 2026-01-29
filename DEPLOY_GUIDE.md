# How to Deploy OptiFit for Free

Since you want a completely free deployment (no credit card required), here is the best stack:
*   **Backend**: Render (User "Web Service" Free Tier for Docker/Java)
*   **Frontend**: Netlify (Drag & Drop or Git integration)

## Step 1: Prepare Backend (Docker)
1.  Create a `Dockerfile` in `optifit-backend/`:
    ```dockerfile
    FROM eclipse-temurin:17-jdk-alpine
    VOLUME /tmp
    COPY target/*.jar app.jar
    ENTRYPOINT ["java","-jar","/app.jar"]
    ```
2.  Push your code to GitHub.
3.  Go to [render.com](https://render.com), sign up with GitHub.
4.  New **Web Service** -> Connect your Repo.
5.  **Root Directory**: `optifit-backend`.
6.  **Build Command**: `./mvnw clean package`.
7.  **Start Command**: `java -jar target/*.jar`.
8.  **Env Vars**: `SERVER_PORT=8080`.
9.  Click **Deploy**. You will get a URL like `https://optifit-api.onrender.com`.

## Step 2: Prepare Frontend
1.  Update `src/api/config.ts`:
    ```typescript
    // Replace with your actual Render URL from Step 1
    export const API_BASE_URL = 'https://optifit-api.onrender.com/api'; 
    ```
2.  Build the frontend:
    ```bash
    cd optifit-frontend
    npm run build
    ```
3.  This creates a `dist/` folder.

## Step 3: Deploy Frontend (Netlify)
1.  Go to [netlify.com](https://netlify.com), sign up.
2.  **Add new site** -> **Deploy manually**.
3.  Drag and drop the `dist` folder onto the page.
4.  Done! You get a URL like `https://optifit-kshitij.netlify.app`.

## Important Note
Render's free tier spins down after inactivity. The first request might take 50 seconds to wake it up. This is normal for free hosting.
