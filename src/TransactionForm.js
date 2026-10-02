
const TransactionForm = ({setTransactions,editingId,setEditingId,transactionType,setTransactionType,amount,setAmount,category,setCategory,
date,setDate,payment,setPayment,description,setDescription,notes,setNotes,showForm,setShowForm,
addTransactionList,fetchTransaction,updateTransaction,
}) => {
    
    const handleTransaction = async (event) =>{
      event.preventDefault()
        const addNewTransaction = {
          type : transactionType,
          amount,
          category,
          date,
          paymentMethod: payment,
          description,
          notes
        }

        if(editingId !== null){
          await updateTransaction(editingId,addNewTransaction)
          await fetchTransaction()
        }
        else{
          const response = await addTransactionList(addNewTransaction)
          const transactionList = prev => ([...prev , response.data])
          setTransactions(transactionList)
        }

        setShowForm(false)

    }

    const openAddTransaction = () =>{
      resetForm()
      setShowForm(true)
    }

    const closeForm = () => {
      resetForm()
      setShowForm(false)
    }

    const resetForm = () =>{
      setEditingId(null)
        setTransactionType("expense")
        setAmount("")
        setCategory("food")
        setDate(new Date().toISOString().split("T")[0])
        setPayment("upi")
        setDescription("")
        setNotes("")
    }

  return (
    <div className="transaction-form-wrap">
        <button className='info-button' onClick={() => openAddTransaction()}>
          +
          <span className='tooltip'>Add a transaction</span>
        </button>


        
        {showForm &&(
          <div className='model-overlay'onClick={()=> closeForm()}>
            <div className='transaction-overlay' onClick={(event) => event.stopPropagation()}>
              <button className='close-button' type='button' onClick={() => closeForm()}>
                x
              </button>

            
        <form className='transaction-form' onSubmit={handleTransaction}>
          <div className='type-toggle'>
            <label>
              <input 
                type="radio" 
                name = "transaction-type" 
                value="expense"
                checked = {transactionType === "expense"}
                onChange={(event) => (setTransactionType(event.target.value))}
                defaultChecked
              />
              <span>Expense</span><br />
            </label>

            <label>
              <input
               type="radio"
               name = "transaction-type"
               value="income"
               checked = {transactionType === "income"}
               onChange={(event) => setTransactionType(event.target.value)}
              />
              <span>Income</span>
            </label>
          </div>

          <div className='form-grid'>
          <label className='form-field'>
            Amount
            <input 
              type="text" 
              placeholder='0.00'
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              required
 
            />
          </label>
          
          <label className='form-field'>
            Category
            <select name="expense-options" id="expense-options"
              value={category} onChange={(event) => setCategory(event.target.value)} 
            >
              <option value="food">Food</option>
              <option value="rent">Rent</option>
              <option value="bills">Bills</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label className='form-field'>
            Date
            <input 
              type="date" 
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>

          <label className='form-field'>
            Payment Method
            <select name="payment-methods" id="payment-methods"
              value={payment} onChange={(event) => setPayment(event.target.value)}
            >
              <option value="upi">UPI</option>
              <option value="creditcard">Credit Card</option>
              <option value="debitcard">Debit Card</option>d
              <option value="cash">Cash</option>
            </select>
          </label>
          </div>

          <label className='form-field'>
            Description
            <input type="text" placeholder='e.g. Monthly grocery shopping'
            value={description}
            onChange={(event) => setDescription(event.target.value)}/>
          </label>

          <label className='form-field'>
            Notes <span>(optional)</span>
            <textarea placeholder='Add any extra details' rows="3"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            >

            </textarea>
          </label>

          <div className='form-actions'> 
            <button type='button' className='cancel-button' onClick={() => closeForm()}>
              Cancel
            </button>

            <button type='submit' className='save-button'>
              {editingId ? "Save Changes" : "Save Transaction"}
            </button>
          </div>

          
        </form>
        </div>
        </div>
        )}
    </div>
  )
}

export default TransactionForm