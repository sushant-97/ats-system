"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { Download, File, FileText, Trash, Upload } from "lucide-react"

const documents = [
  {
    id: "1",
    name: "Resume.pdf",
    type: "PDF",
    size: "1.2 MB",
    date: new Date(2023, 6, 15),
  },
  {
    id: "2",
    name: "Cover Letter.docx",
    type: "DOCX",
    size: "450 KB",
    date: new Date(2023, 6, 15),
  },
  {
    id: "3",
    name: "Portfolio.pdf",
    type: "PDF",
    size: "3.5 MB",
    date: new Date(2023, 6, 16),
  },
]

export function DocumentList() {
  return (
    <div className="space-y-4">
      <Button className="w-full" variant="outline">
        <Upload className="mr-2 h-4 w-4" />
        Upload Document
      </Button>

      <div className="space-y-2">
        {documents.map((doc) => (
          <Card key={doc.id} className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {doc.type === "PDF" ? (
                <FileText className="h-8 w-8 text-red-500" />
              ) : (
                <File className="h-8 w-8 text-blue-500" />
              )}
              <div>
                <div className="font-medium">{doc.name}</div>
                <div className="text-xs text-muted-foreground">
                  {doc.size} • Uploaded {formatDistanceToNow(doc.date, { addSuffix: true })}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

