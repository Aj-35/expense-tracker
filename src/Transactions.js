import React from 'react'
import { useState, useEffect } from 'react'
import './Transactions.css'
import { addTransactionList, getTransaction,updateTransaction, deleteTransaction } from './services/trancservice'
import TransactionForm from './TransactionForm'
import TransactionContent from './TransactionContent'


const Transactions = () => {
    const[showForm,setShowForm] = useState(false)
    const[transactionType,setTransactionType] = useState("expense")
    const[amount,setAmount] = useState("")
    const[category,setCategory] = useState("food")
    const[date,setDate] = useState(new Date().toISOString().split("T")[0])
    const[payment,setPayment] = useState("upi")
    const[description,setDescription] = useState("")
    const[notes,setNotes] = useState("")

    const formfields = {
      showForm,setShowForm,
      transactionType,setTransactionType,
      amount,setAmount,
      category,setCategory,
      date,setDate,
      payment,setPayment,
      description,setDescription,
      notes,setNotes
    }


    const[transactions,setTransactions] = useState([])
    const[editingId,setEditingId] = useState(null)

    useEffect(() => {fetchTransaction()},[])

    const fetchTransaction = async () => {
      try{
        const response = await getTransaction()
        setTransactions(response.data)
      }
      catch(err){
        console.log(err.message)
        alert("Can't reach the Server")
      }
    }
 
  return (
    <div>
        <h1>Transactions</h1>

        <TransactionForm 
          transactions = {transactions}
          setTransactions = {setTransactions}
          editingId = {editingId}
          setEditingId = {setEditingId}
          addTransactionList = {addTransactionList}
          fetchTransaction = {fetchTransaction}
          updateTransaction = {updateTransaction}
          {...formfields}
          
        />
        
        <TransactionContent 
          transactions = {transactions}
          setEditingId = {setEditingId}
          deleteTransaction = {deleteTransaction}
          fetchTransaction = {fetchTransaction}
          {...formfields}
        />
        
    </div>
  )
}

export default Transactions