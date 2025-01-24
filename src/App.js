import './App.css';
import React, { useState, useEffect } from 'react';
import GetDate from './getDate.js';
import DeleteExpense from './DeleteExpense.js';
import AddExpenses from './AddExpenses.js';
import UndoDelete from './UndoDelete.js';
import ConvertAmount from './ConvertAmount.js';
import InputForm from './InputForm.jsx';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);
  const [currency, setCurrency] = useState("INR");
  const [conversionRates, setConversionRates] = useState({});

  const currencySymbols = {
    USD: "$",
    EUR: "€",
    INR: "₹",
  };

  const allowedCurrencies = Object.keys(currencySymbols);

  const formData = {currency, allowedCurrencies, amount, description, expenses};
  const formHandlers = {setCurrency, setAmount, setDescription, setExpenses, AddExpenses};

  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/48ccbc3eb045c915cb745bc4/latest/USD`)
      .then((response) => response.json())
      .then((data) => {
        const { conversion_rates } = data;
        const filteredRates = {};
        allowedCurrencies.forEach((curr) => {
          filteredRates[curr] = conversion_rates[curr];
        });
        setConversionRates(filteredRates);
      })
      .catch((error) => console.error("Error fetching conversion rates:", error));
  }, [allowedCurrencies])

  return (
    <>
      <div className='app'>
        <div className='heading'>
          <h1>Expense Tracker</h1>
        </div>
        <div className='expense-input'>
          <InputForm formData = {formData} formHandlers = {formHandlers}/>
        </div>
        <div className='expenses'>
          <h2>Expenses</h2>
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id}>
                {expense.description}: {currencySymbols[currency]} {ConvertAmount(expense.amount, conversionRates, currency)} <GetDate />
                <button onClick={() => DeleteExpense(expense.id, expenses, setExpenses, setDeleteItem, undoTimeout, setUndoTimeout)}>Delete Expense</button>
              </li>
            ))}
          </ul>
        </div>
        {deleteItem && (
          <div>
            <p>Deleted "{deleteItem.description}".</p>
            <button onClick={() => UndoDelete(deleteItem, setExpenses, setDeleteItem, undoTimeout, setUndoTimeout)}>Undo</button>
          </div>
        )}
      </div>
    </>
  );
}
export default App;