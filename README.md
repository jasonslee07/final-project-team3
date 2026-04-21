# Sell4Impact 🌎🌐

Sell4Impact is a UMD student marketplace platform that helps users to buy and sell dorm decor in a sustainable way with much more affordable prices! 

---

## Project Overview

The goal of Sell4Impact is to:
- Help students buy affordable second-hand dorm items
- Allow students to sell dorm decor
- Promote sustainability through reuse

---

## Features

### Core Features
- Item search functionality
- Filtering by category, price
- User authentication (Client / Vendor roles)
- Client dashboard (Cart, Ordered, Past)
- Vendor dashboard (Items, Drafts, Sold)

### Additional Features (Planned)
- Ratings for sellers 
- Trending items, "for you"
- Bargaining system
- Dark mode/Light mode

---

## Tech Stack

- Frontend: React + TypeScript + Vite
- Styling: Tailwind CSS
- Routing: React Router
- Backend: Firebase (Authentication + Firestore + Cloud Storage)

---

## Project Structure

src/
├── assets/
│   ├── Sell4Impact.png
│   ├── Sell4Impact_logo.png
│   ├── Sell4Impact_text.png
├── components/
│   ├── ItemCard.tsx
│   ├── ItemPage.tsx
│   ├── Navbar.tsx
│   ├── PageNotFound.tsx
│   ├── ProfileHeader.tsx
│   └── ProfileTab.tsx
├── context/
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── data/
│   ├── items.json
│   ├── orders.json
│   └── users.json
├── firebase/
│   └── firebase.ts
├── pages/
│   ├── client-pages/
│   │   ├── ClientDashboard.tsx
│   │   └── ClientProfile.tsx
│   ├── vendor-pages/
│   │   ├── CreateItemPage.tsx
│   │   ├── ItemEditPage.tsx
│   │   └── VendorProfile.tsx
│   ├── ForgotPasswordPage.tsx
│   ├── Home.tsx
│   ├── LoginPage.tsx
│   ├── OnboardingPage.tsx
│   ├── SettingsPage.tsx
│   └── SignUpPage.tsx
├── types/
│   └── types.ts
├── App.tsx
├── index.css
└── main.tsx

---

## Setting up & Installation

- Prereqs: Node.js and npm

1. clone the repository
2. cd into project folder
3. run "npm install"
4. create a .env in root directory with these fields

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

5. run "npm run dev"

---

## Git Workflow

- Create a new branch for each feature:

feature/<feature-name>

- Make commits with descriptive messages
- Open a Pull Request

---

## Contributors

Product Manager: Melat Abera (melatabera)
Tech Lead: Soumya Jaiswal (jaiswalsoumya450-dev)
Tech Lead: Jason Lee (jasonslee07)
Designer: Lucy Davies (lucymdavies)
Engineer: Yuvan Adarsh Jagannathan (yuvanadarsh)
Engineer: Sydney Groskopf (sydneygroskopf27)
Engineer: Faiza Syed (faizasyed07)