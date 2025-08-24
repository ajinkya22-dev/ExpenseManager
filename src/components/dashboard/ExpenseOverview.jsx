import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const data = [
  { name: 'Food', value: 35, amount: 1200 },
  { name: 'Transportation', value: 20, amount: 680 },
  { name: 'Entertainment', value: 15, amount: 510 },
  { name: 'Health', value: 12, amount: 408 },
  { name: 'Shopping', value: 10, amount: 340 },
  { name: 'Bills', value: 8, amount: 272 },
];

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--success))',
  'hsl(var(--warning))',
  'hsl(var(--info))',
  'hsl(var(--destructive))',
  'hsl(var(--muted-foreground))',
];

export function ExpenseOverview() {
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

  return (
    <Card className="gradient-card shadow-soft">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl">Expense Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
        <div className={cn(
          "flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0",
        )}>
          <div className={cn(
            "w-full md:w-1/2 flex justify-center"
          )}>
            <ResponsiveContainer width={isMobile ? 180 : "100%"} height={isMobile ? 180 : 200}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 30 : 40}
                  outerRadius={isMobile ? 60 : 80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    `$${props.payload.amount}`,
                    name
                  ]}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px hsl(var(--shadow-soft))',
                    fontSize: isMobile ? '12px' : '14px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={cn(
            "w-full md:w-1/2 space-y-2 md:space-y-3",
            "grid grid-cols-2 md:block gap-2"
          )}>
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-xs md:text-sm font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm font-semibold">${item.amount}</p>
                  <p className="text-xs text-muted-foreground">{item.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
