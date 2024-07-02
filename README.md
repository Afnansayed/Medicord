# Medical Camp Management System (MCMS)

## Overview
- **Concept**: MCMS is a MERN stack platform for organizing and participating in medical camps.
- **Problem Solved**: Streamlines camp registration, management, and participant feedback, enhancing overall coordination.

## Key Features
- **Comprehensive Camp Management**: 
  - Participants register, view details, and manage registrations.
  - Organizers manage registrations, payment statuses, and confirmations.
- **Analytics and Feedback**: 
  - Participants view camp analytics and provide feedback.
  - Feedback and ratings are collected and displayed on the home page.
- **Secure and Responsive Design**: 
  - Uses JWT for secure routes.
  - Fully responsive for mobile, tablet, and desktop.

## Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, Firebase
- **Payment Gateway**: Stripe

## Local Setup
1. **Clone the Repository**:
   - `git clone <repository-url>`
2. **Install Dependencies**:
   - Frontend: `cd client && npm install`
   - Backend: `cd server && npm install`
3. **Set Up Environment Variables**:
   - Create a `.env` file for Firebase and MongoDB credentials.
4. **Run the Application**:
   - Frontend: `npm start` in `client` directory
   - Backend: `npm start` in `server` directory



- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
