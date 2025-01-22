import './App.css';
import React, { useState, useEffect } from 'react';
import GetDate from './getDate.js';
import DeleteExpense from './DeleteExpense.js';
import AddExpenses from './AddExpenses.js';
import UndoDelete from './UndoDelete.js';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);


  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <>
      <div className='app'>
        <div className='heading'>
          <h1>Expense Tracker</h1>
        </div>
        <div className='expense-input'>
          <form>
            <select name="selectedCurrency" defaultValue="USD">
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
            </select>

            <input
              type='number'
              placeholder='Enter amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type='text'
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button className='btn' type='button' onClick={() => AddExpenses(amount, setAmount, description, setDescription, expenses, setExpenses)}>Add Expense</button>
          </form>
        </div>
        <div className='expenses'>
          <h2>Expenses</h2>
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id}>
                {expense.description}: ${expense.amount} <GetDate />
                <button onClick={() => DeleteExpense(expense.id, expenses, setExpenses,setDeleteItem,undoTimeout, setUndoTimeout)}>Delete Expense</button>
              </li>
            ))}
          </ul>
        </div>
        {deleteItem && (
          <div>
            <p>Deleted "{deleteItem.description}".</p>
            <button onClick={()=>UndoDelete(deleteItem, setExpenses,setDeleteItem,undoTimeout, setUndoTimeout)}>Undo</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
