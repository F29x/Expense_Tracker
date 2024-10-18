// src/components/Header.js
import { useContext } from 'react';
import { ExpenseContext } from './ExpenseContext';

function Header() {
  const { weekCount, resetWeekCount } = useContext(ExpenseContext);

  return (
    <div className="header">
      <h3>Main Expenses - Week {weekCount}</h3>
      <button onClick={resetWeekCount} style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}>
        Reset Weeks
      </button>
    </div>
  );
}

export default Header;
