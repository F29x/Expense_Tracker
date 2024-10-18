// src/ExpenseContext.js
import { createContext, useState, useEffect } from 'react';

// Create the Expense Context
export const ExpenseContext = createContext();

// Provider component
export const ExpenseProvider = ({ children }) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const categories = ['Food', 'Bills', 'Car', 'Coffee', 'Clothes', 'Extra'];

  // Function to get initial expenses from localStorage or default values
  const getInitialExpenses = () => {
    const storedExpenses = localStorage.getItem('expenses');
    return storedExpenses ? JSON.parse(storedExpenses) : categories.map(() => daysOfWeek.map(() => 0));
  };

  // Get initial income and balance from localStorage or defaults
  const getInitialIncome = () => {
    const storedIncome = localStorage.getItem('income');
    return storedIncome ? Number(storedIncome) : 0;
  };

  const getInitialBalance = () => {
    const storedBalance = localStorage.getItem('balance');
    return storedBalance ? Number(storedBalance) : 0; // Always default to 0 if not found
  };

  // Function to retrieve historical expenses from localStorage
  const getHistoricalExpenses = () => {
    const storedHistory = localStorage.getItem('expenseHistory');
    return storedHistory ? JSON.parse(storedHistory) : [];
  };

  // Function to get the initial week count
  const getInitialWeekCount = () => {
    const storedWeekCount = localStorage.getItem('weekCount');
    return storedWeekCount ? Number(storedWeekCount) : 1; // Default to week 1 if not found
  };

  // State for expenses, income, balance, history, and week count
  const [expenses, setExpenses] = useState(getInitialExpenses);
  const [totalIncome, setTotalIncome] = useState(getInitialIncome);
  const [balance, setBalance] = useState(getInitialBalance);
  const [expenseHistory, setExpenseHistory] = useState(getHistoricalExpenses);
  const [weekCount, setWeekCount] = useState(getInitialWeekCount);

  // Sync localStorage for income, expenses, and week count
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('income', totalIncome);
  }, [totalIncome]);

  useEffect(() => {
    localStorage.setItem('weekCount', weekCount);
  }, [weekCount]);

  // Function to calculate total expenses
  const calculateTotalExpenses = () => {
    return expenses.flat().reduce((total, value) => total + Number(value), 0);
  };

  // Function to add income and update the balance
  const addIncome = (income) => {
    const newIncome = totalIncome + income;
    setTotalIncome(newIncome);
    const updatedBalance = balance + income; // Add income to the current balance
    setBalance(updatedBalance);
    localStorage.setItem('balance', updatedBalance); // Update balance in local storage
    localStorage.setItem('income', newIncome); // Update income in local storage
  };

  // Function to save weekly expenses history and update the balance
  const saveExpenseHistory = () => {
    const totalWeeklyExpenses = calculateTotalExpenses();
    const newBalance = balance - totalWeeklyExpenses; // Update balance based on total expenses
    const date = new Date().toISOString();
    const history = { date, expenses: [...expenses], total: totalWeeklyExpenses };

    // Update expense history
    const updatedHistory = [...expenseHistory, history];
    setExpenseHistory(updatedHistory);
    localStorage.setItem('expenseHistory', JSON.stringify(updatedHistory));

    // Update the balance and store it
    setBalance(newBalance);
    localStorage.setItem('balance', newBalance);

    // Reset the expenses for the new week
    resetExpenses();

    // Update the week count
    incrementWeekCount();
  };

  // Function to increment the week count
  const incrementWeekCount = () => {
    setWeekCount(prevCount => prevCount + 1);
  };

  // Function to reset the week count to 1
  const resetWeekCount = () => {
    setWeekCount(1);
    localStorage.setItem('weekCount', 1);
  };

  // Function to reset expenses only (does not affect the balance)
  const resetExpenses = () => {
    const resetExpenses = categories.map(() => daysOfWeek.map(() => 0));
    setExpenses(resetExpenses);
    localStorage.setItem('expenses', JSON.stringify(resetExpenses));
  };

  // Function to reset income only
  const resetIncome = () => {
    setTotalIncome(0);
    localStorage.setItem('income', 0);
  };

  // Function to reset balance only (explicitly called via button)
  const resetBalance = () => {
    setBalance(0);
    localStorage.setItem('balance', 0);
  };

  return (
    <ExpenseContext.Provider value={{
      expenses, setExpenses, calculateTotalExpenses,
      totalIncome, setTotalIncome, addIncome,
      balance, setBalance,
      expenseHistory, saveExpenseHistory,
      weekCount, resetWeekCount,
      resetExpenses, resetIncome, resetBalance,
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};

