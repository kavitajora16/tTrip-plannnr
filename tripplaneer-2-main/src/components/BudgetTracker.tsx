
import React, { useState } from 'react';
import { Plane, MapPin, DollarSign } from 'lucide-react';
import BudgetOverview from './budget/BudgetOverview';
import BudgetProgress from './budget/BudgetProgress';
import ExpenseForm from './budget/ExpenseForm';
import ExpensesByCategory from './budget/ExpensesByCategory';
import RecentExpenses from './budget/RecentExpenses';

const BudgetTracker = ({ destinations }) => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    description: '',
    destination: ''
  });

  const categories = [
    { name: 'Flights', icon: Plane, color: 'bg-blue-500' },
    { name: 'Accommodation', icon: MapPin, color: 'bg-green-500' },
    { name: 'Food & Dining', icon: DollarSign, color: 'bg-yellow-500' },
    { name: 'Transportation', icon: Plane, color: 'bg-purple-500' },
    { name: 'Activities', icon: MapPin, color: 'bg-red-500' },
    { name: 'Shopping', icon: DollarSign, color: 'bg-pink-500' },
    { name: 'Other', icon: DollarSign, color: 'bg-gray-500' }
  ];

  const handleAddExpense = () => {
    console.log('Attempting to add expense:', newExpense);
    
    const isValidCategory = newExpense.category && newExpense.category.trim() !== '';
    const isValidAmount = newExpense.amount && !isNaN(parseFloat(newExpense.amount)) && parseFloat(newExpense.amount) > 0;
    const isValidDescription = newExpense.description && newExpense.description.trim() !== '';
    
    console.log('Validation:', { isValidCategory, isValidAmount, isValidDescription });
    
    if (isValidCategory && isValidAmount && isValidDescription) {
      const expenseToAdd = {
        ...newExpense,
        amount: parseFloat(newExpense.amount),
        id: Date.now()
      };
      
      console.log('Adding expense:', expenseToAdd);
      setExpenses(prevExpenses => [...prevExpenses, expenseToAdd]);
      
      setNewExpense({
        category: '',
        amount: '',
        description: '',
        destination: ''
      });
      
      console.log('Form reset, new expense state:', {
        category: '',
        amount: '',
        description: '',
        destination: ''
      });
    } else {
      console.log('Validation failed - missing required fields');
    }
  };

  const handleRemoveExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = budget - totalExpenses;
  const budgetProgress = budget > 0 ? (totalExpenses / budget) * 100 : 0;

  const expensesByCategory = categories.map(category => ({
    ...category,
    total: expenses
      .filter(expense => expense.category === category.name)
      .reduce((sum, expense) => sum + expense.amount, 0)
  }));

  return (
    <div className="space-y-6">
      <BudgetOverview 
        budget={budget}
        totalExpenses={totalExpenses}
        remainingBudget={remainingBudget}
      />

      <BudgetProgress 
        budget={budget}
        totalExpenses={totalExpenses}
        budgetProgress={budgetProgress}
        setBudget={setBudget}
      />

      <ExpenseForm 
        newExpense={newExpense}
        setNewExpense={setNewExpense}
        onAddExpense={handleAddExpense}
        categories={categories}
        destinations={destinations}
      />

      <ExpensesByCategory expensesByCategory={expensesByCategory} />

      <RecentExpenses 
        expenses={expenses}
        onRemoveExpense={handleRemoveExpense}
      />
    </div>
  );
};

export default BudgetTracker;
