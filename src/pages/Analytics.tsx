import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const categoryData = [
  { name: 'Entertainment', value: 35, amount: 1200, color: '#8B5CF6' },
  { name: 'Food', value: 28, amount: 960, color: '#06B6D4' },
  { name: 'Travel', value: 20, amount: 680, color: '#10B981' },
  { name: 'Transportation', value: 12, amount: 410, color: '#F59E0B' },
  { name: 'Shopping', value: 5, amount: 170, color: '#EF4444' },
];

const monthlyData = [
  { month: 'Jan', Entertainment: 1200, Food: 800, Travel: 600, Transportation: 400, Shopping: 200 },
  { month: 'Feb', Entertainment: 1100, Food: 850, Travel: 700, Transportation: 450, Shopping: 180 },
  { month: 'Mar', Entertainment: 1300, Food: 900, Travel: 550, Transportation: 420, Shopping: 220 },
  { month: 'Apr', Entertainment: 1150, Food: 780, Travel: 800, Transportation: 380, Shopping: 190 },
  { month: 'May', Entertainment: 1250, Food: 920, Travel: 650, Transportation: 410, Shopping: 210 },
  { month: 'Jun', Entertainment: 1200, Food: 960, Travel: 680, Transportation: 410, Shopping: 170 },
];

const COLORS = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

export default function Analytics() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Detailed insights into your spending patterns.</p>
          </div>

          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Distribution Pie Chart */}
            <Card className="gradient-card shadow-soft">
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number, name: string, props: any) => [
                        `$${props.payload.amount}`,
                        name
                      ]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Spending Trends */}
            <Card className="gradient-card shadow-soft">
              <CardHeader>
                <CardTitle>Monthly Spending Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="month" 
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
                      formatter={(value: number) => [`$${value}`, '']}
                    />
                    <Legend />
                    <Bar dataKey="Entertainment" stackId="a" fill="#8B5CF6" />
                    <Bar dataKey="Food" stackId="a" fill="#06B6D4" />
                    <Bar dataKey="Travel" stackId="a" fill="#10B981" />
                    <Bar dataKey="Transportation" stackId="a" fill="#F59E0B" />
                    <Bar dataKey="Shopping" stackId="a" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown */}
          <Card className="gradient-card shadow-soft">
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {categoryData.map((category, index) => (
                  <div 
                    key={category.name} 
                    className="p-4 rounded-lg border"
                    style={{ borderColor: category.color }}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{category.name}</p>
                        <p className="text-2xl font-bold">${category.amount}</p>
                        <p className="text-sm text-muted-foreground">{category.value}% of total</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Spending Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="gradient-card shadow-soft">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">Highest Category</h3>
                  <p className="text-3xl font-bold text-purple-600">Entertainment</p>
                  <p className="text-sm text-muted-foreground">$1,200 this month</p>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-soft">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">Average Daily Spend</h3>
                  <p className="text-3xl font-bold text-blue-600">$113</p>
                  <p className="text-sm text-muted-foreground">Based on last 30 days</p>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-soft">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">Most Frequent</h3>
                  <p className="text-3xl font-bold text-green-600">Food</p>
                  <p className="text-sm text-muted-foreground">24 transactions</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}