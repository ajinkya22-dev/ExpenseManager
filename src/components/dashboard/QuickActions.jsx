import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Upload, Download, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function QuickActions() {
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
        <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className={cn(
        "p-4 md:p-6 pt-0 md:pt-0 grid grid-cols-2 gap-2 md:gap-3"
      )}>
        <Button className={cn(
          "flex-col space-y-1 md:space-y-2",
          isMobile ? "h-16 py-2" : "h-20"
        )} variant="outline">
          <Plus className={cn(
            isMobile ? "h-4 w-4" : "h-6 w-6"
          )} />
          <span className={cn(
            isMobile ? "text-xs" : "text-sm"
          )}>Add Expense</span>
        </Button>
        <Button className={cn(
          "flex-col space-y-1 md:space-y-2",
          isMobile ? "h-16 py-2" : "h-20"
        )} variant="outline">
          <Upload className={cn(
            isMobile ? "h-4 w-4" : "h-6 w-6"
          )} />
          <span className={cn(
            isMobile ? "text-xs" : "text-sm"
          )}>Import Data</span>
        </Button>
        <Button className={cn(
          "flex-col space-y-1 md:space-y-2",
          isMobile ? "h-16 py-2" : "h-20"
        )} variant="outline">
          <Download className={cn(
            isMobile ? "h-4 w-4" : "h-6 w-6"
          )} />
          <span className={cn(
            isMobile ? "text-xs" : "text-sm"
          )}>Export Report</span>
        </Button>
        <Button className={cn(
          "flex-col space-y-1 md:space-y-2",
          isMobile ? "h-16 py-2" : "h-20"
        )} variant="outline">
          <Settings className={cn(
            isMobile ? "h-4 w-4" : "h-6 w-6"
          )} />
          <span className={cn(
            isMobile ? "text-xs" : "text-sm"
          )}>Settings</span>
        </Button>
      </CardContent>
    </Card>
  );
}
