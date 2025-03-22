import { ApplicationsTable } from "@/components/applications/applications-table"
import { ApplicationsFilter } from "@/components/applications/applications-filter"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ApplicationsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Job Applications</h1>
        <Button asChild>
          <Link href="/dashboard/applications/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Application
          </Link>
        </Button>
      </div>
      <ApplicationsFilter />
      <ApplicationsTable />
    </div>
  )
}

