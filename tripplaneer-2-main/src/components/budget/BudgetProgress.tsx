
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

interface BudgetProgressProps {
  budget: number;
  totalExpenses: number;
  budgetProgress: number;
  setBudget: (budget: number) => void;
}

const BudgetProgress = ({ budget, totalExpenses, budgetProgress, setBudget }: BudgetProgressProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Spent: ${totalExpenses.toLocaleString()}</span>
            <span>Budget: ${budget.toLocaleString()}</span>
          </div>
          <Progress 
            value={Math.min(budgetProgress, 100)} 
            className={`h-3 ${budgetProgress > 100 ? 'bg-red-200' : ''}`}
          />
          <div className="text-center mt-2 text-sm text-gray-600">
            {budgetProgress.toFixed(1)}% of budget used
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Input
            type="number"
            placeholder="Set your budget..."
            value={budget || ''}
            onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
            className="flex-1"
          />
          <Button 
            onClick={() => setBudget(budget)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            Update Budget
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetProgress;
