import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { format } from "date-fns";

export function RecentTransactions() {
  const { expenses } = useSelector((state: RootState) => state.expenses);
  
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Food: "bg-orange-100 text-orange-800",
      Transportation: "bg-blue-100 text-blue-800",
      Entertainment: "bg-purple-100 text-purple-800",
      Health: "bg-green-100 text-green-800",
      Shopping: "bg-pink-100 text-pink-800",
      Bills: "bg-gray-100 text-gray-800",
      Other: "bg-yellow-100 text-yellow-800",
    };
    return colors[category] || colors.Other;
  };

  return (
    <Card className="gradient-card shadow-soft">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentExpenses.map((expense) => (
          <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {expense.category.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium">{expense.title}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(expense.date), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
            <div className="text-right space-y-1">
              <p className="font-semibold text-destructive">-${expense.amount.toFixed(2)}</p>
              <Badge 
                variant="secondary" 
                className={getCategoryColor(expense.category)}
              >
                {expense.category}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}