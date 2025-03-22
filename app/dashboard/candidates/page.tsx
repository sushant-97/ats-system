// File path: /app/dashboard/candidates/page.tsx
// Replace your existing candidates page with this content

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Eye } from "lucide-react"
import dynamic from 'next/dynamic'
import Link from "next/link"
import { useState } from "react"

// Dynamically import components to prevent SSR issues
const CandidatesList = dynamic(
  () => import('@/components/candidates/candidates-list'),
  { ssr: false }
)

const CandidateDetails = dynamic(
  () => import('@/components/candidates/candidate-details'),
  { ssr: false }
)

const CandidateStages = dynamic(
  () => import('@/components/candidates/candidate-stages'),
  { ssr: false }
)

const CandidateSourcing = dynamic(
  () => import('@/components/candidates/candidate-sourcing'),
  { ssr: false }
)

export default function CandidatesPage() {
  const [activeTab, setActiveTab] = useState("leads")
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

  const handleBackClick = () => {
    setSelectedCandidate(null)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">Hire great people, wherever they are.</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/jobs">
            <Eye className="mr-2 h-4 w-4" />
            View Job Posts
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <Button variant="ghost" size="sm" className="h-8 px-2" onClick={handleBackClick}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h2 className="text-lg font-medium">Sales Engineer</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/dashboard/jobs/sales-engineer/edit">
            <Edit className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Remote</span>
        <span>•</span>
        <span>Full-time</span>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sourcing">Source Candidates</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="sourcing" className="space-y-4">
          <CandidateSourcing onSourceCandidate={(candidate) => {
            // In a real app, you would save this to your database
            console.log("Sourced candidate:", candidate)
            setActiveTab("leads")
          }} />
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <CandidateStages onStageSelect={handleStageChange} activeStage={stageFilter} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <CandidatesList
                stageFilter={stageFilter}
                onSelectCandidate={handleCandidateSelect}
                selectedCandidateId={selectedCandidate?.id}
              />
            </div>

            <div className="lg:col-span-2">
              {selectedCandidate ? (
                <CandidateDetails candidate={selectedCandidate} />
              ) : (
                <Card>
                  <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-xl font-semibold mb-4">
                      <Eye className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">Select a candidate</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Click on a candidate from the list to view their details
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Candidate Pipeline</CardTitle>
              <CardDescription>
                Track candidates as they move through your hiring stages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex overflow-x-auto pb-4 gap-4">
                {["Applied", "Screening", "Interview", "Offer", "Hired", "Rejected"].map(stage => (
                  <div key={stage} className="flex-shrink-0 w-[250px] border rounded-md p-4">
                    <h3 className="font-medium mb-3">{stage}</h3>
                    <div className="space-y-2">
                      {/* In a real app, this would display candidates in each stage */}
                      {stage === "Applied" && (
                        <>
                          <CandidateCard name="Jane Cooper" position="Sales Manager" />
                          <CandidateCard name="Cody Fisher" position="Marketing Lead" />
                          <CandidateCard name="Esther Howard" position="Account Executive" />
                        </>
                      )}

                      {stage === "Screening" && (
                        <>
                          <CandidateCard name="Devon Lane" position="Business Analyst" />
                          <CandidateCard name="Cameron Wilson" position="Product Manager" />
                        </>
                      )}

                      {stage === "Interview" && (
                        <CandidateCard name="Leslie Alexander" position="Frontend Developer" />
                      )}

                      {stage === "Hired" && (
                        <CandidateCard name="Brooklyn Simmons" position="UX Designer" />
                      )}

                      {/* Empty states for other columns */}
                      {(stage === "Offer" || stage === "Rejected") && (
                        <div className="h-20 flex items-center justify-center border border-dashed rounded-md">
                          <p className="text-sm text-muted-foreground">No candidates</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MetricCard title="Total Applicants" value="63" change="+12%" />
            <MetricCard title="Screening Rate" value="28%" change="+5%" />
            <MetricCard title="Interview to Offer" value="42%" change="+8%" />
            <MetricCard title="Offer Acceptance" value="85%" change="-3%" />
            <MetricCard title="Time to Hire" value="18 days" change="-5 days" />
            <MetricCard title="Cost per Hire" value="$4,250" change="-$320" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Source Efficiency</CardTitle>
              <CardDescription>
                Comparing candidate sources by volume and quality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">Analytics visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CandidateCard({ name, position }) {
  return (
    <div className="p-3 border rounded-md bg-background hover:border-primary/50 cursor-pointer transition-colors">
      <h4 className="font-medium text-sm">{name}</h4>
      <p className="text-xs text-muted-foreground">{position}</p>
    </div>
  )
}

function MetricCard({ title, value, change }) {
  const isPositive = change.startsWith('+')

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change} from last month
        </p>
      </CardContent>
    </Card>
  )
}