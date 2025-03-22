// File path: /components/candidates/candidate-stages.tsx
// Replace your existing candidate-stages component with this content

"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ChevronDown, Plus } from "lucide-react"
import { useEffect, useState } from "react"

// Stage definitions with counts that will be updated dynamically
const initialStages = [
  { id: "leads", name: "Leads", count: 0, active: true },
  { id: "sourced", name: "Sourced", count: 0, active: false },
  { id: "shortlist", name: "Shortlist", count: 0, active: false },
  { id: "interview", name: "Interview", count: 0, active: false },
  { id: "offer", name: "Offer", count: 0, active: false },
  { id: "hired", name: "Hired", count: 0, active: false },
  { id: "rejected", name: "Rejected", count: 0, active: false },
];

export default function CandidateStages({ onStageSelect, activeStage = "leads" }) {
  const [stages, setStages] = useState(initialStages)
  const [counts, setCounts] = useState({
    leads: 6,
    sourced: 2,
    shortlist: 3,
    interview: 1,
    offer: 0,
    hired: 1,
    rejected: 0,
  })

  // Update the stages when counts change
  useEffect(() => {
    setStages(prevStages =>
      prevStages.map(stage => ({
        ...stage,
        count: counts[stage.id],
        active: stage.id === activeStage
      }))
    )
  }, [counts, activeStage])

  // Handle stage selection
  const handleStageClick = (stageId) => {
    if (onStageSelect) {
      onStageSelect(stageId)
    }
  }

  // For demonstration purposes, simulate adding a candidate
  const addCandidate = (stageId) => {
    setCounts(prev => ({
      ...prev,
      [stageId]: prev[stageId] + 1
    }))
  }

  return (
    <div className="flex flex-wrap gap-2">
      {stages.map((stage) => (
        <div key={stage.id} className="flex">
          <Button
            variant={stage.active ? "default" : "outline"}
            className={cn("h-10 rounded-r-none", stage.active ? "bg-primary text-primary-foreground" : "")}
            onClick={() => handleStageClick(stage.id)}
          >
            {stage.name} ({stage.count})
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={stage.active ? "default" : "outline"}
                className={cn(
                  "h-10 px-2 rounded-l-none border-l-0",
                  stage.active ? "bg-primary text-primary-foreground" : ""
                )}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => addCandidate(stage.id)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Candidate
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export Candidates
              </DropdownMenuItem>
              {stage.id !== "leads" && stage.id !== "sourced" && (
                <DropdownMenuItem>
                  Schedule Batch Interviews
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  )
}