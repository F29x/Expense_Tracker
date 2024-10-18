
import Balances from './components/Balances';
import Expenses from './components/Expenses';
import Header from './components/Header';
import List from './components/List';
import {ExpenseProvider} from "./components/ExpenseContext"

function App() {
  return (
    <ExpenseProvider>
      <div className="app">
        <h1>Expense Tracker</h1>
        <Header />
        <div className="main">
          <Balances />
          <Expenses />
          <List />
        </div>
      </div>
    </ExpenseProvider>
  );
}

export default App;
