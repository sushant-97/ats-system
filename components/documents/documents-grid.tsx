// File path: /components/documents/documents-grid.tsx
// Replace your existing DocumentsGrid component with this content

// components/documents/documents-grid.tsx
"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
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
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"
import { Download, Eye, File, FileText, MoreVertical, Pencil, Trash } from "lucide-react"
import { useState } from "react"

export function DocumentsGrid({ documents = [], onDelete }) {
  const { toast } = useToast()
  const [documentToDelete, setDocumentToDelete] = useState(null)
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  // Handle document deletion
  const handleDelete = () => {
    if (documentToDelete) {
      onDelete(documentToDelete)
      toast({
        title: "Document deleted",
        description: "The document has been successfully deleted.",
      })
      setIsAlertOpen(false)
      setDocumentToDelete(null)
    }
  }

  // Handle document download
  const handleDownload = (document) => {
    // In a real app, this would trigger an actual download
    toast({
      title: "Download started",
      description: `Downloading ${document.name}...`,
    })
  }

  // Handle document preview
  const handlePreview = (document) => {
    // In a real app, this would open a preview
    toast({
      title: "Preview",
      description: `Previewing ${document.name}...`,
    })
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <Card key={doc.id} className="overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
              {doc.type === "PDF" ? (
                <FileText className="h-16 w-16 text-red-500" />
              ) : doc.type === "DOCX" ? (
                <File className="h-16 w-16 text-blue-500" />
              ) : (
                <File className="h-16 w-16 text-gray-500" />
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
                    <DropdownMenuItem onClick={() => handleDownload(doc)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => {
                        setDocumentToDelete(doc.id)
                        setIsAlertOpen(true)
                      }}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button variant="outline" size="sm" onClick={() => handlePreview(doc)}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button size="sm" onClick={() => handleDownload(doc)}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              document from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}