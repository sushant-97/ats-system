"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, ArrowUpRight, Briefcase, Calendar, ChevronRight, Clock, Users, X } from "lucide-react";
import Link from "next/link";
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Sample data
const applicationData = [
  { month: 'Jan', applications: 12, interviews: 5, offers: 1 },
  { month: 'Feb', applications: 19, interviews: 8, offers: 2 },
  { month: 'Mar', applications: 15, interviews: 6, offers: 0 },
  { month: 'Apr', applications: 25, interviews: 10, offers: 3 },
  { month: 'May', applications: 30, interviews: 15, offers: 4 },
  { month: 'Jun', applications: 18, interviews: 7, offers: 2 },
  { month: 'Jul', applications: 22, interviews: 12, offers: 3 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const statusData = [
  { name: 'Applied', value: 25 },
  { name: 'Screening', value: 12 },
  { name: 'Interview', value: 8 },
  { name: 'Offer', value: 3 },
  { name: 'Rejected', value: 15 },
];

const upcomingInterviews = [
  {
    id: "1",
    candidate: "Mia Persona",
    position: "Sales Engineer",
    company: "Acme Inc",
    type: "Technical",
    date: "Today",
    time: "2:00 PM",
    location: "Remote",
  },
  {
    id: "2",
    candidate: "Thomas Wright",
    position: "Product Manager",
    company: "Globex Corp",
    type: "Final",
    date: "Tomorrow",
    time: "10:30 AM",
    location: "San Francisco, CA",
  },
  {
    id: "3",
    candidate: "Jordan Mitchell",
    position: "Frontend Developer",
    company: "Wayne Enterprises",
    type: "Technical",
    date: "Jul 25",
    time: "3:00 PM",
    location: "Remote",
  },
];

const recentApplications = [
  {
    id: "1",
    company: "Acme Inc",
    position: "Frontend Developer",
    status: "Applied",
    date: "3 days ago",
  },
  {
    id: "2",
    company: "Globex Corporation",
    position: "Full Stack Engineer",
    status: "Interview",
    date: "1 week ago",
  },
  {
    id: "3",
    company: "Stark Industries",
    position: "UI/UX Designer",
    status: "Rejected",
    date: "2 weeks ago",
  },
  {
    id: "4",
    company: "Wayne Enterprises",
    position: "Software Engineer",
    status: "Offer",
    date: "1 day ago",
  },
  {
    id: "5",
    company: "Umbrella Corporation",
    position: "DevOps Engineer",
    status: "Screening",
    date: "5 days ago",
  },
];

const openPositions = [
  {
    id: "1",
    title: "Sales Engineer",
    department: "Sales",
    location: "Remote",
    candidates: 63,
    status: "Published",
  },
  {
    id: "2",
    title: "Product Manager",
    department: "Product",
    location: "New York",
    candidates: 48,
    status: "Published",
  },
  {
    id: "3",
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    candidates: 75,
    status: "Published",
  }
];

// Status color mapping
const statusColors = {
  Applied: "default",
  Screening: "secondary",
  Interview: "warning",
  Offer: "success",
  Rejected: "destructive",
};

export default function EnhancedDashboard() {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <div className="flex flex-col gap-4">
      {/* Top stats row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">63</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <p className="text-xs text-muted-foreground">3 today</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time to Hire</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 days</div>
            <p className="text-xs text-muted-foreground">-2 days from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main dashboard content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
          </TabsList>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recruitment Funnel</CardTitle>
                <CardDescription>Distribution of candidates across stages</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>Your scheduled interviews for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingInterviews.map((interview) => (
                    <div key={interview.id} className="flex items-start space-x-4 rounded-lg border p-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                        {interview.candidate.split(' ').map(name => name[0]).join('')}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium leading-none">{interview.candidate}</p>
                            <p className="text-sm text-muted-foreground">{interview.position}</p>
                          </div>
                          <Badge variant="outline">{interview.type}</Badge>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          {interview.date}, {interview.time}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/dashboard/interviews">
                      View All Interviews
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Hiring Activity</CardTitle>
                <CardDescription>Applications, interviews, and offers over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={applicationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="applications" fill="#8884d8" name="Applications" />
                      <Bar dataKey="interviews" fill="#82ca9d" name="Interviews" />
                      <Bar dataKey="offers" fill="#ffc658" name="Offers" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Latest candidate applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium text-sm">{app.position}</p>
                        <p className="text-xs text-muted-foreground">{app.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={statusColors[app.status]}>{app.status}</Badge>
                        <span className="text-xs text-muted-foreground">{app.date}</span>
                      </div>
                    </div>
                  ))}
                  <Button asChild variant="outline" className="w-full mt-2">
                    <Link href="/dashboard/applications">
                      View All Applications
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Jobs Tab */}
        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Open Positions</CardTitle>
                  <CardDescription>All currently active job postings</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/dashboard/jobs/new">
                    Post New Job
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {openPositions.map((position) => (
                  <div key={position.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{position.title}</h3>
                        <Badge>{position.status}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{position.department}</span>
                        <span>•</span>
                        <span>{position.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{position.candidates}</p>
                        <p className="text-xs text-muted-foreground">Candidates</p>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/candidates`}>
                          <ChevronRight className="h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard/jobs">
                    View All Jobs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Sources</CardTitle>
                <CardDescription>Where your candidates are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'LinkedIn', value: 45 },
                          { name: 'Company Site', value: 28 },
                          { name: 'Indeed', value: 15 },
                          { name: 'Referral', value: 12 }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hiring Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Time to hire</span>
                    <span className="font-medium">18 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cost per hire</span>
                    <span className="font-medium">$4,250</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Acceptance rate</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Interview to offer ratio</span>
                    <span className="font-medium">3.2:1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Offer acceptance rate</span>
                    <span className="font-medium">72%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Candidates Tab */}
        <TabsContent value="candidates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Candidate Pipeline</CardTitle>
                  <CardDescription>Candidates at each stage of the hiring process</CardDescription>
                </div>
                <Button asChild variant="outline">
                  <Link href="/dashboard/candidates">
                    View Detailed Pipeline
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex overflow-x-auto pb-4 gap-4">
                {["Applied", "Screening", "Interview", "Offer", "Hired", "Rejected"].map((stage, index) => (
                  <div key={stage} className="flex-shrink-0 w-[250px] border rounded-md p-4">
                    <h3 className="font-medium mb-3">{stage}</h3>
                    <div className="space-y-2">
                      {index === 0 && (
                        <>
                          <div className="p-3 border rounded-md hover:bg-muted/30 cursor-pointer transition-colors">
                            <h4 className="font-medium text-sm">Mia Persona</h4>
                            <p className="text-xs text-muted-foreground">Sales Engineer</p>
                          </div>
                          <div className="p-3 border rounded-md hover:bg-muted/30 cursor-pointer transition-colors">
                            <h4 className="font-medium text-sm">Thomas Wright</h4>
                            <p className="text-xs text-muted-foreground">Product Manager</p>
                          </div>
                        </>
                      )}

                      {index === 1 && (
                        <div className="p-3 border rounded-md hover:bg-muted/30 cursor-pointer transition-colors">
                          <h4 className="font-medium text-sm">Jordan Mitchell</h4>
                          <p className="text-xs text-muted-foreground">Frontend Developer</p>
                        </div>
                      )}

                      {index === 2 && (
                        <div className="p-3 border rounded-md hover:bg-muted/30 cursor-pointer transition-colors">
                          <h4 className="font-medium text-sm">Emma Johnson</h4>
                          <p className="text-xs text-muted-foreground">UX Designer</p>
                        </div>
                      )}

                      {(index === 3 || index === 4 || index === 5) && (
                        <div className="h-20 flex items-center justify-center border border-dashed rounded-md">
                          <p className="text-sm text-muted-foreground">No candidates</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Sources</CardTitle>
                <CardDescription>Where candidates are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { source: 'LinkedIn', count: 45 },
                        { source: 'Indeed', count: 28 },
                        { source: 'Company Website', count: 15 },
                        { source: 'Referrals', count: 12 },
                        { source: 'Job Boards', count: 8 }
                      ]}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="source" type="category" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Candidate Activity</CardTitle>
                <CardDescription>Recent candidate interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      MP
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Mia Persona</p>
                      <p className="text-sm text-muted-foreground">Scheduled for technical interview</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      TW
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Thomas Wright</p>
                      <p className="text-sm text-muted-foreground">Moved to Screening stage</p>
                      <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      JM
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Jordan Mitchell</p>
                      <p className="text-sm text-muted-foreground">Application received</p>
                      <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                    </div>
                  </div>

                  <Button asChild variant="outline" className="w-full">
                    <Link href="/dashboard/candidates">
                      View All Candidates
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Interviews Tab */}
        <TabsContent value="interviews" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Interviews</CardTitle>
                  <CardDescription>Scheduled interviews for the next 7 days</CardDescription>
                </div>
                <Button>
                  Schedule Interview
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                      {interview.candidate.split(' ').map(name => name[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{interview.candidate}</h4>
                          <p className="text-sm text-muted-foreground">{interview.position} • {interview.company}</p>
                        </div>
                        <Badge>{interview.type} Interview</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {interview.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {interview.time}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {interview.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button>Prepare</Button>
                      <Button variant="outline" size="icon">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard/interviews">
                    View All Interviews
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Interview Performance</CardTitle>
                <CardDescription>Candidates performance in interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { category: 'Technical Skills', score: 4.2 },
                        { category: 'Communication', score: 3.8 },
                        { category: 'Problem Solving', score: 4.5 },
                        { category: 'Culture Fit', score: 4.7 },
                        { category: 'Experience', score: 3.9 }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interview Statistics</CardTitle>
                <CardDescription>Key metrics about your interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Interviews conducted</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pass rate</span>
                    <span className="font-medium">62%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average duration</span>
                    <span className="font-medium">58 minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">No-show rate</span>
                    <span className="font-medium">7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average feedback time</span>
                    <span className="font-medium">1.5 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}