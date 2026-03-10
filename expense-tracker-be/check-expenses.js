const mongoose = require('mongoose');
require('dotenv').config();

const Expense = require('./src/models/Expense');

const checkExpenses = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const expenses = await Expense.find().sort({ createdAt: -1 });
    console.log(`\n📊 Total Expenses: ${expenses.length}\n`);
    
    if (expenses.length > 0) {
      console.log('Recent Expenses:');
      console.log('─'.repeat(80));
      expenses.forEach((expense, index) => {
        console.log(`\n${index + 1}. ${expense.category} - ₹${expense.amount}`);
        console.log(`   Date: ${new Date(expense.date).toLocaleDateString()}`);
        console.log(`   Description: ${expense.description || 'N/A'}`);
        console.log(`   ID: ${expense._id}`);
        console.log(`   Created: ${new Date(expense.createdAt).toLocaleString()}`);
      });
      console.log('\n' + '─'.repeat(80));
    } else {
      console.log('No expenses found in database.');
    }
    
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkExpenses();
