
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

interface BudgetOverviewProps {
  budget: number;
  totalExpenses: number;
  remainingBudget: number;
}

const BudgetOverview = ({ budget, totalExpenses, remainingBudget }: BudgetOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Budget</p>
              <p className="text-2xl font-bold">${budget.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Spent</p>
              <p className="text-2xl font-bold">${totalExpenses.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-200" />
          </div>
        </CardContent>
      </Card>

      <Card className={`bg-gradient-to-r ${remainingBudget >= 0 ? 'from-purple-500 to-purple-600' : 'from-red-500 to-red-600'} text-white`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={`${remainingBudget >= 0 ? 'text-purple-100' : 'text-red-100'} text-sm`}>Remaining</p>
              <p className="text-2xl font-bold">${remainingBudget.toLocaleString()}</p>
            </div>
            <DollarSign className={`h-8 w-8 ${remainingBudget >= 0 ? 'text-purple-200' : 'text-red-200'}`} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetOverview;
