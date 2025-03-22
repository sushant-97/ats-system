// app/dashboard/candidates/page.tsx
"use client"

import { CandidateView } from "@/components/candidates/candidate-view"
import { JobsList } from "@/components/candidates/jobs-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CandidatesPage() {
  const [selectedJob, setSelectedJob] = useState(null)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">Manage and track candidates throughout your hiring pipeline.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/jobs/new">
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Link>
        </Button>
      </div>

      {!selectedJob ? (
        <JobsList onSelectJob={setSelectedJob} />
      ) : (
        <CandidateView
          job={selectedJob}
          onBack={() => setSelectedJob(null)}
        />
      )}
    </div>
  )
}