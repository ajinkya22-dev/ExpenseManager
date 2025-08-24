import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function RecentTransactions() {
  const { expenses } = useSelector((state) => state.expenses);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const getCategoryColor = (category) => {
    const colors = {
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
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0 md:pt-0 space-y-3 md:space-y-4">
        {recentExpenses.map((expense) => (
          <div
            key={expense.id}
            className={cn(
              "flex items-center justify-between p-2 md:p-3 rounded-lg hover:bg-muted/50 transition-colors",
              isMobile ? "flex-col sm:flex-row sm:gap-2" : ""
            )}
          >
            <div className={cn(
              "flex items-center space-x-3",
              isMobile ? "w-full justify-start mb-2 sm:mb-0 sm:w-auto" : ""
            )}>
              <div className={cn(
                "rounded-full bg-primary/10 flex items-center justify-center",
                isMobile ? "h-8 w-8" : "h-10 w-10"
              )}>
                <span className={cn(
                  "font-semibold text-primary",
                  isMobile ? "text-xs" : "text-sm"
                )}>
                  {expense.category.charAt(0)}
                </span>
              </div>
              <div>
                <p className={cn(
                  "font-medium",
                  isMobile ? "text-sm" : ""
                )}>
                  {expense.title}
                </p>
                <p className={cn(
                  "text-muted-foreground",
                  isMobile ? "text-xs" : "text-sm"
                )}>
                  {format(new Date(expense.date), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
            <div className={cn(
              "text-right space-y-1",
              isMobile ? "w-full flex justify-between items-center sm:w-auto sm:block" : ""
            )}>
              <p className={cn(
                "font-semibold text-destructive",
                isMobile ? "text-sm" : ""
              )}>
                -${expense.amount.toFixed(2)}
              </p>
              <Badge
                variant="secondary"
                className={cn(
                  getCategoryColor(expense.category),
                  isMobile ? "text-xs px-2 py-0" : ""
                )}
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
