// import { useState } from "react";
// import UndoDelete from './UndoDelete.js';

const DeleteExpense = (id, expenses, setExpenses, setDeleteItem, undoTimeout, setUndoTimeout) => {

    const isConfirmed = window.confirm("Are you sure you want to delete this expenses?");
    if (isConfirmed) {

        const itemToDelete = expenses.find((expense) => expense.id === id);
        setDeleteItem(itemToDelete);
        const updatedExpenses = expenses.filter((expense) => expense.id !== id);
        setExpenses(updatedExpenses);

        if (undoTimeout) {
            clearTimeout(undoTimeout);
        }
        const timeout = setTimeout(() => {
            setDeleteItem(null);
        }, 5000);
        setUndoTimeout(timeout);
    };
}


export default DeleteExpense;