# Frontend Testing Guide - Add Expense API

## Prerequisites

1. **Backend server must be running** on `http://localhost:5000`
2. **MongoDB must be connected** (check backend terminal for connection confirmation)
3. **Frontend server** will run on `http://localhost:5173` (default Vite port)

---

## Step 1: Start Backend Server

Open a terminal and run:

```bash
cd expense-tracker-be
npm run dev
```

**Expected output:**
```
✅ MongoDB Connected: ...
📊 Database: expense-tracker
🚀 Server running on port 5000
```

---

## Step 2: Start Frontend Server

Open a **new terminal** and run:

```bash
cd expense-tracker-fe
npm run dev
```

**Expected output:**
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## Step 3: Open Browser

Navigate to: **http://localhost:5173/dashboard**

You should see the Dashboard page with:
- Stats Row
- Quick Add Expense form
- Transactions Table
- Spending Chart
- Savings Goal

---

## Step 4: Test QuickAddForm

### Location: Dashboard page (main form)

1. **Fill in the form:**
   - **Amount:** Enter a number (e.g., `150.50`)
   - **Date:** Click date field and select a date
   - **Category:** Select from dropdown (e.g., "Food & Drinks")
   - **Description:** Enter text (e.g., "Lunch at restaurant")

2. **Click "Add Expense" button**

3. **What to observe:**
   - ✅ Button text changes to "Adding..." with a spinner
   - ✅ Button becomes disabled
   - ✅ Form fields become disabled during submission
   - ✅ On success: Form clears/resets automatically
   - ✅ On error: Red error message appears below form

4. **Check browser console** (F12):
   - Should see no errors
   - Network tab should show POST request to `/api/expenses` with status 201

---

## Step 5: Test AddExpenseSidebar

### Location: Can be opened from various places (check your app structure)

1. **Open the sidebar** (if there's a button/trigger to open it)

2. **Fill in the form:**
   - **Amount:** Enter a number (e.g., `250.00`)
   - **Date:** Select a date
   - **Category:** Choose a category
   - **Description:** Enter description (optional)

3. **Click "Add Expense" button**

4. **What to observe:**
   - ✅ Button shows "Adding..." with spinner
   - ✅ Sidebar form becomes disabled
   - ✅ On success: Form resets and sidebar closes automatically
   - ✅ On error: Red error message appears in the form

---

## Step 6: Verify Data in Database

### Option A: Using the check script

In backend terminal:
```bash
cd expense-tracker-be
node check-expenses.js
```

You should see your newly created expenses listed.

### Option B: Using MongoDB Compass

1. Open MongoDB Compass
2. Connect to your database
3. Navigate to: `expense-tracker` → `expenses` collection
4. View your saved expenses

---

## Testing Scenarios

### ✅ Valid Submission
- Fill all required fields (amount, date, category)
- Description is optional
- Should succeed and reset form

### ❌ Missing Required Fields
- Try submitting without amount → Should show error
- Try submitting without date → Should show error
- Try submitting without category → Should show error

### ❌ Invalid Data
- Enter negative amount → Should show validation error
- Enter invalid category → Should show error

### ✅ Network Error Testing
1. Stop the backend server
2. Try to submit a form
3. Should show error: "Network error. Please try again."

---

## What to Check

### ✅ Success Indicators:
- [ ] Form submits without errors
- [ ] Loading spinner appears
- [ ] Form resets after success
- [ ] No console errors
- [ ] Data appears in MongoDB

### ❌ Error Handling:
- [ ] Error messages display correctly
- [ ] Form doesn't reset on error
- [ ] User can retry after error
- [ ] Network errors are handled gracefully

---

## Troubleshooting

### Issue: "Failed to fetch" or Network Error
- **Solution:** Make sure backend is running on port 5000
- Check: `http://localhost:5000` should return API message

### Issue: CORS Error
- **Solution:** Backend CORS is already configured for `http://localhost:5173`
- Check backend `server.js` has CORS middleware

### Issue: Form doesn't reset
- **Check:** Browser console for JavaScript errors
- Verify API response is successful (status 201)

### Issue: Loading state doesn't show
- **Check:** Browser DevTools → Network tab
- Verify request is being sent

---

## Browser DevTools Tips

### Network Tab:
1. Open DevTools (F12)
2. Go to "Network" tab
3. Filter by "XHR" or "Fetch"
4. Submit form
5. Look for POST request to `/api/expenses`
6. Check:
   - Status: 201 (Created)
   - Request payload: Your form data
   - Response: Success message with expense data

### Console Tab:
- Should see no red errors
- Any errors will help identify issues

---

## Quick Test Checklist

- [ ] Backend server running
- [ ] Frontend server running
- [ ] Can access http://localhost:5173/dashboard
- [ ] QuickAddForm visible and functional
- [ ] Can fill form fields
- [ ] Submit button works
- [ ] Loading state appears
- [ ] Form resets on success
- [ ] Error handling works
- [ ] Data saved to MongoDB

---

## Next Steps After Testing

Once testing is successful:
1. ✅ Add Expense API is working
2. Next: Implement "Get Expenses" API to display expenses in the table
3. Then: Implement "Update" and "Delete" APIs
