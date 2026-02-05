# Expense Tracker - Backend Development Roadmap

## 📚 Table of Contents
1. [Introduction to MERN Stack](#introduction-to-mern-stack)
2. [Prerequisites & Tools](#prerequisites--tools)
3. [Project Setup](#project-setup)
4. [Database Design](#database-design)
5. [Backend Architecture](#backend-architecture)
6. [Step-by-Step Implementation](#step-by-step-implementation)
7. [API Endpoints](#api-endpoints)
8. [Authentication & Security](#authentication--security)
9. [Frontend-Backend Integration](#frontend-backend-integration)
10. [Testing](#testing)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)

---

## 🎯 Introduction to MERN Stack

**MERN** stands for:
- **M**ongoDB - NoSQL database to store your data
- **E**xpress - Web framework for Node.js (handles HTTP requests/responses)
- **R**eact - Frontend framework (you already know this!)
- **N**ode.js - JavaScript runtime for backend (runs JavaScript on the server)

### How They Work Together:
```
React (Frontend) → HTTP Requests → Express (Backend) → MongoDB (Database)
                ← HTTP Responses ←                  ←
```

---

## 🛠️ Prerequisites & Tools

### Required Software:
1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **MongoDB**
   - Option A: MongoDB Atlas (Cloud - Recommended for beginners)
     - Sign up at: https://www.mongodb.com/cloud/atlas
     - Free tier available
   - Option B: MongoDB Community Edition (Local)
     - Download from: https://www.mongodb.com/try/download/community

3. **Postman** (For testing APIs)
   - Download from: https://www.postman.com/downloads/

4. **VS Code** (or your preferred editor)
   - Recommended extensions:
     - ESLint
     - Prettier
     - REST Client (alternative to Postman)

5. **Git** (for version control)
   - Download from: https://git-scm.com/

---

## 📦 Project Setup

### Step 1: Initialize Backend Project

```bash
# Navigate to backend folder
cd expense-tracker-be

# Initialize npm project
npm init -y

# Install core dependencies
npm install express mongoose dotenv cors bcryptjs jsonwebtoken

# Install development dependencies
npm install --save-dev nodemon
```

**What each package does:**
- `express` - Web framework for building APIs
- `mongoose` - MongoDB object modeling (makes database operations easier)
- `dotenv` - Loads environment variables from `.env` file
- `cors` - Allows frontend to communicate with backend (Cross-Origin Resource Sharing)
- `bcryptjs` - Encrypts passwords
- `jsonwebtoken` - Creates authentication tokens
- `nodemon` - Auto-restarts server during development

### Step 2: Create Project Structure

Create the following folder structure:

```
expense-tracker-be/
├── config/
│   └── db.js                 # Database connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── expenseController.js  # Expense CRUD operations
│   └── userController.js     # User operations
├── models/
│   ├── User.js               # User schema
│   └── Expense.js            # Expense schema
├── routes/
│   ├── authRoutes.js         # Authentication routes
│   ├── expenseRoutes.js      # Expense routes
│   └── userRoutes.js         # User routes
├── middleware/
│   ├── auth.js               # Authentication middleware
│   └── errorHandler.js       # Error handling
├── utils/
│   └── validators.js         # Input validation
├── .env                      # Environment variables (DO NOT COMMIT)
├── .gitignore                # Git ignore file
├── server.js                 # Entry point
└── package.json
```

### Step 3: Create Basic Files

#### `.gitignore`
```gitignore
node_modules/
.env
.DS_Store
*.log
dist/
```

#### `package.json` scripts
Update your `package.json`:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

---

## 🗄️ Database Design

### User Schema
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Expense Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  amount: Number (required),
  date: Date (required),
  category: String (required),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Categories (from your frontend)
- Food & Drinks
- Transport
- Housing
- Entertainment
- Shopping
- Utilities
- Healthcare
- Education
- Travel
- Other

---

## 🏗️ Backend Architecture

### Request Flow:
```
Client Request → Routes → Middleware → Controller → Model → Database
                                                          ↓
Client Response ← Routes ← Middleware ← Controller ← Model ← Database
```

### Key Concepts:

1. **Routes** - Define API endpoints (URLs)
2. **Controllers** - Handle business logic
3. **Models** - Define database structure
4. **Middleware** - Functions that run between request and response
   - Authentication (verify user is logged in)
   - Validation (check if data is correct)
   - Error handling

---

## 📝 Step-by-Step Implementation

### Phase 1: Basic Server Setup

#### 1. Create `server.js`

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Allow frontend to access backend
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Expense Tracker API is running!' });
});

// Routes will be added here
// app.use('/api/auth', authRoutes);
// app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

#### 2. Create `.env` file

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
# For MongoDB Atlas (Cloud):
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/expense-tracker?retryWrites=true&w=majority

# For Local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/expense-tracker

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

**⚠️ Important:** Never commit `.env` to Git!

#### 3. Test Server

```bash
npm run dev
```

Visit: `http://localhost:5000` - You should see the JSON message.

---

### Phase 2: Database Connection

#### Create `config/db.js`

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

Update `server.js` to use this:
```javascript
const connectDB = require('./config/db');
connectDB();
```

---

### Phase 3: Create Models

#### Create `models/User.js`

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false // Don't return password by default
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

#### Create `models/Expense.js`

```javascript
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be greater than 0']
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Food & Drinks',
      'Transport',
      'Housing',
      'Entertainment',
      'Shopping',
      'Utilities',
      'Healthcare',
      'Education',
      'Travel',
      'Other'
    ]
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

// Index for faster queries
expenseSchema.index({ userId: 1, date: -1 });
expenseSchema.index({ userId: 1, category: 1 });

module.exports = mongoose.model('Expense', expenseSchema);
```

---

### Phase 4: Authentication System

#### Create `middleware/auth.js`

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify user is authenticated
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized to access this route' 
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ 
          success: false, 
          message: 'User not found' 
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized, token failed' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

module.exports = { protect };
```

#### Create `controllers/authController.js`

```javascript
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check if user exists and get password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getMe
};
```

#### Create `routes/authRoutes.js`

```javascript
const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
```

---

### Phase 5: Expense CRUD Operations

#### Create `controllers/expenseController.js`

```javascript
const Expense = require('../models/Expense');

// @desc    Get all expenses for logged-in user
// @route   GET /api/expenses
// @access  Private
const getExpenses = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, startDate, endDate, minAmount, maxAmount, search } = req.query;
    
    // Build query
    const query = { userId: req.user.id };
    
    if (category) {
      query.category = category;
    }
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = parseFloat(minAmount);
      if (maxAmount) query.amount.$lte = parseFloat(maxAmount);
    }
    
    if (search) {
      query.description = { $regex: search, $options: 'i' };
    }
    
    // Execute query with pagination
    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Expense.countDocuments(query);
    
    res.json({
      success: true,
      data: expenses,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single expense
// @route   GET /api/expenses/:id
// @access  Private
const getExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }
    
    res.json({
      success: true,
      data: expense
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new expense
// @route   POST /api/expenses
// @access  Private
const createExpense = async (req, res) => {
  try {
    const { amount, date, category, description } = req.body;
    
    // Validation
    if (!amount || !date || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide amount, date, and category'
      });
    }
    
    const expense = await Expense.create({
      userId: req.user.id,
      amount,
      date,
      category,
      description
    });
    
    res.status(201).json({
      success: true,
      data: expense
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);
    
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }
    
    // Make sure user owns the expense
    if (expense.userId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }
    
    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      data: expense
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }
    
    // Make sure user owns the expense
    if (expense.userId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }
    
    await expense.deleteOne();
    
    res.json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get expense statistics
// @route   GET /api/expenses/stats
// @access  Private
const getStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const query = { userId: req.user.id };
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    // Get total expenses
    const totalExpenses = await Expense.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    // Get expenses by category
    const expensesByCategory = await Expense.aggregate([
      { $match: query },
      { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);
    
    // Get monthly expenses
    const monthlyExpenses = await Expense.aggregate([
      { $match: query },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    res.json({
      success: true,
      data: {
        totalExpenses: totalExpenses[0]?.total || 0,
        expensesByCategory,
        monthlyExpenses,
        totalCount: await Expense.countDocuments(query)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getStats
};
```

#### Create `routes/expenseRoutes.js`

```javascript
const express = require('express');
const router = express.Router();
const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getStats
} = require('../controllers/expenseController');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

router.route('/')
  .get(getExpenses)
  .post(createExpense);

router.route('/stats')
  .get(getStats);

router.route('/:id')
  .get(getExpense)
  .put(updateExpense)
  .delete(deleteExpense);

module.exports = router;
```

---

### Phase 6: Update server.js with Routes

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

---

## 🔌 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |

### Expense Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/expenses` | Get all expenses (with filters) | Private |
| GET | `/api/expenses/stats` | Get expense statistics | Private |
| GET | `/api/expenses/:id` | Get single expense | Private |
| POST | `/api/expenses` | Create new expense | Private |
| PUT | `/api/expenses/:id` | Update expense | Private |
| DELETE | `/api/expenses/:id` | Delete expense | Private |

### Query Parameters for GET /api/expenses:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category
- `startDate` - Filter from date (YYYY-MM-DD)
- `endDate` - Filter to date (YYYY-MM-DD)
- `minAmount` - Minimum amount
- `maxAmount` - Maximum amount
- `search` - Search in description

---

## 🔐 Authentication & Security

### How JWT Works:
1. User logs in → Server creates JWT token
2. Frontend stores token (localStorage or cookies)
3. Frontend sends token in header: `Authorization: Bearer <token>`
4. Backend verifies token → Allows/Denies request

### Security Best Practices:
1. ✅ Always hash passwords (using bcrypt)
2. ✅ Use environment variables for secrets
3. ✅ Validate all inputs
4. ✅ Use HTTPS in production
5. ✅ Set token expiration
6. ✅ Sanitize user inputs

---

## 🔗 Frontend-Backend Integration

### Step 1: Install Axios in Frontend

```bash
cd expense-tracker-fe
npm install axios
```

### Step 2: Create API Service

Create `expense-tracker-fe/src/services/api.js`:

```javascript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
};

// Expense API
export const expenseAPI = {
  getAll: (params) => api.get('/expenses', { params }),
  getById: (id) => api.get(`/expenses/${id}`),
  create: (data) => api.post('/expenses', data),
  update: (id, data) => api.put(`/expenses/${id}`, data),
  delete: (id) => api.delete(`/expenses/${id}`),
  getStats: (params) => api.get('/expenses/stats', { params })
};

export default api;
```

### Step 3: Update Frontend Components

Example: Update `AddExpenseSidebar/helpers.js`:

```javascript
import { expenseAPI } from '../../../services/api';

export const handleSubmit = async (e, formData, setFormData, onClose) => {
  e.preventDefault();
  
  try {
    const response = await expenseAPI.create(formData);
    console.log('Expense created:', response.data);
    
    // Reset form
    setFormData({
      amount: '',
      date: '',
      category: '',
      description: ''
    });
    
    onClose();
    
    // Optionally refresh expenses list
    window.dispatchEvent(new Event('expenseCreated'));
  } catch (error) {
    console.error('Error creating expense:', error.response?.data?.message || error.message);
    alert(error.response?.data?.message || 'Failed to create expense');
  }
};
```

### Step 4: Create Environment Variable

Create `expense-tracker-fe/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 Testing

### Using Postman:

1. **Register User:**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/register`
   - Body (JSON):
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123"
     }
     ```

2. **Login:**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/login`
   - Body (JSON):
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - Copy the `token` from response

3. **Create Expense:**
   - Method: POST
   - URL: `http://localhost:5000/api/expenses`
   - Headers: `Authorization: Bearer <your_token>`
   - Body (JSON):
     ```json
     {
       "amount": 100,
       "date": "2024-01-15",
       "category": "Food & Drinks",
       "description": "Lunch"
     }
     ```

4. **Get Expenses:**
   - Method: GET
   - URL: `http://localhost:5000/api/expenses`
   - Headers: `Authorization: Bearer <your_token>`

---

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. **Prepare for deployment:**
   - Update `.env` with production values
   - Add `"engines"` to `package.json`:
     ```json
     {
       "engines": {
         "node": "18.x",
         "npm": "9.x"
       }
     }
     ```

2. **Deploy to Heroku:**
   ```bash
   # Install Heroku CLI
   heroku login
   heroku create expense-tracker-api
   git push heroku main
   ```

3. **Set environment variables:**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_secret
   heroku config:set FRONTEND_URL=https://your-frontend-url.com
   ```

### Frontend Deployment (Vercel/Netlify)

1. Update frontend `.env`:
   ```env
   VITE_API_URL=https://your-backend-url.com/api
   ```

2. Deploy to Vercel:
   ```bash
   npm install -g vercel
   cd expense-tracker-fe
   vercel
   ```

---

## 🐛 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error:**
   - Check MongoDB URI in `.env`
   - Verify MongoDB is running (if local)
   - Check network access (if Atlas)

2. **CORS Error:**
   - Verify `FRONTEND_URL` in backend `.env`
   - Check CORS configuration in `server.js`

3. **Authentication Error:**
   - Verify token is being sent in headers
   - Check token expiration
   - Verify JWT_SECRET matches

4. **Port Already in Use:**
   - Change PORT in `.env`
   - Or kill process: `lsof -ti:5000 | xargs kill`

---

## 📚 Learning Resources

1. **Node.js & Express:**
   - https://nodejs.org/docs
   - https://expressjs.com/

2. **MongoDB & Mongoose:**
   - https://www.mongodb.com/docs/
   - https://mongoosejs.com/docs/

3. **JWT Authentication:**
   - https://jwt.io/introduction

4. **REST API Best Practices:**
   - https://restfulapi.net/

---

## ✅ Next Steps

1. ✅ Set up basic server
2. ✅ Connect to MongoDB
3. ✅ Create models
4. ✅ Implement authentication
5. ✅ Create expense CRUD
6. ✅ Add filtering and pagination
7. ✅ Integrate with frontend
8. ✅ Add error handling
9. ✅ Test all endpoints
10. ✅ Deploy to production

---

## 🎓 Tips for Learning

1. **Start Small:** Build one feature at a time
2. **Test Frequently:** Use Postman to test each endpoint
3. **Read Error Messages:** They tell you what's wrong
4. **Use Console.log:** Debug by logging values
5. **Read Documentation:** Official docs are your best friend
6. **Ask Questions:** Stack Overflow, Reddit, Discord communities

---

**Good luck with your backend journey! 🚀**

If you get stuck, remember:
- Check the error message
- Verify your code matches the examples
- Ensure all packages are installed
- Check your `.env` file is correct
- Make sure MongoDB is connected

Happy coding! 💻

