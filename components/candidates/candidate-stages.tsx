"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const stages = [
  { id: "leads", name: "Leads", count: 11, active: true },
  { id: "shortlist", name: "Shortlist", count: 0, active: false },
  { id: "interview", name: "Interview", count: 0, active: false },
  { id: "offer", name: "Offer", count: 0, active: false },
  { id: "hired", name: "Hired", count: 1, active: false },
  { id: "rejected", name: "Rejected", count: 0, active: false },
]

export function CandidateStages() {
  return (
    <div className="flex flex-wrap gap-2">
      {stages.map((stage) => (
        <Button
          key={stage.id}
          variant={stage.active ? "default" : "outline"}
          className={cn("h-10 gap-2", stage.active ? "bg-primary text-primary-foreground" : "")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={stage.active ? "text-primary-foreground" : "text-muted-foreground"}
          >
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {stage.name} ({stage.count})
        </Button>
      ))}
    </div>
  )
}

