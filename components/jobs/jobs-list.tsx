"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const jobs = [
  {
    id: "1",
    title: "Sales Engineer",
    department: "NO DEPARTMENT",
    type: "Full-time",
    location: "Remote",
    status: "Published",
    views: 2,
    clicks: 1,
    createdAt: new Date(2023, 11, 15),
  },
  {
    id: "2",
    title: "Product Manager - Real OG",
    department: "DEPARTMENT",
    type: "Part-time",
    location: "Remote",
    status: "Unpublished",
    views: 1,
    clicks: 0,
    createdAt: new Date(2023, 11, 10),
  },
  {
    id: "3",
    title: "Engineering Team Lead",
    department: "NO DEPARTMENT",
    type: "Full-time",
    location: "Remote",
    status: "Unpublished",
    views: 3,
    clicks: 1,
    createdAt: new Date(2023, 11, 5),
  },
  {
    id: "4",
    title: "Copy of Engineering Team Lead",
    department: "NO DEPARTMENT",
    type: "Full-time",
    location: "Remote",
    status: "Draft",
    views: 0,
    clicks: 0,
    createdAt: new Date(2023, 11, 30),
  },
  {
    id: "5",
    title: "asdas",
    department: "NO DEPARTMENT",
    type: "Full-time",
    location: "Remote",
    status: "Draft",
    views: 0,
    clicks: 0,
    createdAt: new Date(2023, 11, 17),
  },
  {
    id: "6",
    title: "asdasdas",
    department: "NO DEPARTMENT",
    type: "Full-time",
    location: "Remote",
    status: "Draft",
    views: 0,
    clicks: 0,
    createdAt: new Date(2023, 11, 17),
  },
  {
    id: "7",
    title: "Copy of Account Executive 1",
    department: "NO DEPARTMENT",
    type: "Full-time",
    location: "Remote • Europe only",
    status: "Unpublished",
    views: 0,
    clicks: 0,
    createdAt: new Date(2023, 11, 4),
  },
  {
    id: "8",
    title: "Outbound Sales Development Manager",
    department: "NO DEPARTMENT",
    type: "Full-time",
    location: "Remote",
    status: "Unpublished",
    views: 2,
    clicks: 0,
    createdAt: new Date(2023, 10, 28),
  },
  {
    id: "9",
    title: "Senior Performance Marketing Manager",
    department: "MARKETING",
    type: "Full-time",
    location: "Remote",
    status: "Unpublished",
    views: 3,
    clicks: 1,
    createdAt: new Date(2023, 10, 20),
  },
]

const getStatusIcon = (status: string) => {
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
      )
    case "Unpublished":
      return (
        <div className="h-5 w-5 rounded-full bg-amber-500 flex items-center justify-center text-white">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 9v4M12 17h.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )
    case "Draft":
      return (
        <div className="h-5 w-5 rounded-full bg-purple-500 flex items-center justify-center text-white">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )
    default:
      return null
  }
}

export function JobsList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <Card key={job.id} className="overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(job.status)}
                <span className="font-medium">{job.status}</span>
              </div>

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Edit className="h-4 w-4" />
                  <span className="ml-1">Edit</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Job
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="text-xs text-muted-foreground mb-2">{job.department}</div>

            <h3 className="font-medium mb-1">{job.title}</h3>

            <div className="text-sm text-muted-foreground mb-4">
              {job.location} • {job.type}
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span>
                  {job.views} {job.views === 1 ? "view" : "views"}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-muted-foreground"
                >
                  <path
                    d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h7M16 5h6v6M8 16l16-16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>
                  {job.clicks} 'Apply' {job.clicks === 1 ? "click" : "clicks"}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t p-4">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href={`/dashboard/candidates?job=${job.id}`}>View candidates</Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

