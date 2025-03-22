// File path: /components/dashboard-metrics.jsx
// Optimized dashboard-metrics component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, Briefcase, Calendar, CheckCircle, Clock } from "lucide-react";
import { useEffect, useState } from 'react';
import {
  Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';

// Sample data for the charts - reduced for brevity
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

// Quick stat card component
const QuickStatCard = ({ title, value, change, icon: Icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{change}</p>
    </CardContent>
  </Card>


// Main component
export default function DashboardMetrics() {
  // Calculate totals
  const [metrics, setMetrics] = useState({
    totalApplications: 0,
    activeApplications: 0,
    totalInterviews: 0,
    upcomingInterviews: 0,
    successRate: 0
  });

  useEffect(() => {
    // Calculate metrics from data
    const totalApps = applicationData.reduce((acc, item) => acc + item.applications, 0);
    const totalInterviews = applicationData.reduce((acc, item) => acc + item.interviews, 0);
    const totalOffers = applicationData.reduce((acc, item) => acc + item.offers, 0);

    setMetrics({
      totalApplications: totalApps,
      activeApplications: totalApps - totalOffers - 15, // Subtracting offers and assumed rejections
      totalInterviews: totalInterviews,
      upcomingInterviews: 3,
      successRate: Math.round((totalOffers / totalApps) * 100)
    });
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <QuickStatCard
          title="Total Applications"
          value={metrics.totalApplications}
          change="+12% from last month"
          icon={Briefcase}
        />
        <QuickStatCard
          title="Active Applications"
          value={metrics.activeApplications}
          change="+5% from last month"
          icon={Clock}
        />
        <QuickStatCard
          title="Interviews"
          value={metrics.totalInterviews}
          change={`${metrics.upcomingInterviews} upcoming`}
          icon={Calendar}
        />
        <QuickStatCard
          title="Success Rate"
          value={`${metrics.successRate}%`}
          change="+2% from last month"
          icon={CheckCircle}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
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
                    {statusData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={applicationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="applications" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interview and Offer Comparison</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={applicationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="interviews" fill="#8884d8" />
                  <Bar dataKey="offers" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}