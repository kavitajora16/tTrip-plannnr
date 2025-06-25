
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Category {
  name: string;
  icon: any;
  color: string;
  total: number;
}

interface ExpensesByCategoryProps {
  expensesByCategory: Category[];
}

const ExpensesByCategory = ({ expensesByCategory }: ExpensesByCategoryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {expensesByCategory.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${category.color} text-white mr-3`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{category.name}</span>
                </div>
                <span className="font-bold">${category.total.toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesByCategory;
