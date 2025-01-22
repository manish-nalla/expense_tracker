const AddExpenses = (amount, setAmount, description, setDescription, expenses, setExpenses) => {

    if (!description.trim()) {
        alert("Description cannot be empty!");
        return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
        alert("Please enter a valid positive number!");
        setAmount("");
        return;
    }

    const newExpense = { description, amount: amountValue.toFixed(2), id: Date.now() }
    setExpenses([...expenses, newExpense]);
    setDescription("");
    setAmount("");
};

export default AddExpenses;