# Expense-Tracker-MERN

Features list

dashboard
transactions
login/logout
login with google
userProfile

splitwise feature
Bank Account
Budgets per category — you already compute categoryStats with percentages in getExpenseStats; a budget cap + "% used" badge is a small add on top.
Recurring expenses (rent, subscriptions) — cron/scheduled job to auto-insert.
CSV export of filtered transactions (you already have all the filter/query plumbing).
Receipt upload (Cloudinary/S3) attached to an expense — extend Expense.js with an receiptUrl field.
Date-range trend chart — you have SpendingChart (category donut); add a time-series line/bar view using the same stats endpoint pattern.

Input validation
Refresh tokens + password reset email flow.

dark/light theme toggle