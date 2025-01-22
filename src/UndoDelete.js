const UndoDelete = (deleteItem, setExpenses, setDeleteItem, undoTimeout, setUndoTimeout) => {
    if (deleteItem) {
        setExpenses((expenses) => [...expenses, deleteItem]);
        setDeleteItem(null);
        if (undoTimeout) {
            clearTimeout(undoTimeout);
        }
    };
}

export default UndoDelete;