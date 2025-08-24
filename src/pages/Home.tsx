import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart3, Shield, Smartphone, DollarSign, TrendingUp, PieChart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">SpendFlow</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Take Control of Your
              <span className="text-gradient block">Financial Future</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track expenses, analyze spending patterns, and make informed financial decisions with our intelligent expense tracking platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="gradient-primary text-white px-8 py-6 text-lg">
                  Start Tracking Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need to manage your finances effectively</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="gradient-card shadow-soft hover:shadow-medium transition-all duration-300 animate-float">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Smart Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get detailed insights into your spending patterns with interactive charts and personalized recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-soft hover:shadow-medium transition-all duration-300 animate-float" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg gradient-success flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your financial data is encrypted and secured with bank-level security protocols. Your privacy is our priority.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-soft hover:shadow-medium transition-all duration-300 animate-float" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Mobile Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track expenses on the go with our responsive design that works perfectly on all your devices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="h-16 w-16 rounded-full gradient-primary flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold">10K+</h3>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div className="space-y-4">
              <div className="h-16 w-16 rounded-full gradient-success flex items-center justify-center mx-auto">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold">$2M+</h3>
              <p className="text-muted-foreground">Money Tracked</p>
            </div>
            <div className="space-y-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto">
                <PieChart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold">98%</h3>
              <p className="text-muted-foreground">User Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">Ready to Start Your Financial Journey?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of users who have already taken control of their finances with SpendFlow.
            </p>
            <Link to="/signup">
              <Button size="lg" className="gradient-primary text-white px-8 py-6 text-lg">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl">SpendFlow</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 SpendFlow Ajinkya Pathak.
          </p>
        </div>
      </footer>
    </div>
  );
}