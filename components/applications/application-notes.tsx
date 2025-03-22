"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { Plus } from "lucide-react"
import { useState } from "react"

const initialNotes = [
  {
    id: "1",
    content:
      "Had a great initial call with the recruiter. They mentioned they're looking for someone with strong React experience and knowledge of TypeScript.",
    date: new Date(2023, 6, 16, 15, 30),
  },
  {
    id: "2",
    content:
      "Screening call went well. The hiring manager asked about my experience with state management and component design. Need to prepare examples of complex UI components I've built for the technical interview.",
    date: new Date(2023, 6, 18, 14, 30),
  },
]

export function ApplicationNotes() {
  const [notes, setNotes] = useState(initialNotes)
  const [newNote, setNewNote] = useState("")
  const [isAddingNote, setIsAddingNote] = useState(false)

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now().toString(),
        content: newNote,
        date: new Date(),
      }
      setNotes([note, ...notes])
      setNewNote("")
      setIsAddingNote(false)
    }
  }

  return (
    <div className="space-y-4">
      {isAddingNote ? (
        <Card className="p-4">
          <Textarea
            placeholder="Add a note about this application..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="mb-4"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddingNote(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNote}>Save Note</Button>
          </div>
        </Card>
      ) : (
        <Button variant="outline" className="w-full" onClick={() => setIsAddingNote(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Note
        </Button>
      )}

      {notes.map((note) => (
        <Card key={note.id} className="p-4">
          <div className="flex justify-between items-start mb-2">
            <time className="text-xs text-muted-foreground">{format(note.date, "MMM d, yyyy 'at' h:mm a")}</time>
          </div>
          <p className="text-sm whitespace-pre-wrap">{note.content}</p>
        </Card>
      ))}
    </div>
  )
}

