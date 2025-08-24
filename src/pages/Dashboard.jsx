import { useSelector } from "react-redux";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { StatCard } from "@/components/ui/stat-card";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { ExpenseOverview } from "@/components/dashboard/ExpenseOverview";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AddExpenseDialog } from "@/components/dashboard/AddExpenseDialog";
import { DollarSign, TrendingUp, CreditCard, Wallet } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { expenses, totalExpense, monthlyBudget } = useSelector((state) => state.expenses);
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  const remainingBudget = monthlyBudget - totalExpense;
  const budgetUsedPercentage = (totalExpense / monthlyBudget) * 100;

  const thisMonthIncome = 2150;
  const savingsThisMonth = thisMonthIncome - totalExpense;

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

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <main className={cn(
        "flex-1 overflow-y-auto",
        isMobile && "w-full"
      )}>
        <div className={cn(
          "space-y-6",
          isMobile ? "p-4 pt-16" : "p-6"
        )}>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className={cn(
                "font-bold",
                isMobile ? "text-xl" : "text-3xl"
              )}>
                Hello, {user?.username || user?.name || 'User'}! 👋
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">Welcome back! Here's your financial overview.</p>
            </div>
            <AddExpenseDialog />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatCard
              title="Total Expenses"
              value={`$${totalExpense.toFixed(2)}`}
              change={{ value: 12.5, isPositive: false }}
              icon={<DollarSign className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
            />
            <StatCard
              title="Monthly Income"
              value={`$${thisMonthIncome.toFixed(2)}`}
              change={{ value: 8.2, isPositive: true }}
              icon={<TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-success" />}
            />
            <StatCard
              title="Budget Remaining"
              value={`$${remainingBudget.toFixed(2)}`}
              change={{ value: budgetUsedPercentage, isPositive: remainingBudget > 0 }}
              icon={<CreditCard className="h-5 w-5 md:h-6 md:w-6 text-info" />}
            />
            <StatCard
              title="Savings"
              value={`$${savingsThisMonth.toFixed(2)}`}
              change={{ value: 15.3, isPositive: true }}
              icon={<Wallet className="h-5 w-5 md:h-6 md:w-6 text-warning" />}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <ExpenseChart />
            <ExpenseOverview />
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2">
              <RecentTransactions />
            </div>
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  );
}
