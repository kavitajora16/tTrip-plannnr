
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Trash2 } from 'lucide-react';

interface Expense {
  id: number;
  category: string;
  amount: number;
  description: string;
  destination?: string;
}

interface RecentExpensesProps {
  expenses: Expense[];
  onRemoveExpense: (id: number) => void;
}

const RecentExpenses = ({ expenses, onRemoveExpense }: RecentExpensesProps) => {
  if (expenses.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {expenses.slice(-5).reverse().map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <Badge variant="outline" className="mr-2">
                    {expense.category}
                  </Badge>
                  {expense.destination && (
                    <Badge variant="secondary" className="mr-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      {expense.destination}
                    </Badge>
                  )}
                </div>
                <p className="font-medium">{expense.description}</p>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-lg mr-3">${expense.amount.toLocaleString()}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveExpense(expense.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentExpenses;
