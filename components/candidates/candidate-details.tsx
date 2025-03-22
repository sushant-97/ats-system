// File path: /components/candidates/candidate-details.tsx
// Create this new component file

"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
    Briefcase,
    Calendar as CalendarIcon,
    CalendarPlus,
    CheckCircle,
    Clock,
    Download,
    FileText,
    GraduationCap,
    Mail,
    MapPin,
    MessageSquare,
    Send,
    Star,
    XCircle
} from "lucide-react"
import { useState } from "react"

// Dummy work experience data
const workExperience = [
  {
    id: 1,
    company: "MongoDB",
    position: "Associate Customer Success Manager - Onboarding",
    startDate: "Oct 2023",
    endDate: "Present",
    duration: "1 yr 3 mos",
    current: true,
    location: "On-site",
    description: "Customer set: public clients of Lombardia and Emilia Romagna regions (Education, Government, Utilities and Healthcare) and government bodies."
  },
  {
    id: 2,
    company: "Hewlett Packard Enterprise",
    position: "Account Manager",
    startDate: "Oct 2021",
    endDate: "Oct 2023",
    duration: "2 yrs",
    current: false,
    location: "On-site",
    description: "Top 40 performers globally: participated to the Alliance Club 2022 in the HPE Houston HQ."
  }
];

// Dummy education data
const education = [
  {
    id: 1,
    institution: "University of Milan",
    degree: "Master's in Business Administration",
    field: "Enterprise Management",
    startYear: 2018,
    endYear: 2020
  },
  {
    id: 2,
    institution: "University of Bologna",
    degree: "Bachelor's in Economics",
    field: "Business Economics",
    startYear: 2015,
    endYear: 2018
  }
];

// Dummy activity data
const activities = [
  { id: 1, type: "note", content: "Candidate has excellent communication skills and customer success experience.", date: "2 days ago", user: "John Smith" },
  { id: 2, type: "email", content: "Sent introduction email about the Sales Engineer position.", date: "1 day ago", user: "John Smith" },
  { id: 3, type: "status", content: "Moved to Screening stage", date: "1 day ago", user: "System" }
];

export default function CandidateDetails({ candidate }) {
  const [activeTab, setActiveTab] = useState("experience")
  const [note, setNote] = useState("")
  const { toast } = useToast()

  // Handler for adding notes
  const addNote = () => {
    if (!note.trim()) return

    // In a real app, you would save this to your database
    toast({
      title: "Note added",
      description: "Your note has been added to the candidate's profile."
    })

    setNote("")
  }

  // Handler for scheduling interviews
  const scheduleInterview = () => {
    toast({
      title: "Interview scheduling",
      description: "Opening calendar to schedule an interview."
    })
  }

  // Handler for sending messages
  const sendMessage = () => {
    toast({
      title: "Message",
      description: "Opening email composer."
    })
  }

  // Handler for downloading resume
  const downloadResume = () => {
    toast({
      title: "Downloading",
      description: "Downloading candidate's resume."
    })
  }

  // Handler for accepting/rejecting candidates
  const processCandidacy = (action) => {
    toast({
      title: action === 'accept' ? "Candidate accepted" : "Candidate rejected",
      description: action === 'accept'
        ? "The candidate has been moved to the interview stage."
        : "The candidate has been rejected."
    })
  }

  if (!candidate) {
    return (
      <Card>
        <CardContent className="p-6 flex items-center justify-center h-96">
          <p className="text-muted-foreground">Select a candidate to view details</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border bg-background">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`h-16 w-16 rounded-full ${candidate.color} flex items-center justify-center text-xl font-semibold`}>
            {candidate.initials}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{candidate.name}</h2>
            <p className="text-lg text-muted-foreground">{candidate.position}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {candidate.location}
              </span>

              {candidate.aiMatch && (
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-blue-500" />
                  {candidate.matchScore}% Match
                </Badge>
              )}
            </div>
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">Experience</p>
              <p className="flex items-center gap-2">
                {candidate.experience}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="flex items-center gap-2">
                {candidate.name.toLowerCase().replace(' ', '.') + '@example.com'}
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Mail className="h-4 w-4" />
                </Button>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={scheduleInterview}>
              <CalendarPlus className="mr-2 h-4 w-4" />
              Schedule Interview
            </Button>
            <Button variant="outline" onClick={sendMessage}>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex border-b">
              <TabsList className="bg-transparent">
                <TabsTrigger
                  value="experience"
                  className="data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Experience
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Education
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Skills
                </TabsTrigger>
                <TabsTrigger
                  value="activity"
                  className="data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Activity
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="experience" className="mt-6">
              <h3 className="text-lg font-medium mb-4">Work Experience</h3>

              <div className="space-y-6">
                {workExperience.map((job) => (
                  <div key={job.id} className="flex gap-4">
                    <div className="h-10 w-10 rounded bg-purple-100 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{job.position}</h4>
                          <p className="text-muted-foreground">{job.company} • {job.location}</p>
                        </div>
                        {job.current && (
                          <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded">CURRENT</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {job.startDate} - {job.endDate} • {job.duration}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {job.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-6">
                <Button variant="outline" onClick={downloadResume}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  View Cover Letter
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="education" className="mt-6">
              <h3 className="text-lg font-medium mb-4">Education</h3>

              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="flex gap-4">
                    <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{edu.degree}</h4>
                      <p className="text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {edu.field} • {edu.startYear} - {edu.endYear}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills" className="mt-6">
              <h3 className="text-lg font-medium mb-4">Skills</h3>

              <div className="flex flex-wrap gap-2 mb-6">
                {candidate.skills && candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>

              <h3 className="text-lg font-medium mb-4 mt-6">Languages</h3>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>English</span>
                  <span className="text-sm text-muted-foreground">Professional</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Spanish</span>
                  <span className="text-sm text-muted-foreground">Native</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Italian</span>
                  <span className="text-sm text-muted-foreground">Fluent</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Activity</h3>
                <Button variant="outline" size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Activity Log
                </Button>
              </div>

              <div className="space-y-4 mb-6">
                {activities.map((activity) => (
                  <div key={activity.id} className="p-3 bg-muted/30 rounded-md">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        {activity.type === "note" && <MessageSquare className="h-4 w-4 text-blue-500" />}
                        {activity.type === "email" && <Mail className="h-4 w-4 text-green-500" />}
                        {activity.type === "status" && <Clock className="h-4 w-4 text-purple-500" />}
                        <span className="font-medium text-sm">{activity.user}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.date}</span>
                    </div>
                    <p className="text-sm mt-1">{activity.content}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Add a note</h4>
                <div className="flex flex-col gap-2">
                  <Textarea
                    placeholder="Add your notes about this candidate..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button onClick={addNote}>Add Note</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-8 pt-6 border-t flex gap-2 justify-end">
          <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => processCandidacy('reject')}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Reject
          </Button>
          <Button
            variant="outline"
            className="border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700"
            onClick={() => processCandidacy('accept')}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Accept
          </Button>
          <Button>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Schedule Interview
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}