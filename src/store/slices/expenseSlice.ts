import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

interface ExpenseState {
  expenses: Expense[];
  totalExpense: number;
  monthlyBudget: number;
  categories: string[];
}

const initialState: ExpenseState = {
  expenses: [
    { id: '1', title: 'Groceries', amount: 150.50, category: 'Food', date: '2024-01-15', description: 'Weekly grocery shopping' },
    { id: '2', title: 'Gas', amount: 75.00, category: 'Transportation', date: '2024-01-14', description: 'Fuel for car' },
    { id: '3', title: 'Netflix', amount: 15.99, category: 'Entertainment', date: '2024-01-13', description: 'Monthly subscription' },
    { id: '4', title: 'Coffee', amount: 4.50, category: 'Food', date: '2024-01-12', description: 'Morning coffee' },
    { id: '5', title: 'Gym Membership', amount: 45.00, category: 'Health', date: '2024-01-11', description: 'Monthly gym fee' },
  ],
  totalExpense: 290.99,
  monthlyBudget: 2000,
  categories: ['Food', 'Transportation', 'Entertainment', 'Health', 'Shopping', 'Bills', 'Other'],
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
      state.totalExpense += action.payload.amount;
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      const expense = state.expenses.find(exp => exp.id === action.payload);
      if (expense) {
        state.totalExpense -= expense.amount;
        state.expenses = state.expenses.filter(exp => exp.id !== action.payload);
      }
    },
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.expenses.findIndex(exp => exp.id === action.payload.id);
      if (index !== -1) {
        state.totalExpense = state.totalExpense - state.expenses[index].amount + action.payload.amount;
        state.expenses[index] = action.payload;
      }
    },
    setBudget: (state, action: PayloadAction<number>) => {
      state.monthlyBudget = action.payload;
    },
  },
});

export const { addExpense, removeExpense, updateExpense, setBudget } = expenseSlice.actions;
export default expenseSlice.reducer;