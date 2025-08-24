import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({ title, value, change, icon, className }) {
  return (
    <Card className={cn("gradient-card shadow-soft hover:shadow-medium transition-all duration-300 animate-scale-in", className)}>
      <CardContent className="p-4 sm:p-5 md:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1 sm:space-y-2">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold">{value}</p>
            {change && (
              <div className={cn(
                "flex items-center text-xs sm:text-sm",
                change.isPositive ? "text-success" : "text-destructive"
              )}>
                {change.isPositive ? (
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                )}
                {Math.abs(change.value)}%
              </div>
            )}
          </div>
          {icon && (
            <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
