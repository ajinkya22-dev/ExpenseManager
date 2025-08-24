import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [
    { id: '1', title: 'Groceries', amount: 150.50, category: 'Food', date: '2024-01-15', description: 'Weekly grocery shopping' },
    { id: '2', title: 'Gas', amount: 75.00, category: 'Transportation', date: '2024-01-14', description: 'Fuel for car' },
    { id: '3', title: 'Netflix', amount: 15.99, category: 'Entertainment', date: '2024-01-13', description: 'Monthly subscription' },
    { id: '4', title: 'Coffee', amount: 4.50, category: 'Food', date: '2024-01-12', description: 'Morning coffee' },
    { id: '5', title: 'Gym Membership', amount: 45.00, category: 'Health', date: '2024-01-11', description: 'Monthly gym fee' },
  ],
  totalExpense: 290.99,
  monthlyBudget: 2000,
  categories: ['Food', 'Transportation', 'Entertainment', 'Health', 'Shopping', 'Bills', 'Travel', 'Other'],
  notifications: [
    {
      id: '1',
      message: 'New expense added: Groceries - $150.50',
      type: 'expense',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
    },
    {
      id: '2',
      message: 'Monthly budget warning: 85% used',
      type: 'warning',
      timestamp: '2024-01-14T15:45:00Z',
      isRead: false,
    },
  ],
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
      state.totalExpense += action.payload.amount;

      // Add notification for new expense
      const notification = {
        id: Date.now().toString(),
        message: `New expense added: ${action.payload.title} - $${action.payload.amount.toFixed(2)}`,
        type: 'expense',
        timestamp: new Date().toISOString(),
        isRead: false,
      };
      state.notifications.unshift(notification);
    },
    removeExpense: (state, action) => {
      const expense = state.expenses.find(exp => exp.id === action.payload);
      if (expense) {
        state.totalExpense -= expense.amount;
        state.expenses = state.expenses.filter(exp => exp.id !== action.payload);
      }
    },
    updateExpense: (state, action) => {
      const index = state.expenses.findIndex(exp => exp.id === action.payload.id);
      if (index !== -1) {
        state.totalExpense = state.totalExpense - state.expenses[index].amount + action.payload.amount;
        state.expenses[index] = action.payload;
      }
    },
    setBudget: (state, action) => {
      state.monthlyBudget = action.payload;
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  addExpense,
  removeExpense,
  updateExpense,
  setBudget,
  markNotificationAsRead,
  clearAllNotifications
} = expenseSlice.actions;
export default expenseSlice.reducer;
