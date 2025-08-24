import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Upload, Download, Settings } from "lucide-react";

export function QuickActions() {
  return (
    <Card className="gradient-card shadow-soft">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Button className="h-20 flex-col space-y-2" variant="outline">
          <Plus className="h-6 w-6" />
          <span className="text-sm">Add Expense</span>
        </Button>
        <Button className="h-20 flex-col space-y-2" variant="outline">
          <Upload className="h-6 w-6" />
          <span className="text-sm">Import Data</span>
        </Button>
        <Button className="h-20 flex-col space-y-2" variant="outline">
          <Download className="h-6 w-6" />
          <span className="text-sm">Export Report</span>
        </Button>
        <Button className="h-20 flex-col space-y-2" variant="outline">
          <Settings className="h-6 w-6" />
          <span className="text-sm">Settings</span>
        </Button>
      </CardContent>
    </Card>
  );
}