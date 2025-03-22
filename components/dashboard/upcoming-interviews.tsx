"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"
import { format } from "date-fns"

const upcomingInterviews = [
  {
    id: "1",
    company: "Acme Inc",
    position: "Frontend Developer",
    type: "Technical",
    date: new Date(2023, 6, 20, 14, 0),
    location: "Remote",
    logo: "/placeholder.svg",
  },
  {
    id: "2",
    company: "Globex Corporation",
    position: "Full Stack Engineer",
    type: "Final",
    date: new Date(2023, 6, 22, 10, 30),
    location: "San Francisco, CA",
    logo: "/placeholder.svg",
  },
  {
    id: "3",
    company: "Wayne Enterprises",
    position: "Software Engineer",
    type: "HR",
    date: new Date(2023, 6, 25, 15, 0),
    location: "Remote",
    logo: "/placeholder.svg",
  },
]

export function UpcomingInterviews() {
  return (
    <div className="space-y-4">
      {upcomingInterviews.map((interview) => (
        <div key={interview.id} className="flex items-start space-x-4 rounded-lg border p-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={interview.logo} alt={interview.company} />
            <AvatarFallback>{interview.company.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium leading-none">{interview.company}</p>
                <p className="text-sm text-muted-foreground">{interview.position}</p>
              </div>
              <Badge variant="outline">{interview.type} Interview</Badge>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                {format(interview.date, "MMM d, yyyy")}
              </div>
              <div className="mx-2">•</div>
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                {format(interview.date, "h:mm a")}
              </div>
              <div className="mx-2">•</div>
              <div className="flex items-center">
                <MapPin className="mr-1 h-3 w-3" />
                {interview.location}
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Prepare
          </Button>
        </div>
      ))}
    </div>
  )
}

