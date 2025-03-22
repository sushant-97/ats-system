"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDistanceToNow } from "date-fns"
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import Link from "next/link"

const applications = [
  {
    id: "1",
    company: "Acme Inc",
    position: "Frontend Developer",
    status: "Applied",
    date: new Date(2023, 6, 15),
    location: "Remote",
    type: "Full-time",
  },
  {
    id: "2",
    company: "Globex Corporation",
    position: "Full Stack Engineer",
    status: "Interview",
    date: new Date(2023, 6, 12),
    location: "San Francisco, CA",
    type: "Full-time",
  },
  {
    id: "3",
    company: "Stark Industries",
    position: "UI/UX Designer",
    status: "Rejected",
    date: new Date(2023, 6, 10),
    location: "New York, NY",
    type: "Contract",
  },
  {
    id: "4",
    company: "Wayne Enterprises",
    position: "Software Engineer",
    status: "Offer",
    date: new Date(2023, 6, 8),
    location: "Chicago, IL",
    type: "Full-time",
  },
  {
    id: "5",
    company: "Umbrella Corporation",
    position: "DevOps Engineer",
    status: "Screening",
    date: new Date(2023, 6, 5),
    location: "Remote",
    type: "Full-time",
  },
  {
    id: "6",
    company: "Cyberdyne Systems",
    position: "Machine Learning Engineer",
    status: "Applied",
    date: new Date(2023, 6, 3),
    location: "Boston, MA",
    type: "Full-time",
  },
  {
    id: "7",
    company: "Initech",
    position: "Backend Developer",
    status: "Applied",
    date: new Date(2023, 6, 1),
    location: "Austin, TX",
    type: "Full-time",
  },
  {
    id: "8",
    company: "Massive Dynamic",
    position: "Data Scientist",
    status: "Interview",
    date: new Date(2023, 5, 28),
    location: "Seattle, WA",
    type: "Full-time",
  },
  {
    id: "9",
    company: "Oscorp Industries",
    position: "QA Engineer",
    status: "Screening",
    date: new Date(2023, 5, 25),
    location: "Remote",
    type: "Contract",
  },
  {
    id: "10",
    company: "Pied Piper",
    position: "Frontend Developer",
    status: "Applied",
    date: new Date(2023, 5, 22),
    location: "San Jose, CA",
    type: "Full-time",
  },
]

const statusColors = {
  Applied: "default",
  Screening: "secondary",
  Interview: "warning",
  Offer: "success",
  Rejected: "destructive",
} as const

export function ApplicationsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Applied</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">{application.company}</TableCell>
              <TableCell>{application.position}</TableCell>
              <TableCell>
                <Badge variant={statusColors[application.status as keyof typeof statusColors]}>
                  {application.status}
                </Badge>
              </TableCell>
              <TableCell>{application.type}</TableCell>
              <TableCell>{application.location}</TableCell>
              <TableCell>{formatDistanceToNow(application.date, { addSuffix: true })}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/applications/${application.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/applications/${application.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

