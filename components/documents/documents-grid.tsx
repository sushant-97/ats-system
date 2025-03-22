"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"
import { Download, File, FileText, MoreVertical, Pencil, Trash } from "lucide-react"

const documents = [
  {
    id: "1",
    name: "Resume - Software Developer.pdf",
    type: "PDF",
    size: "1.2 MB",
    date: new Date(2023, 6, 15),
    category: "Resume",
  },
  {
    id: "2",
    name: "Cover Letter - Frontend Position.docx",
    type: "DOCX",
    size: "450 KB",
    date: new Date(2023, 6, 15),
    category: "Cover Letter",
  },
  {
    id: "3",
    name: "Portfolio - Web Projects.pdf",
    type: "PDF",
    size: "3.5 MB",
    date: new Date(2023, 6, 16),
    category: "Portfolio",
  },
  {
    id: "4",
    name: "Resume - UI Designer.pdf",
    type: "PDF",
    size: "980 KB",
    date: new Date(2023, 6, 18),
    category: "Resume",
  },
  {
    id: "5",
    name: "Cover Letter - Product Manager.docx",
    type: "DOCX",
    size: "520 KB",
    date: new Date(2023, 6, 20),
    category: "Cover Letter",
  },
  {
    id: "6",
    name: "Certifications.pdf",
    type: "PDF",
    size: "2.1 MB",
    date: new Date(2023, 6, 22),
    category: "Other",
  },
  {
    id: "7",
    name: "Reference Letters.pdf",
    type: "PDF",
    size: "1.8 MB",
    date: new Date(2023, 6, 25),
    category: "Other",
  },
  {
    id: "8",
    name: "Resume - Full Stack Developer.pdf",
    type: "PDF",
    size: "1.4 MB",
    date: new Date(2023, 6, 28),
    category: "Resume",
  },
]

export function DocumentsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <Card key={doc.id} className="overflow-hidden">
          <div className="aspect-video bg-muted flex items-center justify-center">
            {doc.type === "PDF" ? (
              <FileText className="h-16 w-16 text-red-500" />
            ) : (
              <File className="h-16 w-16 text-blue-500" />
            )}
          </div>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-medium leading-tight">{doc.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {doc.size} • {doc.category} • Uploaded {formatDistanceToNow(doc.date, { addSuffix: true })}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button variant="outline" size="sm">
              Preview
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

