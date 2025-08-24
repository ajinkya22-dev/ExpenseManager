import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Download, FileText, Calendar, Filter } from "lucide-react";
import { format } from "date-fns";
import jsPDF from 'jspdf';
import { useToast } from "@/hooks/use-toast";

export default function Reports() {
  const { expenses } = useSelector((state: RootState) => state.expenses);
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedCategory, setSelectedCategory] = useState("all");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = ["2023", "2024", "2025"];
  const categories = ["all", "Food", "Transportation", "Entertainment", "Health", "Shopping", "Bills", "Travel", "Other"];

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const matchesMonth = selectedMonth === "all" || expenseDate.getMonth() === parseInt(selectedMonth);
    const matchesYear = selectedYear === "all" || expenseDate.getFullYear() === parseInt(selectedYear);
    const matchesCategory = selectedCategory === "all" || expense.category === selectedCategory;
    
    return matchesMonth && matchesYear && matchesCategory;
  });

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('SpendFlow - Monthly Expense Report', 20, 20);
    
    // Date range
    doc.setFontSize(12);
    const monthName = selectedMonth === "all" ? "All Months" : months[parseInt(selectedMonth)];
    const yearText = selectedYear === "all" ? "All Years" : selectedYear;
    doc.text(`Period: ${monthName} ${yearText}`, 20, 35);
    doc.text(`Category: ${selectedCategory}`, 20, 45);
    doc.text(`Generated: ${format(new Date(), 'PPP')}`, 20, 55);
    
    // Summary
    doc.setFontSize(14);
    doc.text('Summary', 20, 75);
    doc.setFontSize(12);
    doc.text(`Total Expenses: $${totalAmount.toFixed(2)}`, 20, 90);
    doc.text(`Number of Transactions: ${filteredExpenses.length}`, 20, 100);
    
    // Expenses table
    doc.setFontSize(14);
    doc.text('Transactions', 20, 120);
    
    let yPosition = 135;
    doc.setFontSize(10);
    
    // Table headers
    doc.text('Date', 20, yPosition);
    doc.text('Title', 50, yPosition);
    doc.text('Category', 110, yPosition);
    doc.text('Amount', 150, yPosition);
    
    yPosition += 10;
    
    // Table content
    filteredExpenses.forEach(expense => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.text(format(new Date(expense.date), 'MM/dd/yyyy'), 20, yPosition);
      doc.text(expense.title.substring(0, 20), 50, yPosition);
      doc.text(expense.category, 110, yPosition);
      doc.text(`$${expense.amount.toFixed(2)}`, 150, yPosition);
      
      yPosition += 8;
    });
    
    // Save the PDF
    const fileName = `SpendFlow_Report_${monthName}_${yearText}.pdf`;
    doc.save(fileName);
    
    toast({
      title: "Success",
      description: "Report downloaded successfully!",
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Reports</h1>
            <p className="text-muted-foreground">Generate and download detailed expense reports.</p>
          </div>

          {/* Filters */}
          <Card className="gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Report Filters</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Month</label>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Months</SelectItem>
                      {months.map((month, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Year</label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Action</label>
                  <Button 
                    onClick={generatePDF}
                    className="w-full gradient-primary text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Summary Cards */}
            <Card className="gradient-card shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                    <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-success/10">
                    <Calendar className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                    <p className="text-2xl font-bold">{filteredExpenses.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-warning/10">
                    <Download className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average per Day</p>
                    <p className="text-2xl font-bold">
                      ${filteredExpenses.length > 0 ? (totalAmount / Math.max(filteredExpenses.length, 1)).toFixed(2) : '0.00'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transactions Preview */}
          <Card className="gradient-card shadow-soft">
            <CardHeader>
              <CardTitle>Transactions Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredExpenses.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No transactions found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Date</th>
                          <th className="text-left py-2">Title</th>
                          <th className="text-left py-2">Category</th>
                          <th className="text-right py-2">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredExpenses.slice(0, 10).map((expense) => (
                          <tr key={expense.id} className="border-b">
                            <td className="py-2">{format(new Date(expense.date), 'MMM dd, yyyy')}</td>
                            <td className="py-2">{expense.title}</td>
                            <td className="py-2">
                              <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                                {expense.category}
                              </span>
                            </td>
                            <td className="py-2 text-right font-semibold">${expense.amount.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredExpenses.length > 10 && (
                      <p className="text-center text-muted-foreground mt-4">
                        And {filteredExpenses.length - 10} more transactions...
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}