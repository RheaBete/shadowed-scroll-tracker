import { Plus, TrendingUp, Target, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data
  const goalsCompletionData = [
    { name: "Completed", value: 65, fill: "hsl(var(--crimson))" },
  ];

  const financialData = [
    { name: "Jan", savings: 1200, goal: 2000, spending: 1800, budget: 2200 },
    { name: "Feb", savings: 1500, goal: 2000, spending: 1950, budget: 2200 },
    { name: "Mar", savings: 1800, goal: 2000, spending: 2100, budget: 2200 },
  ];

  const recentJournals = [
    { id: 1, date: "Mar 15, 2025", mood: "😊", preview: "Today was productive, finished two major tasks..." },
    { id: 2, date: "Mar 14, 2025", mood: "😐", preview: "Feeling a bit overwhelmed with deadlines..." },
    { id: 3, date: "Mar 13, 2025", mood: "😄", preview: "Great day! Had a wonderful meeting with the team..." },
  ];

  const activeGoals = [
    { id: 1, title: "Complete React Course", progress: 75, category: "Learning" },
    { id: 2, title: "Exercise 5x/week", progress: 60, category: "Health" },
    { id: 3, title: "Read 2 books/month", progress: 40, category: "Personal" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Your journey at a glance</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/goals")} className="bg-crimson hover:bg-crimson/90 shadow-crimson">
            <Plus className="mr-2 h-4 w-4" />
            New Goal
          </Button>
          <Button onClick={() => navigate("/journal")} variant="outline" className="border-violet text-violet hover:bg-violet/10">
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border hover:shadow-crimson transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Goals
            </CardTitle>
            <Target className="h-4 w-4 text-crimson" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              5 completed this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-violet transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Savings Progress
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-violet" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$1,800</div>
            <p className="text-xs text-muted-foreground mt-1">
              90% of monthly goal
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-crimson transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Budget Remaining
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-silver" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$100</div>
            <p className="text-xs text-muted-foreground mt-1">
              4.5% left for March
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-violet transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Journal Entries
            </CardTitle>
            <BookOpen className="h-4 w-4 text-violet" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">42</div>
            <p className="text-xs text-muted-foreground mt-1">
              12 this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Goals Completion */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif">Today's Goal Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="90%"
                barSize={15}
                data={goalsCompletionData}
              >
                <RadialBar
                  background
                  dataKey="value"
                />
                <Legend
                  iconSize={10}
                  layout="horizontal"
                  verticalAlign="bottom"
                  content={() => (
                    <div className="text-center mt-4">
                      <p className="text-3xl font-bold text-foreground">65%</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  )}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Financial Overview */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif">Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="savings" fill="hsl(var(--violet))" name="Savings" />
                <Bar dataKey="goal" fill="hsl(var(--crimson))" name="Goal" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Active Goals */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif">Active Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeGoals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{goal.title}</p>
                    <p className="text-xs text-muted-foreground">{goal.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-crimson">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full mt-4 border-crimson text-crimson hover:bg-crimson/10"
              onClick={() => navigate("/goals")}
            >
              View All Goals
            </Button>
          </CardContent>
        </Card>

        {/* Recent Journal Entries */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif">Recent Reflections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentJournals.map((entry) => (
              <div
                key={entry.id}
                className="p-3 rounded-lg bg-secondary/30 border border-border hover:border-violet/50 transition-colors cursor-pointer"
                onClick={() => navigate("/journal")}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{entry.mood}</span>
                  <span className="text-sm text-muted-foreground">{entry.date}</span>
                </div>
                <p className="text-sm text-foreground line-clamp-1">{entry.preview}</p>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full mt-4 border-violet text-violet hover:bg-violet/10"
              onClick={() => navigate("/journal")}
            >
              View All Entries
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
