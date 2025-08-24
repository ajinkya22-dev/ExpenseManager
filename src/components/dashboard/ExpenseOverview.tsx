import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <Card className="gradient-card shadow-soft">
      <CardHeader>
        <CardTitle>Expense Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="w-1/2">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: string, props: any) => [
                    `$${props.payload.amount}`,
                    name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="w-1/2 space-y-3">
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">${item.amount}</p>
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