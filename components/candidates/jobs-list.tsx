// components/candidates/jobs-list.tsx
"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {
    Briefcase,
    Calendar,
    MapPin,
    Search,
    Users
} from "lucide-react"
import { useState } from "react"

// Sample jobs data
const jobsData = [
  {
    id: "1",
    title: "Sales Engineer",
    department: "Sales",
    location: "Remote",
    type: "Full-time",
    totalCandidates: 63,
    newCandidates: 12,
    interviews: 5,
    publishedDate: "2 weeks ago",
    status: "Published"
  },
  {
    id: "2",
    title: "Product Manager",
    department: "Product",
    location: "New York",
    type: "Full-time",
    totalCandidates: 48,
    newCandidates: 8,
    interviews: 3,
    publishedDate: "3 weeks ago",
    status: "Published"
  },
  {
    id: "3",
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    totalCandidates: 75,
    newCandidates: 15,
    interviews: 7,
    publishedDate: "1 week ago",
    status: "Published"
  },
  {
    id: "4",
    title: "UX Designer",
    department: "Design",
    location: "San Francisco",
    type: "Full-time",
    totalCandidates: 39,
    newCandidates: 5,
    interviews: 4,
    publishedDate: "4 weeks ago",
    status: "Published"
  },
  {
    id: "5",
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    totalCandidates: 42,
    newCandidates: 7,
    interviews: 6,
    publishedDate: "2 weeks ago",
    status: "Published"
  }
]

export function JobsList({ onSelectJob }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter jobs based on search query and filters
  const filteredJobs = jobsData.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || job.department === departmentFilter
    const matchesStatus = statusFilter === "all" || job.status === statusFilter

    return matchesSearch && matchesDepartment && matchesStatus
  })

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search jobs by title, department or location"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Customer Success">Customer Success</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map(job => (
          <Card
            key={job.id}
            className="cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => onSelectJob(job)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <Badge>{job.status}</Badge>
              </div>
              <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" />
                  {job.type}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {job.publishedDate}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium">Total Candidates</p>
                    <p className="text-2xl font-bold">{job.totalCandidates}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-right">New</p>
                    <p className="text-2xl font-bold text-right text-primary">+{job.newCandidates}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{job.interviews} active interviews</span>
                </div>
                <Button
                  className="w-full mt-2"
                  onClick={() => onSelectJob(job)}
                >
                  View Candidates
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center p-10 border rounded-lg">
          <p className="text-muted-foreground">No jobs found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}