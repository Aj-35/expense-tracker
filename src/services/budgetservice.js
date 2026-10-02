import API from "../api/etapi"

export const getBudget = () => API.get("/budgets")
export const addBudget = (budget) => API.post("/budgets",budget)
export const updateBudget = (id,budgets) => API.put(`/budgets/${id}`,budgets)