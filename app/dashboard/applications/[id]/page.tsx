import { ApplicationDetail } from "@/components/applications/application-detail"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Edit } from "lucide-react"
import Link from "next/link"

export default function ApplicationDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/applications">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Application Details</h1>
        </div>
        <Button asChild>
          <Link href={`/dashboard/applications/${params.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Application
          </Link>
        </Button>
      </div>
      <ApplicationDetail id={params.id} />
    </div>
  )
}

