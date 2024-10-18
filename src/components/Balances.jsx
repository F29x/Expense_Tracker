
import { useContext } from 'react';
import { ExpenseContext } from './ExpenseContext';

const Balances = () => {
  const { balance, resetBalance } = useContext(ExpenseContext);

  return (
    <div className="balance">
      <h4>Balance</h4>
      <p>Your Balance:</p>
      <p id="lek">Lek: {balance.toFixed(2)}</p>

      {/* Reset Balance Button */}
      <button onClick={resetBalance} style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}>
        Reset Balance
      </button>
    </div>
  );
};

export default Balances;
