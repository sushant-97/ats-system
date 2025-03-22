// File path: /components/candidates/candidates-list.tsx
// Replace your existing candidates list component with this content

"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ChevronRight, Filter, MoreHorizontal, Search, Star } from "lucide-react"
import { useState } from "react"

// Sample initial candidates data
const initialCandidates = [
  {
    id: "1",
    name: "Mia Persona",
    position: "Associate Customer Success Manager",
    initials: "MP",
    color: "bg-amber-100",
    status: "leads",
    stage: "new",
    aiMatch: true,
    matchScore: 92,
    source: "AI Match",
    location: "Barcelona, Spain",
    experience: "3 years",
    education: "MBA, Barcelona Business School",
    skills: ["Customer Success", "Account Management", "SaaS", "CRM", "Sales"],
    lastActivity: "Added to leads",
    lastActivityDate: "2 days ago"
  },
  {
    id: "2",
    name: "Lil's Thompson",
    position: "Senior Outbound Sales Developer",
    initials: "LT",
    color: "bg-blue-100",
    status: "leads",
    stage: "new",
    aiMatch: true,
    matchScore: 87,
    source: "AI Match",
    location: "London, UK",
    experience: "6 years",
    education: "Bachelor's in Marketing, University of London",
    skills: ["Sales Development", "Outbound Sales", "Lead Generation", "CRM", "Negotiation"],
    lastActivity: "Added to leads",
    lastActivityDate: "3 days ago"
  },
  {
    id: "3",
    name: "Taylor Bennett",
    position: "Sales Representative",
    initials: "TB",
    color: "bg-purple-100",
    status: "leads",
    stage: "new",
    aiMatch: true,
    matchScore: 85,
    source: "AI Match",
    location: "New York, USA",
    experience: "4 years",
    education: "Bachelor's in Business Administration, NYU",
    skills: ["B2B Sales", "SaaS", "Sales Strategy", "Client Relations", "Prospecting"],
    lastActivity: "Added to leads",
    lastActivityDate: "4 days ago"
  },
  {
    id: "4",
    name: "Sam Samberg",
    position: "Senior Product Designer",
    initials: "SS",
    color: "bg-cyan-100",
    status: "leads",
    stage: "contacted",
    aiMatch: true,
    matchScore: 90,
    source: "AI Match",
    location: "San Francisco, USA",
    experience: "7 years",
    education: "Master's in Design, Stanford University",
    skills: ["UI/UX Design", "Product Design", "Wireframing", "User Research", "Figma"],
    lastActivity: "Sent email introduction",
    lastActivityDate: "1 day ago"
  },
  {
    id: "5",
    name: "Greatest Boss Scott",
    position: "Customer Success Manager",
    initials: "GS",
    color: "bg-pink-100",
    status: "leads",
    stage: "contacted",
    aiMatch: true,
    matchScore: 83,
    source: "AI Match",
    location: "Austin, USA",
    experience: "5 years",
    education: "Bachelor's in Communications, University of Texas",
    skills: ["Customer Success", "Client Relations", "SaaS", "Account Management", "Customer Retention"],
    lastActivity: "Scheduled phone call",
    lastActivityDate: "2 hours ago"
  },
  {
    id: "6",
    name: "Jordan Mitchell",
    position: "Sales Engineer",
    initials: "JM",
    color: "bg-teal-100",
    status: "leads",
    stage: "screening",
    aiMatch: true,
    matchScore: 94,
    source: "AI Match",
    location: "Seattle, USA",
    experience: "8 years",
    education: "Bachelor's in Computer Science, University of Washington",
    skills: ["Sales Engineering", "Technical Sales", "Product Demos", "Solution Architecture", "Client Consulting"],
    lastActivity: "Completed initial screening",
    lastActivityDate: "1 day ago"
  },
  {
    id: "7",
    name: "Alex Rivera",
    position: "Account Executive",
    initials: "AR",
    color: "bg-green-100",
    status: "leads",
    stage: "new",
    aiMatch: false,
    matchScore: 0,
    source: "LinkedIn",
    location: "Miami, USA",
    experience: "5 years",
    education: "Bachelor's in Business, University of Miami",
    skills: ["B2B Sales", "Account Management", "CRM", "Sales Strategy", "Negotiation"],
    lastActivity: "Added manually from LinkedIn",
    lastActivityDate: "5 days ago"
  },
  {
    id: "8",
    name: "Olivia Chen",
    position: "Technical Solutions Engineer",
    initials: "OC",
    color: "bg-indigo-100",
    status: "leads",
    stage: "contacted",
    aiMatch: false,
    matchScore: 0,
    source: "Referral",
    location: "Toronto, Canada",
    experience: "6 years",
    education: "Master's in Engineering, University of Toronto",
    skills: ["Technical Support", "Solution Architecture", "API Integration", "Customer Success", "Product Knowledge"],
    lastActivity: "Sent email introduction",
    lastActivityDate: "3 days ago"
  },
];

// For candidates sourced from different places
const initialSourcedCandidates = [
  {
    id: "9",
    name: "Thomas Wright",
    position: "Technical Sales Engineer",
    initials: "TW",
    color: "bg-orange-100",
    status: "sourced",
    stage: "new",
    aiMatch: false,
    matchScore: 0,
    source: "Sourced (LinkedIn)",
    location: "Chicago, USA",
    experience: "7 years",
    education: "Bachelor's in Computer Science, University of Illinois",
    skills: ["Technical Sales", "Sales Engineering", "Product Demos", "Solution Architecture", "Client Consulting"],
    lastActivity: "Added from sourcing",
    lastActivityDate: "just now"
  },
  {
    id: "10",
    name: "Emma Johnson",
    position: "Solutions Engineer",
    initials: "EJ",
    color: "bg-red-100",
    status: "sourced",
    stage: "new",
    aiMatch: false,
    matchScore: 0,
    source: "Sourced (GitHub)",
    location: "Boston, USA",
    experience: "5 years",
    education: "Master's in Computer Science, MIT",
    skills: ["Technical Sales", "Software Development", "API Integration", "Product Demos", "Solution Architecture"],
    lastActivity: "Added from sourcing",
    lastActivityDate: "just now"
  }
];

// Combined candidates data
const allCandidatesData = [...initialCandidates, ...initialSourcedCandidates];

export default function CandidatesList({ stageFilter = "leads", onSelectCandidate, selectedCandidateId }) {
  const [candidates, setCandidates] = useState(allCandidatesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sourceFilter, setSourceFilter] = useState("all");
  const [matchFilter, setMatchFilter] = useState("all");

  // Apply filters to candidates
  const filteredCandidates = candidates.filter(candidate => {
    // Filter by stage (leads, sourced, etc.)
    const matchesStatus = stageFilter === candidate.status;

    // Text search
    const matchesSearch =
      searchTerm === "" ||
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Source filter
    const matchesSource =
      sourceFilter === "all" ||
      (sourceFilter === "ai" && candidate.aiMatch) ||
      (sourceFilter === "sourced" && candidate.source.includes("Sourced")) ||
      (sourceFilter === "applied" && candidate.source === "Applied") ||
      (sourceFilter === "referral" && candidate.source === "Referral");

    // Match quality filter
    const matchesQuality =
      matchFilter === "all" ||
      (matchFilter === "high" && candidate.matchScore >= 90) ||
      (matchFilter === "medium" && candidate.matchScore >= 80 && candidate.matchScore < 90) ||
      (matchFilter === "low" && candidate.matchScore < 80);

    return matchesStatus && matchesSearch && matchesSource && matchesQuality;
  });

  // Handlers
  const addToLeads = (candidateId) => {
    setCandidates(candidates.map(c =>
      c.id === candidateId
        ? { ...c, status: "leads", stage: "new", lastActivity: "Added to leads", lastActivityDate: "just now" }
        : c
    ));
  };

  const moveToStage = (candidateId, stage) => {
    const stageNames = {
      "new": "New",
      "contacted": "Contacted",
      "screening": "Screening",
      "interview": "Interview",
      "offer": "Offer",
      "hired": "Hired",
      "rejected": "Rejected"
    };

    setCandidates(candidates.map(c =>
      c.id === candidateId
        ? {
            ...c,
            stage,
            lastActivity: `Moved to ${stageNames[stage]}`,
            lastActivityDate: "just now"
          }
        : c
    ));
  };

  return (
    <div className="border rounded-lg bg-background">
      <div className="p-4">
        <h3 className="font-medium mb-2">
          {stageFilter === "leads" ? "Leads" : "Sourced Candidates"}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {stageFilter === "leads"
            ? "Candidates from multiple sources ready for you to review."
            : "Potential candidates sourced from external platforms."}
        </p>

        <div className="flex flex-col gap-4">
          {/* Search and filters */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or position"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                variant={sourceFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSourceFilter("all")}
              >
                All ({filteredCandidates.length})
              </Button>

              <Button
                variant={sourceFilter === "ai" ? "default" : "outline"}
                size="sm"
                onClick={() => setSourceFilter("ai")}
              >
                AI Matches
              </Button>

              {stageFilter === "leads" && (
                <Button
                  variant={sourceFilter === "sourced" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSourceFilter("sourced")}
                >
                  Sourced
                </Button>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {filterOpen && (
            <div className="p-3 border rounded-md bg-muted/10 space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-2">Match Quality</h4>
                <div className="flex gap-2">
                  <Button
                    variant={matchFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMatchFilter("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={matchFilter === "high" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMatchFilter("high")}
                  >
                    High (90%+)
                  </Button>
                  <Button
                    variant={matchFilter === "medium" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMatchFilter("medium")}
                  >
                    Medium (80-89%)
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Candidates List */}
        <div className="space-y-2 mt-4">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-muted transition-colors",
                  candidate.id === selectedCandidateId ? "bg-muted" : "",
                )}
                onClick={() => onSelectCandidate(candidate)}
              >
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium",
                    candidate.color,
                  )}
                >
                  {candidate.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{candidate.name}</p>
                    {candidate.aiMatch && (
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-blue-500" />
                        {candidate.matchScore}%
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{candidate.position}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">
                      {candidate.source}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {candidate.location}
                    </p>
                  </div>
                </div>
                {stageFilter === "sourced" ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToLeads(candidate.id);
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => moveToStage(candidate.id, "contacted")}>
                        Move to Contacted
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => moveToStage(candidate.id, "screening")}>
                        Move to Screening
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => moveToStage(candidate.id, "interview")}>
                        Move to Interview
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No candidates found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}