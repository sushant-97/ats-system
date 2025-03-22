// File path: /components/jobs/enhanced-job-list.jsx

import {
    BarChart,
    Briefcase,
    Clock,
    Edit,
    Eye,
    FileText,
    MapPin,
    MoreHorizontal,
    Shield,
    User,
    Users
} from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

// Sample jobs data - in a real app, this would come from an API
const jobsData = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    status: "Published",
    candidates: {
      total: 18,
      new: 5,
      screening: 8,
      interview: 3,
      offer: 2,
      rejected: 0
    },
    progress: 75,
    hiringManager: "Sarah Johnson",
    daysActive: 14,
    priority: "High"
  },
  {
    id: "2",
    title: "Product Manager",
    department: "Product",
    type: "Full-time",
    location: "New York, NY",
    status: "Published",
    candidates: {
      total: 12,
      new: 3,
      screening: 5,
      interview: 4,
      offer: 0,
      rejected: 0
    },
    progress: 60,
    hiringManager: "Michael Chen",
    daysActive: 21,
    priority: "Medium"
  },
  {
    id: "3",
    title: "UX/UI Designer",
    department: "Design",
    type: "Contract",
    location: "Remote",
    status: "Published",
    candidates: {
      total: 24,
      new: 8,
      screening: 10,
      interview: 5,
      offer: 1,
      rejected: 0
    },
    progress: 65,
    hiringManager: "Jessica Lee",
    daysActive: 10,
    priority: "Medium"
  },
  {
    id: "4",
    title: "Sales Engineer",
    department: "Sales",
    type: "Full-time",
    location: "Chicago, IL",
    status: "Published",
    candidates: {
      total: 15,
      new: 4,
      screening: 6,
      interview: 3,
      offer: 2,
      rejected: 0
    },
    progress: 80,
    hiringManager: "David Wilson",
    daysActive: 30,
    priority: "High"
  },
  {
    id: "5",
    title: "DevOps Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    status: "Draft",
    candidates: {
      total: 0,
      new: 0,
      screening: 0,
      interview: 0,
      offer: 0,
      rejected: 0
    },
    progress: 0,
    hiringManager: "Amanda Torres",
    daysActive: 0,
    priority: "Low"
  },
  {
    id: "6",
    title: "Marketing Manager",
    department: "Marketing",
    type: "Full-time",
    location: "Austin, TX",
    status: "Published",
    candidates: {
      total: 9,
      new: 2,
      screening: 4,
      interview: 2,
      offer: 1,
      rejected: 0
    },
    progress: 70,
    hiringManager: "Ryan Jackson",
    daysActive: 18,
    priority: "Medium"
  }
];

const getStatusIcon = (status) => {
  switch (status) {
    case "Published":
      return (
        <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    case "Draft":
      return (
        <div className="h-5 w-5 rounded-full bg-amber-500 flex items-center justify-center text-white">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 4v16M4 12h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    default:
      return null;
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800";
    case "Medium":
      return "bg-amber-100 text-amber-800";
    case "Low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
};

export default function EnhancedJobsList() {
  const router = useRouter();
  const [view, setView] = useState("cards"); // 'cards' or 'list'
  const [sortBy, setSortBy] = useState("daysActive");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filter, setFilter] = useState("all");

  // Filter jobs based on status
  const filteredJobs = jobsData.filter(job => {
    if (filter === "all") return true;
    if (filter === "published") return job.status === "Published";
    if (filter === "draft") return job.status === "Draft";
    return true;
  });

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "daysActive") {
      return sortOrder === "asc" ? a.daysActive - b.daysActive : b.daysActive - a.daysActive;
    }
    if (sortBy === "candidates") {
      return sortOrder === "asc"
        ? a.candidates.total - b.candidates.total
        : b.candidates.total - a.candidates.total;
    }
    if (sortBy === "priority") {
      const priorityValue = { High: 3, Medium: 2, Low: 1 };
      return sortOrder === "asc"
        ? priorityValue[a.priority] - priorityValue[b.priority]
        : priorityValue[b.priority] - priorityValue[a.priority];
    }
    // Default sort by title
    return sortOrder === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  const handleViewCandidates = (jobId) => {
    router.push(`/dashboard/candidates?job=${jobId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All Jobs ({jobsData.length})
          </Button>
          <Button
            variant={filter === "published" ? "default" : "outline"}
            onClick={() => setFilter("published")}
          >
            Published ({jobsData.filter(j => j.status === "Published").length})
          </Button>
          <Button
            variant={filter === "draft" ? "default" : "outline"}
            onClick={() => setFilter("draft")}
          >
            Draft ({jobsData.filter(j => j.status === "Draft").length})
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setView("cards")}>
            <div className="grid grid-cols-2 gap-0.5 h-4 w-4 mr-2">
              <div className="bg-current rounded-sm" />
              <div className="bg-current rounded-sm" />
              <div className="bg-current rounded-sm" />
              <div className="bg-current rounded-sm" />
            </div>
            Cards
          </Button>
          <Button variant="outline" size="sm" onClick={() => setView("list")}>
            <div className="flex flex-col gap-0.5 justify-center h-4 w-4 mr-2">
              <div className="h-0.5 w-full bg-current rounded-sm" />
              <div className="h-0.5 w-full bg-current rounded-sm" />
              <div className="h-0.5 w-full bg-current rounded-sm" />
            </div>
            List
          </Button>
        </div>
      </div>

      {view === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedJobs.map((job) => (
            <Card key={job.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(job.status)}
                    <Badge
                      className={getPriorityColor(job.priority)}
                    >
                      {job.priority}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/jobs/${job.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Job
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/jobs/${job.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Job
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleViewCandidates(job.id)}>
                        <Users className="mr-2 h-4 w-4" />
                        View Candidates
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/jobs/${job.id}/analytics`}>
                          <BarChart className="mr-2 h-4 w-4" />
                          View Analytics
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <h3 className="font-semibold text-lg mt-3">{job.title}</h3>
                <p className="text-muted-foreground">{job.department}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {job.type}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {job.daysActive} days
                  </Badge>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Hiring Progress</span>
                    <span>{job.progress}%</span>
                  </div>
                  <Progress value={job.progress} className="h-2" />
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Candidates</span>
                    <span className="font-medium">{job.candidates.total}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      New
                    </span>
                    <span>{job.candidates.new}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Screening
                    </span>
                    <span>{job.candidates.screening}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Interview
                    </span>
                    <span>{job.candidates.interview}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Offer
                    </span>
                    <span>{job.candidates.offer}</span>
                  </div>
                </div>

                <div className="flex items-center text-sm mt-4 text-muted-foreground">
                  <User className="h-4 w-4 mr-1" />
                  Hiring Manager: {job.hiringManager}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4 flex justify-end bg-muted/10">
                <Button onClick={() => handleViewCandidates(job.id)}>
                  <Users className="mr-2 h-4 w-4" />
                  Manage Candidates
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <div className="grid grid-cols-12 bg-muted p-3 text-sm font-medium">
            <div className="col-span-4">Job Details</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Candidates</div>
            <div className="col-span-2 text-center">Progress</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>
          {sortedJobs.map((job) => (
            <div
              key={job.id}
              className="grid grid-cols-12 p-3 border-t items-center hover:bg-muted/20 transition-colors"
            >
              <div className="col-span-4">
                <div className="flex items-start gap-2">
                  <div className="mt-1">
                    {getStatusIcon(job.status)}
                  </div>
                  <div>
                    <h3 className="font-medium">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.department} • {job.location}</p>
                    <div className="flex gap-1 mt-1">
                      <Badge
                        className={`${getPriorityColor(job.priority)} text-xs`}
                      >
                        {job.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {job.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 text-center">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  job.status === "Published"
                    ? "bg-green-100 text-green-800"
                    : "bg-amber-100 text-amber-800"
                }`}>
                  {job.status}
                </span>
                <div className="text-xs text-muted-foreground mt-1">
                  {job.daysActive} days active
                </div>
              </div>
              <div className="col-span-2 text-center">
                <div className="text-lg font-semibold">{job.candidates.total}</div>
                <div className="text-xs text-muted-foreground">
                  {job.candidates.new} new, {job.candidates.interview} interviewing
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex justify-between text-xs mb-1 px-2">
                  <span>Hiring Progress</span>
                  <span>{job.progress}%</span>
                </div>
                <Progress value={job.progress} className="h-1.5" />
              </div>
              <div className="col-span-2 flex gap-2 justify-center">
                <Button size="sm" onClick={() => handleViewCandidates(job.id)}>
                  <Users className="h-4 w-4 mr-1" />
                  Candidates
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/jobs/${job.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Job
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/jobs/${job.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Job
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/jobs/${job.id}/analytics`}>
                        <BarChart className="mr-2 h-4 w-4" />
                        Analytics
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}