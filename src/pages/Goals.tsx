import { useState } from "react";
import { Plus, Calendar, TrendingUp, CheckCircle2, Circle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const Goals = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Complete React Course",
      category: "Learning",
      startDate: "2025-03-01",
      endDate: "2025-04-30",
      progress: 75,
      totalDays: 30,
      completedDays: 22,
    },
    {
      id: 2,
      title: "Exercise 5x per week",
      category: "Health",
      startDate: "2025-03-01",
      endDate: "2025-03-31",
      progress: 60,
      totalDays: 20,
      completedDays: 12,
    },
    {
      id: 3,
      title: "Read 2 books this month",
      category: "Personal",
      startDate: "2025-03-01",
      endDate: "2025-03-31",
      progress: 40,
      totalDays: 30,
      completedDays: 12,
    },
  ]);

  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);

  const progressData = [
    { day: "Day 1", progress: 10 },
    { day: "Day 5", progress: 25 },
    { day: "Day 10", progress: 40 },
    { day: "Day 15", progress: 55 },
    { day: "Day 20", progress: 68 },
    { day: "Day 25", progress: 75 },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Learning: "bg-violet text-white",
      Health: "bg-crimson text-white",
      Personal: "bg-silver text-black",
      Work: "bg-accent text-white",
    };
    return colors[category] || "bg-secondary text-foreground";
  };

  const handleAddGoal = () => {
    toast.success("Goal added successfully!");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground">Goal Tracker</h1>
          <p className="text-muted-foreground mt-1">Track your progress, achieve your dreams</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-crimson hover:bg-crimson/90 shadow-crimson">
              <Plus className="mr-2 h-4 w-4" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">Create New Goal</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Set a new goal and start tracking your progress
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input id="title" placeholder="e.g., Learn TypeScript" className="bg-secondary/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="learning">Learning</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" className="bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" className="bg-secondary/50" />
                </div>
              </div>
              <Button onClick={handleAddGoal} className="w-full bg-crimson hover:bg-crimson/90">
                Create Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <Card
            key={goal.id}
            className="bg-card border-border hover:shadow-crimson transition-all cursor-pointer"
            onClick={() => setSelectedGoal(goal.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="font-serif text-xl">{goal.title}</CardTitle>
                  <Badge className={getCategoryColor(goal.category)}>{goal.category}</Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-crimson">{goal.progress}%</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={goal.progress} className="h-2" />
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-violet" />
                  <span>{goal.completedDays}/{goal.totalDays} days</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-silver" />
                  <span>{goal.endDate}</span>
                </div>
              </div>

              <div className="flex gap-1 flex-wrap">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-6 w-6 rounded ${
                      i < goal.completedDays * 0.5
                        ? "bg-crimson"
                        : "bg-secondary border border-border"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Empty State */}
        {goals.length === 0 && (
          <Card className="col-span-full bg-card border-border border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Target className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="font-serif text-2xl mb-2 text-foreground">Your journey begins here</h3>
              <p className="text-muted-foreground mb-6">Create your first goal and start tracking</p>
              <Button className="bg-crimson hover:bg-crimson/90">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Goal
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Goal Details Modal */}
      {selectedGoal && (
        <Dialog open={!!selectedGoal} onOpenChange={() => setSelectedGoal(null)}>
          <DialogContent className="max-w-4xl bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-serif text-3xl">
                {goals.find((g) => g.id === selectedGoal)?.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Track daily progress and view completion trends
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Progress Chart */}
              <Card className="bg-secondary/30 border-border">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-crimson" />
                    Progress Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="progress"
                        stroke="hsl(var(--crimson))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--crimson))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Calendar Grid */}
              <Card className="bg-secondary/30 border-border">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-violet" />
                    Daily Check-ins
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 30 }).map((_, i) => {
                      const isCompleted = i < 22;
                      return (
                        <button
                          key={i}
                          className={`aspect-square rounded-lg flex items-center justify-center transition-all ${
                            isCompleted
                              ? "bg-crimson text-white hover:bg-crimson/80"
                              : "bg-secondary border border-border hover:border-crimson"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Goals;
