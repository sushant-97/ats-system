"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"

const timelineEvents = [
  {
    id: "1",
    title: "Application Submitted",
    description: "Your application was successfully submitted.",
    date: new Date(2023, 6, 15, 10, 30),
    icon: "/placeholder.svg",
    iconFallback: "AS",
  },
  {
    id: "2",
    title: "Application Viewed",
    description: "Your application was viewed by the hiring team.",
    date: new Date(2023, 6, 16, 14, 45),
    icon: "/placeholder.svg",
    iconFallback: "AV",
  },
  {
    id: "3",
    title: "Screening Call Scheduled",
    description: "A screening call has been scheduled for July 18th at 2:00 PM.",
    date: new Date(2023, 6, 17, 9, 15),
    icon: "/placeholder.svg",
    iconFallback: "SC",
  },
  {
    id: "4",
    title: "Screening Call Completed",
    description: "You completed the screening call with Jane Smith.",
    date: new Date(2023, 6, 18, 14, 0),
    icon: "/placeholder.svg",
    iconFallback: "SC",
  },
  {
    id: "5",
    title: "Technical Interview Scheduled",
    description: "A technical interview has been scheduled for July 22nd at 2:00 PM.",
    date: new Date(2023, 6, 19, 11, 30),
    icon: "/placeholder.svg",
    iconFallback: "TI",
  },
]

export function ApplicationTimeline() {
  return (
    <div className="space-y-4">
      {timelineEvents.map((event, index) => (
        <div key={event.id} className="flex gap-4">
          <div className="relative flex flex-col items-center">
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarImage src={event.icon} alt="" />
              <AvatarFallback>{event.iconFallback}</AvatarFallback>
            </Avatar>
            {index < timelineEvents.length - 1 && <div className="absolute top-8 bottom-0 w-px bg-border mx-auto" />}
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">{event.title}</h4>
              <time className="text-xs text-muted-foreground">{format(event.date, "MMM d, h:mm a")}</time>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

