# 💪 OptiFit - Intelligent Fitness & Nutrition Tracker

![OptiFit Dashboard](optifit-frontend/public/assets/dashboard.png)

**OptiFit** is a full-stack health companion designed to help users track workouts, log meals, and achieve their fitness goals through intelligent personalization. Built with a robust **Java Spring Boot** backend and a stunning **React + Tailwind v4** frontend.

## 🚀 Features

### 🌟 Smart Dashboard
*   **Target vs Actual**: Automatically calculates your daily calorie budget based on your goal.
*   **Bonus Budget**: Burning calories in workouts dynamically increases your food allowance.
*   **Visual Stats**: Beautiful progress bars and card-based metrics.

### 👤 Personalized Experience
*   **Onboarding Wizard**: Collects your name, fitness goal (**Lose, Maintain, Gain**), and diet preference (**Veg, Non-Veg, Egg**).
*   **Smart Suggestions**: Recommends high-protein foods tailored to your selected diet.
*   **Motivation**: Daily motivational quotes on the login screen.

### 🛡️ Secure & Robust
*   **Authentication**: Custom Spring Security implementation (Guest Login: `guest` / `pass123`).
*   **Full CRUD**: Add, Edit, and Delete workouts and meals with instant UI updates.
*   **Persistence**: H2 Database ensures data reliability during the session.

### 🎨 Premium UI/UX
*   **Glassmorphism**: Modern, translucent design elements.
*   **Animated Backgrounds**: Fluid "blob" animations for a lively feel.
*   **Responsive**: Fully optimized for Desktop, Tablet, and Mobile.

## 🛠️ Tech Stack

### Backend
*   **Java 17**
*   **Spring Boot 3.3.0** (Web, Data JPA, Security, Validation)
*   **H2 Database** (In-Memory SQL)
*   **Maven** (Build Tool)

### Frontend
*   **React 18** (Vite)
*   **TypeScript** (Type Safety)
*   **Tailwind CSS v4** (Styling & Animations)
*   **Lucide React** (Icons)

## 🏃‍♂️ Getting Started

### Prerequisites
*   Java JDK 17+
*   Node.js 18+

### 1. Setup Backend
The backend runs on port `8080`.

```bash
cd optifit-backend
./mvnw spring-boot:run
```

### 2. Setup Frontend
The frontend runs on port `5173`.

```bash
cd optifit-frontend
npm install
npm run dev
```

### 3. Login
Open [http://localhost:5173](http://localhost:5173).
*   **Username**: `guest`
*   **Password**: `pass123`

## 📦 Deployment
Want to host this for free? Check out the [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md) included in this repository for steps to deploy on:
*   **Render** (Backend)
*   **Netlify** (Frontend)

## 📸 Screenshots
![Login Screen](optifit-frontend/public/assets/login.png)
![Dashboard](optifit-frontend/public/assets/dashboard.png)

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Designed & Built by [Kshitij Raj](https://github.com/KshitijRaj09)*
