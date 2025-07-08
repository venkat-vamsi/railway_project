<div align="center">

<pre>
██████╗  █████╗ ██╗██╗    ██╗   ██╗██╗  ██╗
██╔══██╗██╔══██╗██║██║    ╚██╗ ██╔╝╚██╗██╔╝
██████╔╝███████║██║██║     ╚████╔╝  ╚███╔╝
██╔══██╗██╔══██║██║██║      ╚██╔╝   ██╔██╗
██║  ██║██║  ██║██║███████╗  ██║   ██╔╝ ██╗
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝  ╚═╝   ╚═╝  ╚═╝
</pre>

<h1 align="center">Rail-X: The Future of Railway Reservation</h1>

<p align="center">
A full-stack, production-ready railway booking system featuring a sleek, futuristic React frontend and a robust Spring Boot backend.
</p>

<!-- Colorful Badges -->

<p align="center">
<img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Spring_Boot-6DB33F%3Fstyle%3Dfor-the-badge%26logo%3Dspring-boot%26logoColor%3Dwhite" alt="Spring Boot">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/React-20232A%3Fstyle%3Dfor-the-badge%26logo%3Dreact%26logoColor%3D61DAFB" alt="React">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/PostgreSQL-316192%3Fstyle%3Dfor-the-badge%26logo%3Dpostgresql%26logoColor%3Dwhite" alt="PostgreSQL">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Razorpay-528FF0%3Fstyle%3Dfor-the-badge%26logo%3Drazorpay%26logoColor%3Dwhite" alt="Razorpay">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Tailwind_CSS-38B2AC%3Fstyle%3Dfor-the-badge%26logo%3Dtailwind-css%26logoColor%3Dwhite" alt="Tailwind CSS">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/JWT-000000%3Fstyle%3Dfor-the-badge%26logo%3Djsonwebtokens%26logoColor%3Dwhite" alt="JWT">
</p>

</div>

🚀 Welcome to the Future of Travel! 🚀
Forget boring, clunky booking websites. Rail-X is a hyper-modern, creatively designed, full-stack application that redefines the railway reservation experience. With a stunning "Aurora" themed UI built with React and a powerful, secure backend powered by Spring Boot, this project is a complete showcase of modern software development.


🎨 Features That Go Off the Rails!
👤 For Users:
🔮 Stunning UI/UX: A unique, creative "Aurora" theme with glassmorphism effects and fluid animations.

⚡ Blazing-Fast Search: Find trains between any two stations instantly.

🔐 Secure Authentication: Full user registration and login system using JWT.

💳 Seamless Payments: Integrated with Razorpay for a smooth and secure checkout experience (UPI, Cards, Wallets, and more).

🎟️ Effortless Booking: A simple, multi-passenger booking form.

📱 Fully Responsive: Looks and works perfectly on any device, from mobile phones to desktops.

🛡️ For Admins:
👑 Role-Based Access: A completely separate, secure dashboard accessible only to users with ROLE_ADMIN.

🚂 Add New Trains: A dedicated form to add new train routes to the system database.

📈 View All Bookings: A comprehensive table displaying all bookings made across the entire system.

🕹️ Mission Control UI: A sleek, dark-themed dashboard for managing the application's core data.

🛠️ Tech Stack & Architecture
This project is built with a modern, decoupled architecture.

Frontend (React)
Framework: React 18 with Vite

Styling: Tailwind CSS

State Management: React Context API

API Communication: fetch API

Backend (Spring Boot)
Language: Java 17

Framework: Spring Boot 3

Security: Spring Security with JWT

Database: PostgreSQL

Data Access: Spring Data JPA / Hibernate

Payments: Razorpay Java SDK

Project Flow Diagram
This diagram shows the complete end-to-end flow of the application, from the frontend files to the backend layers and external APIs.

graph TD
    subgraph "USER's COMPUTER"
        subgraph "1. Frontend: React App (railway-frontend)"
            direction LR
            F_Package["package.json"]
            F_Main["src/main.jsx"] --> F_App
            F_App["src/App.jsx"] --> F_Pages
            subgraph "src/pages"
                F_BookingPage["BookingPage.jsx"]
                F_AdminPage["AdminDashboardPage.jsx"]
                F_HomePage["HomePage.jsx"]
            end
            F_Pages -- calls --> F_API["src/api/apiService.js"]
        end

        subgraph "2. Backend: Spring Boot API"
            direction LR
            B_POM["pom.xml"]
            B_Main["...Application.java"] --> B_Layers
            subgraph "Backend Layers"
              direction TB
              B_Security["config/SecurityConfig.java"]
              B_Controller["controller/PaymentController.java"]
              B_Service["service/BookingService.java"]
              B_Repository["repository/BookingRepository.java"]
              B_Model["model/Booking.java"]
              B_Security --> B_Controller --> B_Service --> B_Repository --> B_Model
            end
            B_Layers
        end
    end

    subgraph "INTERNET & CLOUD"
      Browser["User's Browser"]
      Razorpay["Razorpay API"]
      PostgresDB["PostgreSQL Database"]
    end

    Browser -->|HTTP Requests| B_Main
    B_Service -->|DB Operations| PostgresDB
    B_Service -->|Payment Orders| Razorpay

⚙️ Setup & Installation
To get this project running locally, follow these steps.

Prerequisites
Java 17+

Maven

Node.js & npm

PostgreSQL

Backend Setup
Clone the repository:

git clone [your-repo-url]
cd railway-reservation-system

Setup PostgreSQL:

Create a new database named railway_db.

Configure Application:

Open src/main/resources/application.properties.

Update the spring.datasource.username and spring.datasource.password with your PostgreSQL credentials.

Update razorpay.key.id and razorpay.key.secret with your Razorpay Test Keys.

Run the application:

mvn spring-boot:run

The backend will start on http://localhost:8080.

Frontend Setup
Navigate to the frontend directory:

cd ../railway-frontend 

Install dependencies:

npm install

Run the development server:

npm run dev

The frontend will start on http://localhost:5173.

Creating an Admin User
Register a new user through the website's Sign Up form.

Open pgAdmin and connect to your railway_db.

In the users table, find the user you just created.

Change their roles column from ROLE_USER to ROLE_USER,ROLE_ADMIN.

Save the change. The user will now have admin privileges upon their next login.

<div align="center">
<h3>Enjoy the ride with Rail-X! 🚂✨</h3>
</div>
