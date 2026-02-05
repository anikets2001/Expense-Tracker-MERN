# 🚀 Quick Start Guide

This is a simplified guide to get your backend running quickly. For detailed explanations, see [README.md](./README.md).

## Step 1: Install Dependencies

```bash
cd expense-tracker-be
npm install express mongoose dotenv cors bcryptjs jsonwebtoken
npm install --save-dev nodemon
```

## Step 2: Set Up Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your MongoDB connection string:
   - If using MongoDB Atlas: Get connection string from your cluster
   - If using local MongoDB: Use `mongodb://localhost:27017/expense-tracker`

3. Generate a JWT secret (or use a random string):
   ```bash
   # On Mac/Linux:
   openssl rand -base64 32
   
   # Or just use a random string like: mySecretKey123456
   ```

## Step 3: Create Basic Server

Create `server.js`:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

## Step 4: Update package.json

Add this script to your `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## Step 5: Run the Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

## Step 6: Test It

Open your browser or Postman and visit:
```
http://localhost:5000
```

You should see: `{"message":"API is running!"}`

## ✅ Next Steps

Once your basic server is running:

1. Follow the [README.md](./README.md) to:
   - Create models (User, Expense)
   - Set up authentication
   - Create expense CRUD operations
   - Connect to frontend

2. Test each endpoint as you build it using Postman

3. Integrate with your React frontend

## 🆘 Having Issues?

- **MongoDB Connection Error?** Check your `.env` file has the correct `MONGODB_URI`
- **Port Already in Use?** Change `PORT` in `.env` to a different number (e.g., 5001)
- **Module Not Found?** Run `npm install` again

For detailed troubleshooting, see the [README.md](./README.md) Troubleshooting section.

