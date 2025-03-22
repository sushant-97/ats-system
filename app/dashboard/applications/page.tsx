// app/dashboard/applications/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Import our enhanced components
import dynamic from 'next/dynamic'

// Dynamically import components to prevent SSR issues
const EnhancedApplicationsTable = dynamic(
  () => import('@/components/applications/enhanced-applications-table'),
  { ssr: false }
)

const InterviewScheduler = dynamic(
  () => import('@/components/interview-scheduler'),
  { ssr: false }
)

const JobSearch = dynamic(
  () => import('@/components/job-search'),
  { ssr: false }
)

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("applications")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Job Applications</h1>
          <p className="text-muted-foreground">
            Track applications, schedule interviews, and find new opportunities
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/applications/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Application
          </Link>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="search">Find Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          <EnhancedApplicationsTable />
        </TabsContent>

        <TabsContent value="interviews" className="space-y-4">
          <InterviewScheduler />
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Search</CardTitle>
              <CardDescription>
                Find new opportunities matching your skills and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <JobSearch />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}