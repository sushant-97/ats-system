import { DocumentsGrid } from "@/components/documents/documents-grid"
import { DocumentsFilter } from "@/components/documents/documents-filter"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function DocumentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>
      <DocumentsFilter />
      <DocumentsGrid />
    </div>
  )
}

