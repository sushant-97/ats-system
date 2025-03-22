// app/dashboard/documents/page.tsx
// File path: /app/dashboard/documents/page.tsx
// Replace your existing documents page with this content

"use client"

import { DocumentsFilter } from "@/components/documents/documents-filter"
import { DocumentsGrid } from "@/components/documents/documents-grid"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import dynamic from 'next/dynamic'
import { useState } from "react"

// Dynamically import the DocumentUploader component to prevent SSR issues
const DocumentUploader = dynamic(
  () => import('@/components/documents/document-uploader'),
  { ssr: false }
)

export default function DocumentsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [documents, setDocuments] = useState([
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
    // Rest of the documents...
  ])

  // Function to add new documents
  const addDocuments = (newDocs) => {
    setDocuments([...newDocs, ...documents])
    setIsDialogOpen(false)
  }

  // Function to delete a document
  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Upload Documents</DialogTitle>
              <DialogDescription>
                Upload your resumes, cover letters, and other job-related documents.
              </DialogDescription>
            </DialogHeader>
            <DocumentUploader onUploadComplete={(files) => addDocuments(files)} />
          </DialogContent>
        </Dialog>
      </div>
      <DocumentsFilter />
      <DocumentsGrid documents={documents} onDelete={deleteDocument} />
    </div>
  )
}