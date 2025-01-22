import './App.css';
import React, { useState, useEffect } from 'react';
import GetDate from './getDate.js';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpenses = (e) => {

    e.preventDefault();

    if(!description.trim()){
      alert("Description cannot be empty!");
      return;
    }

    const amountValue = parseFloat(amount);
    if(isNaN(amountValue) || amountValue <= 0) {
      alert("Please enter a valid positive number!");
      setAmount("")
      return;
    }

    const newExpense = {description, amount:amountValue.toFixed(2),id:Date.now()}
    setExpenses([...expenses, newExpense])
    setDescription("");
    setAmount("");
  };

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

            <button className='btn' type='button' onClick={addExpenses}>Add Expense</button>
          </form>
        </div>
        <div className='expenses'>
          <h2>Expenses</h2>
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id}>
                {expense.description}: ${expense.amount} <GetDate />
                
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
