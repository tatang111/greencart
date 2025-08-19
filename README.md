# 🛒 GreenCart

GreenCart is a **full-stack e-commerce web application** designed for seamless online grocery shopping. Users can browse products, add items to a cart, register/login, place orders with a user-friendly interface and responsive design on mobile. 🍏🥦🧀

---

## ✨ Features

- 🛍️ Browse grocery products by category (fruits, vegetables, dairy, etc.)
- 🛒 Add items to cart, update quantity, and remove items
- 🔐 User registration and login with JWT authentication
- 📄 View order summary and place orders
- 📦 View past orders in "My Orders"
- ⚙️ Admin dashboard for managing products and orders 
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

- **Frontend:** React.js ⚛️
- **Backend:** Node.js with Express 🟢
- **Database:** MongoDB 🍃
- **Authentication:** JWT 🔑
- **Payment Integration:** Stripe 💳
- **Image Hosting:** Cloudinary ☁️
- **Deployment:** Vercel (Frontend & Backend) 🚀

---

## 🌐 Live Demo

Check out the live app here: [GreenCart Live Demo](https://greencart-livid-two.vercel.app/)

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/tatang111/greencart.git
cd greencart

Frontend Setup

cd client
npm install
npm run dev

Backend Setup

cd ../server
npm install
npm run start

Environment Variables

Before running the app, create a `.env` file in the `/client` folder with the following:

VITE_CURRENCY='$' (u can change to ur currency)
VITE_BACKEND_URL = http://localhost:4000/api

Before running the app, create a `.env` file in the `/server` folder with the following:

JWT_SECRET=your_jwt_secret
NODE_ENV=development

## Admin credentials

SELLER_EMAIL=your_admin_email
SELLER_PASSWORD=your_admin_password

## MongoDB Setup

MONGODB_URL=your_mongodb_connection_string

## Cloudinary

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

## Stripe Setup

STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOKS_SECRET=your_stripe_webhooks_secret
