# 🏥 Hospital Management System

A modern, web-based Hospital Management System designed to simplify hospital operations by managing patients, doctors, appointments, prescriptions, pharmacy inventory, billing, and other healthcare activities through a centralized dashboard.

## 🌐 Live Demo

- **Frontend:** https://hospital-management-fjt8-lovat.vercel.app/
- **GitHub Repository:** https://github.com/vasu-9390/hospital-management

## 📌 Project Overview

The Hospital Management System provides a centralized platform for managing hospital information and daily operations. It offers an intuitive dashboard that helps administrators and healthcare staff organize patient records, manage appointments, maintain medical information, and monitor hospital activities.

The application is developed using modern web technologies with a frontend, backend API, and database integration.

## ✨ Features

- **Dashboard:** View hospital statistics, patient counts, doctor availability, appointments, and revenue summaries.
- **Patient Management:** Register patients and manage their records.
- **Doctor Management:** Maintain doctor profiles and availability information.
- **Appointment Management:** Schedule and manage patient appointments.
- **Department Management:** Organize hospital departments.
- **Prescription Management:** Manage prescriptions and related medical information.
- **Pharmacy Inventory:** Track medicines and stock availability.
- **Billing and Payments:** Manage patient billing and payment records.
- **Reports and Analytics:** Display hospital activity and operational statistics.
- **Authentication and Authorization:** Support secure access according to the implemented user roles.

## 🛠️ Technologies Used

**Frontend**
- React.js
- Vite
- JavaScript
- HTML5
- CSS3

**Backend**
- Node.js
- Express.js
- REST API

**Database**
- MongoDB
- MongoDB Atlas

**Deployment and Tools**
- Git and GitHub
- Vercel
- VS Code
- npm

## 📂 Project Structure

```text
hospital-management-system/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── package.json
├── src/
├── public/
├── dist/
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

*Note: The folder structure above is illustrative. Adjust it to match the actual folders in your repository.*

## ⚙️ Installation and Setup

### Prerequisites

- Node.js and npm
- Git
- MongoDB Atlas account or a local MongoDB installation

### 1. Clone the repository

```bash
git clone https://github.com/vasu-9390/hospital-management.git
cd hospital-management
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the appropriate project directory and add the environment variables required by your application.

For example:

```env
VITE_API_URL=http://localhost:5000/api
```

Use the actual API URL and variable names required by your code. Never commit database passwords, API keys, or other secrets.

### 4. Start the frontend

```bash
npm run dev
```

### 5. Start the backend

Open another terminal and navigate to the backend directory:

```bash
cd backend
npm install
npm start
```

Use the backend's actual start script if it differs from `npm start`. Configure the database connection and required environment variables before starting the server.

## 🚀 Deployment

The frontend is deployed on Vercel.

To deploy updates, commit your changes and push them to the GitHub `main` branch. If the Vercel project is connected to that branch, it can automatically build and deploy the latest changes.

The backend also requires a working deployment and database connection for all application features to function correctly.

## 🔒 Security Considerations

- Store sensitive configuration in environment variables.
- Never upload `.env` files containing secrets.
- Validate and sanitize incoming API requests.
- Protect restricted routes with appropriate authentication and authorization.
- Use HTTPS for production communication.

## 🎯 Project Objectives

- Digitize hospital administration and record management.
- Reduce manual paperwork and repetitive administrative tasks.
- Improve access to patient, doctor, and appointment information.
- Centralize hospital operational data.
- Provide a user-friendly interface for daily hospital activities.

## 🔮 Future Enhancements

- Online appointment booking and notifications.
- Patient portal for accessing medical records.
- Email and SMS reminders.
- Advanced reporting and analytics.
- Role-based dashboards for different hospital staff.
- Integration with additional healthcare services.

## 👨‍💻 Author

**Vasu Bandaru**

B.Tech Student | Web Developer

GitHub: https://github.com/vasu-9390

---

If you find this project useful, consider giving the repository a ⭐ on GitHub.

