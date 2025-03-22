// components/candidates/candidate-view.tsx
"use client"

import { CandidateDetails } from "@/components/candidates/candidate-details"
import { CandidateStages } from "@/components/candidates/candidate-stages"
import { CandidatesList } from "@/components/candidates/candidates-list"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function CandidateView({ job, onBack }) {
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [stageFilter, setStageFilter] = useState("leads")

  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate)
  }

  const handleStageChange = (stage) => {
    setStageFilter(stage)
    if (selectedCandidate) {
      setSelectedCandidate(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mt-2">
        <Button variant="ghost" size="sm" className="h-8 px-2" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Jobs
        </Button>
        <h2 className="text-lg font-medium">{job.title}</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href={`/dashboard/jobs/${job.id}/edit`}>
            <Edit className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{job.location}</span>
        <span>•</span>
        <span>{job.type}</span>
        <span>•</span>
        <span>{job.totalCandidates} candidates total</span>
      </div>

      {/* Candidate Pipeline */}
      <CandidateStages onStageSelect={handleStageChange} activeStage={stageFilter} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CandidatesList
            stageFilter={stageFilter}
            jobId={job.id}
            onSelectCandidate={handleCandidateSelect}
            selectedCandidateId={selectedCandidate?.id}
          />
        </div>

        <div className="lg:col-span-2">
          {selectedCandidate ? (
            <CandidateDetails candidate={selectedCandidate} />
          ) : (
            <div className="border rounded-lg p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-xl font-semibold mb-4">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">Select a candidate</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Click on a candidate from the list to view their details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}