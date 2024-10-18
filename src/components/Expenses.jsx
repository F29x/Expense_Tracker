// src/components/Expenses.js
import { useContext, useState } from 'react';
import { ExpenseContext } from './ExpenseContext';

const Expenses = () => {
  const { addIncome, calculateTotalExpenses, totalIncome, resetIncome } = useContext(ExpenseContext);
  const [incomeInput, setIncomeInput] = useState(0);

  const handleAddIncome = () => {
    if (incomeInput > 0) {
      addIncome(incomeInput); // Use the new function to add income and update the balance
      setIncomeInput(0); // Clear the input field
    }
  };

  return (
    <div className="expenses">
      <div className="plus">
        <h4>Income:</h4>
        <p>+ {totalIncome.toFixed(2)} Lek</p>
        <input
          type="number"
          value={incomeInput}
          onChange={(e) => setIncomeInput(Number(e.target.value))}
          placeholder="Add Income"
        />
        <button onClick={handleAddIncome} style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}>
          Add Income
        </button>
        {/* Reset Income Button */}
        <button onClick={resetIncome} style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer', marginLeft: '10px' }}>
          Reset Income
        </button>
      </div>
      <div className="minus">
        <h4>Expenses:</h4>
        <p>- {calculateTotalExpenses().toFixed(2)} Lek</p>
      </div>
    </div>
  );
};

export default Expenses;
