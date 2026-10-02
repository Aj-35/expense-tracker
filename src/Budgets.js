import React, { useEffect, useState } from 'react'
import './Budgets.css'
import {getTransaction} from "./services/trancservice"
import { addBudget,getBudget, updateBudget } from './services/budgetservice'

const Budgets = () => {

  const [showForm,setShowForm] = useState(false)
  const [editingId,setEditingID] = useState(null)
  const [budgets,setBudgets] = useState(null)
  const [foodBudget,setFoodBudget] = useState('');
  const [rentBudget,setRentBudget] = useState('');
  const [billsBudget,setBillsBudget] = useState('')


  const [transactions,setTransactions] = useState([])

  useEffect(() => {
    fetchTransaction()
    fetchBudget()
  },[])

   const fetchTransaction =async () =>{
      try{
        const response = await getTransaction()
        setTransactions(response.data)
      }
      catch(err){
        setTransactions([])
        console.log(err.message)
      }
    }

  const fetchBudget = async () => {
      try{
        const response = await getBudget()
        const b = response.data[0]
        if(b){
          setBudgets(b)
          /* setFoodBudget(b.foodBudget)
          setRentBudget(b.rentBudget)
          setBillsBudget(b.billsBudget) */
        }
      }
      catch(err){
        setBudgets(null)
        console.log(err.message)
        alert("Can't reach the server")
      }
    }

  const handleBudget = async (event) => {
      event.preventDefault()
      try{
          const addNewBudget = {
          foodBudget,
          rentBudget,
          billsBudget
        }

        if(editingId !== null){
          await updateBudget(editingId,addNewBudget)
          await fetchBudget()
        }
        else{
          const response = await addBudget(addNewBudget)
          setBudgets(response.data)
        }
      }
      catch(err){
        if(err.response){
          console.log(err.response.data)
        }
        else{
          console.log(`Error ${err.message}`)
        }
        
       
      }

      setShowForm(false)


  }

  const handleEdit = (budget) => {
    setEditingID(budget.id)
    setFoodBudget(budget.foodBudget)
    setRentBudget(budget.rentBudget)
    setBillsBudget(budget.billsBudget)
  }

  const openForm = () =>{
    handleEdit(budgets)
    setShowForm(true)
  }

  const categoryTotals = transactions
  .filter((transaction) => transaction.type === "expense")
  .reduce((totals,transaction) => {
    const category = transaction.category
    const amount = Number(transaction.amount)

    totals[category] = (totals[category] || 0) + amount

    return totals;
  },{})

  return (
    <div className="budget-page">
        <h1>Budgets</h1>

        {budgets ? <button onClick={() => openForm()}>Edit Budget</button>: <button onClick={() => setShowForm(true)}>Create Budget</button>

        }
        {showForm && (
          <div>
        <form onSubmit={handleBudget} className='budget-form'> 
          <label className='food-budget'>
            <input 
              type="number" 
              placeholder='Enter Food Budget' 
              value={foodBudget}
              onChange={(event) => setFoodBudget(event.target.value)}
            />
          </label>
          
          <label className='bills-budget'>
            <input 
              type="number"
              placeholder='Enter Bills Budget'
              value={billsBudget}
              onChange={(event) => setBillsBudget(event.target.value)}
            />
          </label>
          
          <label className='rent-budget'>
            <input 
              type="number"
              placeholder='Enter Rent Budget'
              value={rentBudget}
              onChange={(event) => setRentBudget(event.target.value)} 
            />
          </label>
          
          {editingId ? <button type='submit'>Save Changes</button> :  <button type='submit'>Save</button> }
          
        </form>
        </div>

                 
        )}

        {budgets &&
          <div className='budget-content'>
            <div className='budget-card'>
              <h3>Food</h3>
              <span>{categoryTotals.food}/{budgets.foodBudget}</span>
            </div>
            <div className='budget-card'>
              <h3>Rent</h3>
              <span>{categoryTotals.rent} / {budgets.rentBudget}</span>
            </div>
            <div className='budget-card'>
              <h3>Bills</h3>
              <span>{categoryTotals.bills}/{budgets.billsBudget}</span>
            </div>
          </div>
        }

    </div>
  )
}

export default Budgets