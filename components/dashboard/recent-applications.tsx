"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDistanceToNow } from "date-fns"
import { Eye } from "lucide-react"
import Link from "next/link"

const recentApplications = [
  {
    id: "1",
    company: "Acme Inc",
    position: "Frontend Developer",
    status: "Applied",
    date: new Date(2023, 6, 15),
  },
  {
    id: "2",
    company: "Globex Corporation",
    position: "Full Stack Engineer",
    status: "Interview",
    date: new Date(2023, 6, 12),
  },
  {
    id: "3",
    company: "Stark Industries",
    position: "UI/UX Designer",
    status: "Rejected",
    date: new Date(2023, 6, 10),
  },
  {
    id: "4",
    company: "Wayne Enterprises",
    position: "Software Engineer",
    status: "Offer",
    date: new Date(2023, 6, 8),
  },
  {
    id: "5",
    company: "Umbrella Corporation",
    position: "DevOps Engineer",
    status: "Screening",
    date: new Date(2023, 6, 5),
  },
]

const statusColors = {
  Applied: "default",
  Screening: "secondary",
  Interview: "warning",
  Offer: "success",
  Rejected: "destructive",
} as const

export function RecentApplications() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Applied</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentApplications.map((application) => (
          <TableRow key={application.id}>
            <TableCell className="font-medium">{application.company}</TableCell>
            <TableCell>{application.position}</TableCell>
            <TableCell>
              <Badge variant={statusColors[application.status as keyof typeof statusColors]}>
                {application.status}
              </Badge>
            </TableCell>
            <TableCell>{formatDistanceToNow(application.date, { addSuffix: true })}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/dashboard/applications/${application.id}`}>
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View details</span>
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

