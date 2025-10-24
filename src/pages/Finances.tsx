import { useState } from "react";
import { Plus, DollarSign, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { toast } from "sonner";

const Finances = () => {
  const [selectedMonth, setSelectedMonth] = useState("March 2025");

  const budgetData = [
    { category: "Housing", planned: 1200, current: 1200, color: "hsl(var(--crimson))" },
    { category: "Food", planned: 400, current: 320, color: "hsl(var(--violet))" },
    { category: "Transport", planned: 200, current: 180, color: "hsl(var(--silver))" },
    { category: "Entertainment", planned: 150, current: 140, color: "hsl(var(--accent))" },
    { category: "Utilities", planned: 250, current: 230, color: "hsl(var(--muted))" },
  ];

  const expenses = [
    { id: 1, date: "Mar 15", description: "Grocery Shopping", category: "Food", amount: 85.50 },
    { id: 2, date: "Mar 14", description: "Rent Payment", category: "Housing", amount: 1200.00 },
    { id: 3, date: "Mar 13", description: "Gas Station", category: "Transport", amount: 45.00 },
    { id: 4, date: "Mar 12", description: "Netflix Subscription", category: "Entertainment", amount: 15.99 },
    { id: 5, date: "Mar 11", description: "Electricity Bill", category: "Utilities", amount: 120.00 },
  ];

  const savingsGoal = 2000;
  const currentSavings = 1800;
  const savingsPercentage = (currentSavings / savingsGoal) * 100;

  const totalBudget = budgetData.reduce((sum, item) => sum + item.planned, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.current, 0);
  const remaining = totalBudget - totalSpent;

  const handleAddExpense = () => {
    toast.success("Expense added successfully!");
  };

  const handleAddBudgetCategory = () => {
    toast.success("Budget category added!");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground">Financial Tracker</h1>
          <p className="text-muted-foreground mt-1">Manage your budget and track expenses</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px] bg-secondary/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="January 2025">January 2025</SelectItem>
              <SelectItem value="February 2025">February 2025</SelectItem>
              <SelectItem value="March 2025">March 2025</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-crimson hover:bg-crimson/90 shadow-crimson">
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">Add New Expense</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Record a new expense to track your spending
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="e.g., Grocery shopping" className="bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="0.00" className="bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger className="bg-secondary/50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="housing">Housing</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" className="bg-secondary/50" />
                </div>
                <Button onClick={handleAddExpense} className="w-full bg-crimson hover:bg-crimson/90">
                  Add Expense
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card border-border hover:shadow-crimson transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-crimson" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">${totalBudget.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">For {selectedMonth}</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-violet transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-violet" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">${totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((totalSpent / totalBudget) * 100).toFixed(1)}% of budget
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-crimson transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Remaining</CardTitle>
            <TrendingDown className="h-4 w-4 text-silver" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">${remaining.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((remaining / totalBudget) * 100).toFixed(1)}% left
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Budget vs Spending */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif">Budget vs Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="planned" fill="hsl(var(--silver))" name="Planned" />
                <Bar dataKey="current" fill="hsl(var(--crimson))" name="Current" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Savings Progress */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-violet" />
              Savings Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-5xl font-bold text-foreground">${currentSavings.toFixed(2)}</p>
              <p className="text-muted-foreground">of ${savingsGoal.toFixed(2)} goal</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold text-violet">{savingsPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={savingsPercentage} className="h-3" />
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Saved", value: currentSavings, fill: "hsl(var(--violet))" },
                    { name: "Remaining", value: savingsGoal - currentSavings, fill: "hsl(var(--muted))" },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Budget Categories */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-serif">Budget Categories</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-crimson text-crimson hover:bg-crimson/10">
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">Add Budget Category</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="catName">Category Name</Label>
                  <Input id="catName" placeholder="e.g., Shopping" className="bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="catBudget">Monthly Budget</Label>
                  <Input id="catBudget" type="number" placeholder="0.00" className="bg-secondary/50" />
                </div>
                <Button onClick={handleAddBudgetCategory} className="w-full bg-crimson hover:bg-crimson/90">
                  Add Category
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetData.map((item) => {
              const percentage = (item.current / item.planned) * 100;
              return (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{item.category}</span>
                    <div className="text-right">
                      <span className="font-semibold text-foreground">
                        ${item.current.toFixed(2)}
                      </span>
                      <span className="text-muted-foreground"> / ${item.planned.toFixed(2)}</span>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Expenses */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="font-serif">Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Description</TableHead>
                <TableHead className="text-muted-foreground">Category</TableHead>
                <TableHead className="text-right text-muted-foreground">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id} className="border-border hover:bg-secondary/30">
                  <TableCell className="text-muted-foreground">{expense.date}</TableCell>
                  <TableCell className="font-medium text-foreground">{expense.description}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-secondary text-foreground">
                      {expense.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-foreground">
                    ${expense.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Finances;
