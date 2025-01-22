import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  // useEffect(()=>{
  //   setExpenses([...expenses])
  // },[])

  const addExpenses = () => {
    if(description && amount){
      setExpenses([...expenses,{description,amount, id: Date.now()}])
      setDescription("");
      setAmount("")
    }
  }

  return (
    <>
      <div className='app'>
        <div className='heading'>
          <h1>Expense Tracker</h1>
        </div>
        <div className='expense-input'>
          <select name="selectedCurrency" defaultValue="USD">
            <option value="USD">USD</option>
            <option value="INR">INR</option>
            <option value="EUR">EUR</option>
          </select>

          <input
            type='number'
            placeholder='Enter amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)} />
          <input
            type='text'
            placeholder='Enter description'
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
            
          <button className='btn' onClick={addExpenses}>Add Expense</button>
        </div>
        <div className='expenses'>
          <h2>Expenses</h2>
          <ul>
            {expenses.map((expense)=>(
              <li key={expense.id}>
                {expense.description}: ${expense.amount}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
