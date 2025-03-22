"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { Building, Calendar, Clock, Download, ExternalLink, FileText, MapPin, Paperclip } from "lucide-react"
import { ApplicationTimeline } from "./application-timeline"
import { ApplicationNotes } from "./application-notes"
import { DocumentList } from "../documents/document-list"

const statusColors = {
  Applied: "default",
  Screening: "secondary",
  Interview: "warning",
  Offer: "success",
  Rejected: "destructive",
} as const

// Mock data for a single application
const applicationData = {
  id: "1",
  company: "Acme Inc",
  position: "Frontend Developer",
  status: "Interview",
  date: new Date(2023, 6, 15),
  location: "Remote",
  type: "Full-time",
  salary: "$120,000 - $150,000",
  description:
    "We are looking for a Frontend Developer to join our team. You will be responsible for building user interfaces and implementing designs. The ideal candidate has experience with React, TypeScript, and modern frontend development practices.",
  requirements: [
    "3+ years of experience with React",
    "Strong TypeScript skills",
    "Experience with state management libraries",
    "Understanding of responsive design principles",
    "Knowledge of modern CSS practices",
  ],
  benefits: [
    "Competitive salary",
    "Health, dental, and vision insurance",
    "401(k) matching",
    "Flexible work hours",
    "Remote work options",
  ],
  contactName: "Jane Smith",
  contactEmail: "jane.smith@acme.com",
  contactPhone: "(555) 123-4567",
  logo: "/placeholder.svg",
}

export function ApplicationDetail({ id }: { id: string }) {
  // In a real app, you would fetch the application data based on the ID
  // For now, we'll just use the mock data
  const application = applicationData

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={application.logo} alt={application.company} />
              <AvatarFallback>{application.company.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{application.position}</CardTitle>
                  <CardDescription className="text-lg">{application.company}</CardDescription>
                </div>
                <Badge variant={statusColors[application.status as keyof typeof statusColors]}>
                  {application.status}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Building className="mr-1 h-4 w-4" />
                  {application.type}
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  {application.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  Applied {format(application.date, "MMM d, yyyy")}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Job Description</h3>
                  <p className="text-sm text-muted-foreground">{application.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {application.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Benefits</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {application.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Salary Range</h3>
                  <p className="text-sm text-muted-foreground">{application.salary}</p>
                </div>
              </TabsContent>
              <TabsContent value="timeline">
                <ApplicationTimeline />
              </TabsContent>
              <TabsContent value="notes">
                <ApplicationNotes />
              </TabsContent>
              <TabsContent value="documents">
                <DocumentList />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border p-3 mb-3">
              <div className="font-medium">Technical Interview</div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Calendar className="mr-1 h-4 w-4" />
                {format(new Date(2023, 6, 22), "MMM d, yyyy")}
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Clock className="mr-1 h-4 w-4" />
                {format(new Date(2023, 6, 22, 14, 0), "h:mm a")}
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="mr-1 h-4 w-4" />
                Zoom Meeting
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline">
                  Prepare
                </Button>
                <Button size="sm">Add to Calendar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <div className="font-medium">{application.contactName}</div>
              <div className="text-sm text-muted-foreground">Hiring Manager</div>
            </div>
            <div className="text-sm">
              <div>{application.contactEmail}</div>
              <div>{application.contactPhone}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              View Job Posting
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Company Website
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Paperclip className="mr-2 h-4 w-4" />
              Attach Document
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Application
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

