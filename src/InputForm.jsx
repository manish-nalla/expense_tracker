import React from "react";
import './inputform.css';
const InputForm = ({ formData, formHandlers }) => {
  const { amount, description, expenses } = formData;
  const { setAmount, setDescription, setExpenses, AddExpenses } = formHandlers;

  return (
    <form className="input-form">
      <input
        type='number'
        placeholder='Enter amount'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="amount"
      />
      <input
        type='text'
        placeholder='Enter description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="description"
      />
      <button className='btn' type='button' onClick={() => AddExpenses(amount, setAmount, description, setDescription, expenses, setExpenses)}>Add Expense</button>
    </form>
  );
}

export default InputForm;