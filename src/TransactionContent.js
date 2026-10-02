
const TransactionContent = ({transactions,
    deleteTransaction,fetchTransaction,setEditingId,setAmount,setCategory,setTransactionType,setDate,setPayment,setDescription,setNotes,setShowForm
}) => {

    const handleDelete = async (id) =>{
        await  deleteTransaction(id)
        fetchTransaction()
    }

    const handleEdit = (transaction) =>{
        setEditingId(transaction.id)
        setTransactionType(transaction.type)
        setAmount(transaction.amount)
        setCategory(transaction.category)
        setDate(transaction.date)
        setPayment(transaction.paymentMethod)
        setDescription(transaction.description)
        setNotes(transaction.notes)

        setShowForm(true)
    }

    const paymentLabels = {
      upi : "UPI",
      creditcard : "Credit Card",
      debitcard : "Debit Card",
      cash : "Cash",
      expense : "Expense",
      income : "Income",
      food : "Food",
      bills : "Bills",
      other : "Others",
      rent : "Rent"

    }

    const formatDate = (datavalue) => {
        const [year , month , day] = datavalue.split("-")

        return new Intl.DateTimeFormat("en-IN", {
          day : "2-digit",
          month : "short",
          year : "numeric"
        }).format(new Date(year, month -1 , day))
    }
  return (
    <div>
        <table className="transaction-content">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Payement Method</th>
              <th>Description</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{paymentLabels[transaction.type]}</td>
                <td>{transaction.amount}</td>
                <td>{paymentLabels[transaction.category]}</td>
                <td>{formatDate(transaction.date)}</td>
                <td>{paymentLabels[transaction.paymentMethod]}</td>
                <td>{transaction.description}</td>
                <td>{transaction.notes}</td>
                <td className="actions-cell">
                  <button className="edit-button" onClick={() => handleEdit(transaction)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(transaction.id)}>Delete</button>
                </td>
              </tr>

            ))

            }
          </tbody>
        </table>
    </div>
  )
}

export default TransactionContent