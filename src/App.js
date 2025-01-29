import './App.css';
import React, { useState, useEffect } from 'react';
import GetDate from './getDate.js';
import DeleteExpense from './DeleteExpense.js';
import AddExpenses from './AddExpenses.js';
import UndoDelete from './UndoDelete.js';
import InputForm from './InputForm.jsx';
import Login from './Login.jsx';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);
  const [currency, setCurrency] = useState("INR");
  const [currentUser, setCurrentUser] = useState(null);

  const formData = { currency, amount, description, expenses };
  const formHandlers = { setCurrency, setAmount, setDescription, setExpenses, AddExpenses };

  const handleLogin = (username) => {
    setCurrentUser(username);
    localStorage.setItem("currentUser", username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  useEffect(() => {
    const savedExpenses = localStorage.getItem(`expenses_${currentUser}`);
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`expenses_${currentUser}`, JSON.stringify(expenses));
  }, [expenses, currentUser]);

  return (
    <>
      <div>
        {currentUser
          ?
          <div className='app'>
            <div className='heading'>
              <h1>{currentUser}'s Expense Tracker</h1>
              <button onClick={handleLogout}>Logout</button>
            </div>
            <div className='expense-input'>
              <InputForm formData={formData} formHandlers={formHandlers} />
            </div>
            <div className='expenses'>
              <h2>Expenses</h2>
              <ul>
                {expenses.map((expense) => (
                  <li key={expense.id}>
                    <span>{expense.description}</span><span>{expense.amount}</span> <GetDate />
                    <button onClick={() => DeleteExpense(expense.id, expenses, setExpenses, setDeleteItem, undoTimeout, setUndoTimeout)}>Delete Expense</button>
                  </li>
                ))}
              </ul>
            </div>
            {deleteItem && (
              <div className='delete-message'>
                <p>Deleted "{deleteItem.description}".</p>
                <button onClick={() => UndoDelete(deleteItem, setExpenses, setDeleteItem, undoTimeout, setUndoTimeout)}>Undo</button>
              </div>
            )}
          </div>
          :
          (<Login onLogin={handleLogin} />)
        }
      </div>
    </>
  );
}
export default App;