// src/components/List.js
import { useContext } from 'react';
import { ExpenseContext } from './ExpenseContext';

const List = () => {
  const { expenses, setExpenses, resetExpenses, saveExpenseHistory } = useContext(ExpenseContext);

  // Days of the week and categories
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Categories with respective emojis
  const categories = [
    { name: 'Food', emoji: '🍔' },
    { name: 'Bills', emoji: '💡' },
    { name: 'Car', emoji: '🚗' },
    { name: 'Coffee', emoji: '☕' },
    { name: 'Clothes', emoji: '👕' },  // Changed emoji to a t-shirt
    { name: 'Extra', emoji: '💸' }
  ];

  // Handle input changes for each field and update the corresponding state
  const handleInputChange = (rowIndex, colIndex, value) => {
    const newExpenses = [...expenses];
    newExpenses[rowIndex][colIndex] = value;
    setExpenses(newExpenses);
  };

  // Calculate total for each day (column)
  const calculateDayTotal = (colIndex) => {
    return expenses.reduce((total, row) => total + Number(row[colIndex]), 0);
  };

  return (
    <div>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Categories</th>
            {daysOfWeek.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((category, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                {category.emoji} {category.name}
              </td>
              {daysOfWeek.map((_, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={expenses[rowIndex][colIndex]}
                    onChange={(e) => handleInputChange(rowIndex, colIndex, Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </td>
              ))}
            </tr>
          ))}
          {/* Row for displaying the totals */}
          <tr>
            <td><strong>Total</strong></td>
            {daysOfWeek.map((_, colIndex) => (
              <td key={colIndex}>
                <strong>{calculateDayTotal(colIndex)} Lek</strong>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* Button to reset the table values */}
      <button onClick={resetExpenses} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
        Reset Table
      </button>

      {/* Button to save the current week's expenses to history */}
      <button onClick={saveExpenseHistory} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', marginLeft: '10px' , backgroundColor:"blue"}}>
        Save Weekly Expenses
      </button>
    </div>
  );
};

export default List;
