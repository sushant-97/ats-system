// File path: /components/dashboard/enhanced-dashboard.jsx

import {
    BarChart3,
    Briefcase,
    Calendar,
    CheckCircle,
    Clock,
    Clock3,
    FileText,
    ListChecks,
    Mail,
    MessageSquare,
    Users
} from "lucide-react";
import Link from "next/link";
import React from 'react';

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


// Dashboard metrics for recruiters
export default function RecruiterDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recruiter Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your recruiting activities.
          </p>
        </div>

        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/jobs/new">
              <Briefcase className="mr-2 h-4 w-4" />
              Post New Job
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/candidates/source">
              <Users className="mr-2 h-4 w-4" />
              Source Candidates
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick stat cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <QuickStatCard
          title="Active Jobs"
          value={15}
          change="+2 this month"
          icon={Briefcase}
          color="blue"
          linkText="View all jobs"
          linkHref="/dashboard/jobs"
        />

        <QuickStatCard
          title="Total Candidates"
          value={124}
          change="+18 this week"
          icon={Users}
          color="purple"
          linkText="View candidates"
          linkHref="/dashboard/candidates"
        />

        <QuickStatCard
          title="Interviews This Week"
          value={8}
          change="3 upcoming today"
          icon={Calendar}
          color="amber"
          linkText="Schedule interviews"
          linkHref="/dashboard/interviews"
        />

        <QuickStatCard
          title="Pending Reviews"
          value={12}
          change="5 urgent"
          icon={Clock}
          color="red"
          linkText="Review candidates"
          linkHref="/dashboard/candidates?filter=pending"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-7">
            {/* Hiring Pipeline */}
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Hiring Pipeline</CardTitle>
                <CardDescription>Overview of candidates in each stage</CardDescription>
              </CardHeader>
              <CardContent>
                <HiringPipeline />
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard/candidates">
                    View All Candidates
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Upcoming Interviews */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>Your schedule for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingInterviews />
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard/interviews">
                    View All Interviews
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-12">
            {/* Job Status Summary */}
            <Card className="md:col-span-5">
              <CardHeader>
                <CardTitle>Job Openings</CardTitle>
                <CardDescription>Status of active job postings</CardDescription>
              </CardHeader>
              <CardContent>
                <JobStatusSummary />
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard/jobs">
                    Manage All Jobs
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Recent Activities */}
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest actions in your recruiting process</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivities />
              </CardContent>
            </Card>

            {/* Tasks and Reminders */}
            <Card className="md:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle>Tasks & Reminders</CardTitle>
                <CardDescription>Things that need your attention</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <TasksAndReminders />
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="ghost" className="w-full">
                  <ListChecks className="mr-2 h-4 w-4" />
                  View All Tasks
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Key Metrics Row */}
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              title="Time to Fill"
              value="28"
              unit="days"
              description="Average time to fill positions"
              change="-3 days from last month"
              isPositive={true}
            />

            <MetricCard
              title="Candidate Response Rate"
              value="62"
              unit="%"
              description="Candidates responding to outreach"
              change="+5% from last month"
              isPositive={true}
            />

            <MetricCard
              title="Offer Acceptance Rate"
              value="84"
              unit="%"
              description="Candidates accepting job offers"
              change="-2% from last month"
              isPositive={false}
            />
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Job Postings</CardTitle>
              <CardDescription>
                Overview and status of all your open positions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Job listings will appear here</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/dashboard/jobs">
                  View All Jobs
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="candidates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Candidate Management</CardTitle>
              <CardDescription>
                Track and manage candidates across all positions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Candidate management interface will appear here</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/dashboard/candidates">
                  Manage Candidates
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recruiting Analytics</CardTitle>
              <CardDescription>
                Key metrics and insights for your recruiting process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Recruiting analytics will appear here</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/dashboard/analytics">
                  View Detailed Analytics
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Component for quick stat cards
function QuickStatCard({ title, value, change, icon: Icon, color, linkText, linkHref }) {
  const colors = {
    blue: "text-blue-600 bg-blue-100",
    red: "text-red-600 bg-red-100",
    green: "text-green-600 bg-green-100",
    purple: "text-purple-600 bg-purple-100",
    amber: "text-amber-600 bg-amber-100"
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`w-8 h-8 rounded-full ${colors[color]} flex items-center justify-center`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {change}
        </p>
      </CardContent>
      <CardFooter className="pt-1">
        <Link
          href={linkHref}
          className="text-xs text-primary hover:underline w-full inline-block"
        >
          {linkText} →
        </Link>
      </CardFooter>
    </Card>
  );
}

// Component for hiring pipeline
function HiringPipeline() {
  const pipelineData = [
    { stage: "Applied", count: 45, color: "bg-blue-500" },
    { stage: "Screening", count: 28, color: "bg-purple-500" },
    { stage: "Interview", count: 15, color: "bg-amber-500" },
    { stage: "Final Round", count: 6, color: "bg-green-500" },
    { stage: "Offer", count: 4, color: "bg-emerald-500" },
  ];

  const total = pipelineData.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-center h-[140px] gap-3">
        {pipelineData.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-sm font-medium text-center mb-2">
              {item.count}
            </div>
            <div
              className={`w-14 ${item.color} rounded-t-md`}
              style={{ height: `${(item.count / total) * 140}px` }}
            ></div>
            <div className="text-xs text-center mt-2 font-medium">
              {item.stage}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2">
        {pipelineData.map((item, index) => (
          <div key={index} className="text-center">
            <div className="text-xs text-muted-foreground">
              {Math.round((item.count / total) * 100)}%
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span>Candidates by Stage</span>
        <span>Total: {total} candidates</span>
      </div>
    </div>
  );
}

// Component for upcoming interviews
function UpcomingInterviews() {
  const interviews = [
    {
      id: "1",
      candidate: "Emily Foster",
      position: "React Developer",
      type: "Technical Interview",
      date: new Date(2025, 2, 22, 10, 0),
      color: "bg-purple-100"
    },
    {
      id: "2",
      candidate: "Michael Patel",
      position: "Sales Engineer",
      type: "Technical Interview",
      date: new Date(2025, 2, 22, 14, 0),
      color: "bg-teal-100"
    },
    {
      id: "3",
      candidate: "Jennifer Lopez",
      position: "Product Manager",
      type: "Manager Interview",
      date: new Date(2025, 2, 23, 11, 30),
      color: "bg-pink-100"
    }
  ];

  return (
    <div className="space-y-4">
      {interviews.map((interview) => (
        <div key={interview.id} className="flex items-start gap-3 p-3 border rounded-md">
          <Avatar className={`h-10 w-10 ${interview.color}`}>
            <AvatarFallback>
              {interview.candidate.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{interview.candidate}</h4>
              <Badge variant="outline" className="text-xs">
                {interview.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground truncate">{interview.position}</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {interview.date.toLocaleDateString()} {interview.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>
        </div>
      ))}

      {interviews.length === 0 && (
        <div className="text-center py-6">
          <p className="text-muted-foreground">No upcoming interviews scheduled</p>
        </div>
      )}
    </div>
  );
}

// Component for job status summary
function JobStatusSummary() {
  const jobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      candidates: 18,
      progress: 75,
      daysActive: 14
    },
    {
      id: "4",
      title: "Sales Engineer",
      department: "Sales",
      candidates: 15,
      progress: 80,
      daysActive: 30
    },
    {
      id: "3",
      title: "UX/UI Designer",
      department: "Design",
      candidates: 24,
      progress: 65,
      daysActive: 10
    },
    {
      id: "2",
      title: "Product Manager",
      department: "Product",
      candidates: 12,
      progress: 60,
      daysActive: 21
    }
  ];

  return (
    <div className="space-y-4">
      {jobs.slice(0, 3).map((job) => (
        <div key={job.id} className="flex flex-col p-3 border rounded-md">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{job.title}</h4>
              <p className="text-xs text-muted-foreground">{job.department}</p>
            </div>
            <Badge variant="outline" className="text-xs">
              {job.candidates} candidates
            </Badge>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Hiring Progress</span>
              <span>{job.progress}%</span>
            </div>
            <Progress value={job.progress} className="h-1.5" />
          </div>

          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock3 className="h-3 w-3" />
              {job.daysActive} days active
            </div>
            <Link
              href={`/dashboard/candidates?job=${job.id}`}
              className="text-primary hover:underline"
            >
              View candidates
            </Link>
          </div>
        </div>
      ))}

      {jobs.length > 3 && (
        <div className="text-center text-sm">
          <Link
            href="/dashboard/jobs"
            className="text-primary hover:underline"
          >
            + {jobs.length - 3} more job postings
          </Link>
        </div>
      )}
    </div>
  );
}

// Component for recent activities
function RecentActivities() {
  const activities = [
    {
      id: "1",
      type: "application",
      description: "New application received for Senior Frontend Developer",
      time: "2 hours ago",
      icon: FileText
    },
    {
      id: "2",
      type: "interview",
      description: "Interview scheduled with Michael Patel for Sales Engineer",
      time: "3 hours ago",
      icon: Calendar
    },
    {
      id: "3",
      type: "note",
      description: "Added notes for Jennifer Lopez's manager interview",
      time: "Yesterday",
      icon: MessageSquare
    },
    {
      id: "4",
      type: "offer",
      description: "Offer accepted by Sophia Rodriguez for UI Developer",
      time: "2 days ago",
      icon: CheckCircle
    },
    {
      id: "5",
      type: "email",
      description: "Sent follow-up email to David Garcia",
      time: "3 days ago",
      icon: Mail
    }
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <activity.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm">{activity.description}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Component for tasks and reminders
function TasksAndReminders() {
  const tasks = [
    {
      id: "1",
      title: "Review Emily's technical assessment",
      deadline: "Today",
      priority: "high"
    },
    {
      id: "2",
      title: "Schedule final interview for Michael",
      deadline: "Tomorrow",
      priority: "medium"
    },
    {
      id: "3",
      title: "Prepare offer for Jennifer",
      deadline: "This week",
      priority: "medium"
    },
    {
      id: "4",
      title: "Follow up with David Garcia",
      deadline: "This week",
      priority: "low"
    },
    {
      id: "5",
      title: "Post new Developer job",
      deadline: "Next week",
      priority: "low"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-red-500";
      case "medium": return "text-amber-500";
      case "low": return "text-blue-500";
      default: return "";
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-start gap-2 border-b pb-2 last:border-0 last:pb-0"
        >
          <div className={`mt-0.5 h-2 w-2 rounded-full ${getPriorityColor(task.priority).replace('text-', 'bg-')}`} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{task.title}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{task.deadline}</span>
              <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Component for key metrics
function MetricCard({ title, value, unit, description, change, isPositive }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-baseline">
          <div className="text-2xl font-bold">{value}</div>
          <div className="ml-1 text-muted-foreground">{unit}</div>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <p className={`text-xs mt-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 rounded-full"
          asChild
        >
          <Link href="/dashboard/analytics">
            <BarChart3 className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}