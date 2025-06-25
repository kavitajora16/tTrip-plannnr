
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface ExpenseFormProps {
  newExpense: {
    category: string;
    amount: string;
    description: string;
    destination: string;
  };
  setNewExpense: (expense: any) => void;
  onAddExpense: () => void;
  categories: Array<{ name: string; icon: any; color: string }>;
  destinations: Array<{ id: number; name: string }>;
}

const ExpenseForm = ({ newExpense, setNewExpense, onAddExpense, categories, destinations }: ExpenseFormProps) => {
  const handleCategoryChange = (value: string) => {
    console.log('Category changed to:', value);
    setNewExpense({ ...newExpense, category: value });
  };

  const handleAmountChange = (value: string) => {
    console.log('Amount changed to:', value);
    setNewExpense({ ...newExpense, amount: value });
  };

  const handleDescriptionChange = (value: string) => {
    console.log('Description changed to:', value);
    setNewExpense({ ...newExpense, description: value });
  };

  const handleDestinationChange = (value: string) => {
    console.log('Destination changed to:', value);
    setNewExpense({ ...newExpense, destination: value });
  };

  return (
    <Card className="bg-gradient-to-r from-orange-50 to-pink-50 border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plus className="h-5 w-5 mr-2 text-orange-600" />
          Add Expense
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Category *</label>
            <select
              value={newExpense.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Amount ($) *</label>
            <Input
              type="number"
              placeholder="0.00"
              value={newExpense.amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="focus:ring-2 focus:ring-orange-500"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Description *</label>
            <Input
              placeholder="What did you spend on?"
              value={newExpense.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              className="focus:ring-2 focus:ring-orange-500"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Destination (Optional)</label>
            <select
              value={newExpense.destination}
              onChange={(e) => handleDestinationChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select destination</option>
              {destinations.map((dest) => (
                <option key={dest.id} value={dest.name}>
                  {dest.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <Button 
          onClick={onAddExpense}
          className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
          disabled={!newExpense.category || !newExpense.amount || !newExpense.description}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
