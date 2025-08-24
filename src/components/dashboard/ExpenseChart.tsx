import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <Card className="gradient-card shadow-soft">
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="name" 
              className="text-xs text-muted-foreground"
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              className="text-xs text-muted-foreground"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px hsl(var(--shadow-soft))',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="expense" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="hsl(var(--success))" 
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}