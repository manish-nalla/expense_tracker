import React from "react";

const InputForm = ({formData, formHandlers}) => {
    const {currency, allowedCurrencies, amount, description, expenses} = formData;
    const {setCurrency, setAmount, setDescription, setExpenses, AddExpenses} = formHandlers;


    return (
        <form>
            <label htmlFor='currency'>Currency: </label>
            <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              {allowedCurrencies.map((curr) => (
                <option key = {curr} value={curr}>{curr}</option>
              ))}
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
    );
}

export default InputForm;