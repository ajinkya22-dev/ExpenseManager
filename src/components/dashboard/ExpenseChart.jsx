import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

const data = [
  { name: 'Jan', expense: 1200, income: 2000 },
  { name: 'Feb', expense: 1900, income: 2100 },
  { name: 'Mar', expense: 1400, income: 1900 },
  { name: 'Apr', expense: 1800, income: 2200 },
  { name: 'May', expense: 1600, income: 2000 },
  { name: 'Jun', expense: 2100, income: 2300 },
  { name: 'Jul', expense: 1750, income: 2150 },
  { name: 'Aug', expense: 1950, income: 2250 },
  { name: 'Sep', expense: 1650, income: 2050 },
  { name: 'Oct', expense: 1850, income: 2180 },
  { name: 'Nov', expense: 1550, income: 1980 },
  { name: 'Dec', expense: 1750, income: 2100 },
];

export function ExpenseChart() {
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

  // Filter data for mobile view to show fewer data points
  const mobileData = isMobile
    ? data.filter((_, index) => index % 2 === 0) // Show every other month on mobile
    : data;

  return (
    <Card className="gradient-card shadow-soft">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl">Financial Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
        <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
          <LineChart data={mobileData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="name"
              className="text-xs text-muted-foreground"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: isMobile ? 10 : 12 }}
            />
            <YAxis
              className="text-xs text-muted-foreground"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              width={isMobile ? 30 : 40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px hsl(var(--shadow-soft))',
                fontSize: isMobile ? '12px' : '14px',
              }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              dot={{ r: isMobile ? 2 : 4 }}
              activeDot={{ r: isMobile ? 4 : 6 }}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="hsl(var(--success))"
              strokeWidth={2}
              dot={{ r: isMobile ? 2 : 4 }}
              activeDot={{ r: isMobile ? 4 : 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
