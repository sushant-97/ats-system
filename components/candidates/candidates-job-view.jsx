// File path: /components/candidates/candidates-job-view.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  FileText,
  Filter,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Search,
  Star,
  User,
  UserPlus,
  Users,
  XCircle
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data for jobs
const jobsData = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    status: "Published",
    hiringManager: "Sarah Johnson",
  },
  {
    id: "2",
    title: "Product Manager",
    department: "Product",
    location: "New York, NY",
    type: "Full-time",
    status: "Published",
    hiringManager: "Michael Chen",
  },
  {
    id: "3",
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote",
    type: "Contract",
    status: "Published",
    hiringManager: "Jessica Lee",
  },
  {
    id: "4",
    title: "Sales Engineer",
    department: "Sales",
    location: "Chicago, IL",
    type: "Full-time",
    status: "Published",
    hiringManager: "David Wilson",
  }
];

// Sample candidate data - in a real app, this would come from an API
const candidatesData = {
  "1": [ // Candidates for Senior Frontend Developer
    {
      id: "101",
      name: "Mia Williams",
      position: "Frontend Developer",
      initials: "MW",
      color: "bg-amber-100",
      status: "application_review",
      stage: "new",
      matchScore: 92,
      source: "LinkedIn",
      location: "Austin, TX",
      experience: "5 years",
      education: "BS Computer Science, UT Austin",
      skills: ["React", "TypeScript", "CSS", "Jest", "GraphQL"],
      email: "mia.williams@example.com",
      phone: "(555) 123-4567",
      lastActivity: "Application received",
      lastActivityDate: "2 days ago",
      resume: true,
      coverLetter: true
    },
    {
      id: "102",
      name: "James Chen",
      position: "Senior UI Developer",
      initials: "JC",
      color: "bg-blue-100",
      status: "application_review",
      stage: "screening",
      matchScore: 88,
      source: "Indeed",
      location: "Seattle, WA",
      experience: "7 years",
      education: "MS Computer Science, University of Washington",
      skills: ["JavaScript", "React", "Vue", "TailwindCSS", "Webpack"],
      email: "james.chen@example.com",
      phone: "(555) 987-6543",
      lastActivity: "Scheduled phone screening",
      lastActivityDate: "1 day ago",
      resume: true,
      coverLetter: false
    },
    {
      id: "103",
      name: "Emily Foster",
      position: "React Developer",
      initials: "EF",
      color: "bg-purple-100",
      status: "interview",
      stage: "technical_interview",
      matchScore: 95,
      source: "Referral",
      location: "Remote",
      experience: "6 years",
      education: "BS Software Engineering, Boston University",
      skills: ["React", "Redux", "TypeScript", "Node.js", "AWS"],
      email: "emily.foster@example.com",
      phone: "(555) 456-7890",
      lastActivity: "Technical interview scheduled",
      lastActivityDate: "5 hours ago",
      resume: true,
      coverLetter: true
    },
    {
      id: "104",
      name: "Michael Thomas",
      position: "Frontend Lead",
      initials: "MT",
      color: "bg-green-100",
      status: "interview",
      stage: "manager_interview",
      matchScore: 90,
      source: "LinkedIn",
      location: "Denver, CO",
      experience: "8 years",
      education: "BS Computer Engineering, Colorado State",
      skills: ["React", "Angular", "JavaScript", "CSS", "Leadership"],
      email: "michael.thomas@example.com",
      phone: "(555) 789-0123",
      lastActivity: "Completed technical interview",
      lastActivityDate: "yesterday",
      resume: true,
      coverLetter: true
    },
    {
      id: "105",
      name: "Sophia Rodriguez",
      position: "UI Developer",
      initials: "SR",
      color: "bg-red-100",
      status: "offer",
      stage: "offer_extended",
      matchScore: 93,
      source: "AngelList",
      location: "Portland, OR",
      experience: "4 years",
      education: "BS Computer Science, Portland State",
      skills: ["React", "CSS", "Accessibility", "UI Design", "Performance"],
      email: "sophia.rodriguez@example.com",
      phone: "(555) 234-5678",
      lastActivity: "Offer sent",
      lastActivityDate: "1 day ago",
      resume: true,
      coverLetter: true
    }
  ],
  "4": [ // Candidates for Sales Engineer
    {
      id: "401",
      name: "Thomas Wright",
      position: "Technical Sales Engineer",
      initials: "TW",
      color: "bg-orange-100",
      status: "application_review",
      stage: "new",
      matchScore: 94,
      source: "LinkedIn",
      location: "Chicago, IL",
      experience: "7 years",
      education: "BS Computer Science, University of Illinois",
      skills: ["Technical Sales", "Solution Architecture", "Product Demos", "CRM", "B2B"],
      email: "thomas.wright@example.com",
      phone: "(555) 111-2222",
      lastActivity: "Added to leads",
      lastActivityDate: "2 days ago",
      resume: true,
      coverLetter: true
    },
    {
      id: "402",
      name: "Emma Johnson",
      position: "Solutions Engineer",
      initials: "EJ",
      color: "bg-red-100",
      status: "application_review",
      stage: "screening",
      matchScore: 91,
      source: "GitHub",
      location: "San Francisco, CA",
      experience: "5 years",
      education: "MS Computer Science, Stanford",
      skills: ["Technical Sales", "Cloud Solutions", "API Integration", "Customer Success", "B2B SaaS"],
      email: "emma.johnson@example.com",
      phone: "(555) 333-4444",
      lastActivity: "Scheduled screening call",
      lastActivityDate: "1 day ago",
      resume: true,
      coverLetter: false
    },
    {
      id: "403",
      name: "Michael Patel",
      position: "Sales Engineer",
      initials: "MP",
      color: "bg-teal-100",
      status: "interview",
      stage: "technical_interview",
      matchScore: 89,
      source: "LinkedIn",
      location: "Austin, TX",
      experience: "6 years",
      education: "BS Software Engineering, UT Austin",
      skills: ["Solution Architecture", "Technical Sales", "Product Knowledge", "Customer Relations", "Enterprise Sales"],
      email: "michael.patel@example.com",
      phone: "(555) 555-6666",
      lastActivity: "Technical interview scheduled",
      lastActivityDate: "3 hours ago",
      resume: true,
      coverLetter: true
    },
    {
      id: "404",
      name: "Sarah Miller",
      position: "Technical Account Manager",
      initials: "SM",
      color: "bg-purple-100",
      status: "rejected",
      stage: "rejected",
      matchScore: 75,
      source: "Indeed",
      location: "Remote",
      experience: "4 years",
      education: "BS Business Administration, University of Colorado",
      skills: ["Account Management", "Technical Support", "Solution Selling", "Customer Success", "CRM"],
      email: "sarah.miller@example.com",
      phone: "(555) 777-8888",
      lastActivity: "Rejected - not enough technical experience",
      lastActivityDate: "1 week ago",
      resume: true,
      coverLetter: true
    }
  ],
  "2": [ // Product Manager
    {
      id: "201",
      name: "David Garcia",
      position: "Senior Product Manager",
      initials: "DG",
      color: "bg-green-100",
      status: "application_review",
      stage: "new",
      matchScore: 88,
      source: "LinkedIn",
      location: "Boston, MA",
      experience: "8 years",
      education: "MBA, Harvard University",
      skills: ["Product Strategy", "Agile", "User Research", "Data Analysis", "Roadmapping"],
      email: "david.garcia@example.com",
      phone: "(555) 123-7890",
      lastActivity: "Application received",
      lastActivityDate: "3 days ago",
      resume: true,
      coverLetter: true
    },
    {
      id: "202",
      name: "Jennifer Lopez",
      position: "Product Manager",
      initials: "JL",
      color: "bg-pink-100",
      status: "interview",
      stage: "manager_interview",
      matchScore: 92,
      source: "Referral",
      location: "New York, NY",
      experience: "6 years",
      education: "MBA, Columbia University",
      skills: ["Product Development", "User Testing", "Market Research", "Cross-functional Leadership", "Product Design"],
      email: "jennifer.lopez@example.com",
      phone: "(555) 456-3214",
      lastActivity: "Manager interview scheduled",
      lastActivityDate: "yesterday",
      resume: true,
      coverLetter: true
    }
  ],
  "3": [ // UX/UI Designer
    {
      id: "301",
      name: "Alex Rivera",
      position: "Senior UX Designer",
      initials: "AR",
      color: "bg-indigo-100",
      status: "application_review",
      stage: "screening",
      matchScore: 90,
      source: "Dribbble",
      location: "Los Angeles, CA",
      experience: "7 years",
      education: "BFA Design, RISD",
      skills: ["User Research", "Wireframing", "Prototyping", "Figma", "Design Systems"],
      email: "alex.rivera@example.com",
      phone: "(555) 987-1234",
      lastActivity: "Portfolio review",
      lastActivityDate: "yesterday",
      resume: true,
      coverLetter: false
    }
  ]
};

// Define stage mapping for display
const stageLabels = {
  new: "New",
  screening: "Screening",
  technical_interview: "Technical Interview",
  manager_interview: "Manager Interview",
  offer_extended: "Offer Extended",
  offer_accepted: "Offer Accepted",
  rejected: "Rejected"
};

// Define status groups for filtering
const statusGroups = {
  application_review: ["new", "screening"],
  interview: ["technical_interview", "manager_interview"],
  offer: ["offer_extended", "offer_accepted"],
  rejected: ["rejected"]
};

export default function EnhancedCandidatesView() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('job');

  const [selectedJob, setSelectedJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterSource, setFilterSource] = useState("all");
  const [filterMatch, setFilterMatch] = useState("all");

  useEffect(() => {
    // If jobId is provided, find the corresponding job
    if (jobId && jobsData.find(job => job.id === jobId)) {
      setSelectedJob(jobsData.find(job => job.id === jobId));
      setCandidates(candidatesData[jobId] || []);
    }
  }, [jobId]);

  const handleSelectCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleBackToJobs = () => {
    // Reset state and navigate back
    setSelectedJob(null);
    setCandidates([]);
    setSelectedCandidate(null);
  };

  // Filter candidates based on current filters and search
  const filteredCandidates = candidates.filter(candidate => {
    // Filter by tab (status)
    if (activeTab !== "all" && !statusGroups[activeTab].includes(candidate.stage)) {
      return false;
    }

    // Filter by search term
    if (searchTerm && !candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !candidate.position.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Filter by source
    if (filterSource !== "all" && candidate.source.toLowerCase() !== filterSource.toLowerCase()) {
      return false;
    }

    // Filter by match score
    if (filterMatch === "high" && candidate.matchScore < 90) return false;
    if (filterMatch === "medium" && (candidate.matchScore < 80 || candidate.matchScore >= 90)) return false;
    if (filterMatch === "low" && candidate.matchScore >= 80) return false;

    return true;
  });

  // Group candidates by stage for pipeline view
  const candidatesByStage = {};
  candidates.forEach(candidate => {
    if (!candidatesByStage[candidate.stage]) {
      candidatesByStage[candidate.stage] = [];
    }
    candidatesByStage[candidate.stage].push(candidate);
  });

  // If no job is selected, show job selection view
  if (!selectedJob) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Select Job</h1>
          <p className="text-muted-foreground">Choose a job to view its candidates</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobsData.map(job => (
            <Card
              key={job.id}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => {
                setSelectedJob(job);
                setCandidates(candidatesData[job.id] || []);
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.department}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{job.location}</span>
                    </div>
                    <div className="mt-4">
                      <Badge variant="outline">
                        {(candidatesData[job.id] || []).length} Candidates
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with job details */}
      <div className="flex flex-col gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-fit flex items-center gap-1"
          onClick={handleBackToJobs}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Jobs</span>
        </Button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              {selectedJob.title}
              <Badge>{selectedJob.status}</Badge>
            </h1>
            <p className="text-muted-foreground">
              {selectedJob.department} • {selectedJob.type} • {selectedJob.location}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/jobs/${selectedJob.id}`}>
                <Briefcase className="mr-2 h-4 w-4" />
                View Job
              </Link>
            </Button>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Candidate
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>Hiring Manager: {selectedJob.hiringManager}</span>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">
              All Candidates ({candidates.length})
            </TabsTrigger>
            <TabsTrigger value="application_review">
              Review ({candidates.filter(c => statusGroups.application_review.includes(c.stage)).length})
            </TabsTrigger>
            <TabsTrigger value="interview">
              Interview ({candidates.filter(c => statusGroups.interview.includes(c.stage)).length})
            </TabsTrigger>
            <TabsTrigger value="offer">
              Offer ({candidates.filter(c => statusGroups.offer.includes(c.stage)).length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({candidates.filter(c => statusGroups.rejected.includes(c.stage)).length})
            </TabsTrigger>
          </TabsList>

          <Select defaultValue="stage" className="w-[180px]">
            <SelectTrigger>
              <SelectValue placeholder="View Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stage">Group by Stage</SelectItem>
              <SelectItem value="list">List View</SelectItem>
              <SelectItem value="cards">Card View</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-4">
          {/* Search and filters */}
          <div className="flex justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search candidates..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {showFilters && (
            <Card className="p-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium">Source</label>
                  <Select
                    value={filterSource}
                    onValueChange={setFilterSource}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="github">GitHub</SelectItem>
                      <SelectItem value="indeed">Indeed</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="dribbble">Dribbble</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Match Score</label>
                  <Select
                    value={filterMatch}
                    onValueChange={setFilterMatch}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by match" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Scores</SelectItem>
                      <SelectItem value="high">High Match (90%+)</SelectItem>
                      <SelectItem value="medium">Medium Match (80-89%)</SelectItem>
                      <SelectItem value="low">Low Match (<80%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setFilterSource("all");
                      setFilterMatch("all");
                      setSearchTerm("");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <TabsContent value="all" className="mt-0">
            {/* Main content - Candidates Pipeline View (default) */}
            <div className="mt-6">
              {selectedCandidate ? (
                <CandidateDetails
                  candidate={selectedCandidate}
                  onBack={() => setSelectedCandidate(null)}
                />
              ) : (
                <div className="flex gap-4 overflow-x-auto pb-4 min-h-[500px]">
                  {Object.entries(stageLabels).map(([stageKey, stageLabel]) => (
                    <div key={stageKey} className="min-w-[280px] w-[280px] space-y-2">
                      <div className="bg-muted rounded-md p-2 flex justify-between items-center sticky top-0">
                        <h3 className="font-medium">{stageLabel}</h3>
                        <Badge variant="outline">
                          {(candidatesByStage[stageKey] || []).length}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        {candidatesByStage[stageKey]?.filter(c => {
                          // Apply search filter
                          if (searchTerm && !c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                              !c.position.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return false;
                          }
                          // Apply source filter
                          if (filterSource !== "all" && c.source.toLowerCase() !== filterSource.toLowerCase()) {
                            return false;
                          }
                          // Apply match filter
                          if (filterMatch === "high" && c.matchScore < 90) return false;
                          if (filterMatch === "medium" && (c.matchScore < 80 || c.matchScore >= 90)) return false;
                          if (filterMatch === "low" && c.matchScore >= 80) return false;

                          return true;
                        }).map(candidate => (
                          <CandidateCard
                            key={candidate.id}
                            candidate={candidate}
                            onClick={() => handleSelectCandidate(candidate)}
                          />
                        ))}

                        {(!candidatesByStage[stageKey] || candidatesByStage[stageKey].length === 0) && (
                          <div className="p-4 text-center border border-dashed rounded-md text-muted-foreground text-sm">
                            No candidates in this stage
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="application_review" className="mt-0">
            {filteredCandidates.length > 0 ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCandidates.map(candidate => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onClick={() => handleSelectCandidate(candidate)}
                    expanded
                  />
                ))}
              </div>
            ) : (
              <div className="mt-6 p-8 text-center border rounded-md">
                <p className="text-muted-foreground">No candidates matching your filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="interview" className="mt-0">
            {filteredCandidates.length > 0 ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCandidates.map(candidate => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onClick={() => handleSelectCandidate(candidate)}
                    expanded
                  />
                ))}
              </div>
            ) : (
              <div className="mt-6 p-8 text-center border rounded-md">
                <p className="text-muted-foreground">No candidates matching your filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="offer" className="mt-0">
            {filteredCandidates.length > 0 ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCandidates.map(candidate => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onClick={() => handleSelectCandidate(candidate)}
                    expanded
                  />
                ))}
              </div>
            ) : (
              <div className="mt-6 p-8 text-center border rounded-md">
                <p className="text-muted-foreground">No candidates matching your filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="mt-0">
            {filteredCandidates.length > 0 ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCandidates.map(candidate => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onClick={() => handleSelectCandidate(candidate)}
                    expanded
                  />
                ))}
              </div>
            ) : (
              <div className="mt-6 p-8 text-center border rounded-md">
                <p className="text-muted-foreground">No candidates matching your filters</p>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

// Component for individual candidate cards
function CandidateCard({ candidate, onClick, expanded = false }) {
  return (
    <Card
      className="overflow-hidden cursor-pointer hover:border-primary transition-colors"
      onClick={onClick}
    >
      <CardContent className={expanded ? "p-4" : "p-3"}>
        <div className="flex gap-3">
          <Avatar className={`h-10 w-10 ${candidate.color}`}>
            <AvatarFallback>{candidate.initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{candidate.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{candidate.position}</p>
              </div>

              <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                <Star className="h-3 w-3 fill-blue-500" />
                {candidate.matchScore}%
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {candidate.location}
              </Badge>
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                {candidate.experience}
              </Badge>
            </div>

            {expanded && (
              <>
                <div className="flex flex-wrap gap-1 mt-3">
                  {candidate.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {candidate.skills.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{candidate.skills.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" />
                  {candidate.lastActivity}
                  <span>•</span>
                  <span>{candidate.lastActivityDate}</span>
                </div>
              </>
            )}
          </div>

          {!expanded && (
            <div className="self-center">
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Component for detailed candidate view
function CandidateDetails({ candidate, onBack }) {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Candidates</span>
      </Button>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <Avatar className={`h-20 w-20 ${candidate.color}`}>
              <AvatarFallback className="text-2xl">{candidate.initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h2 className="text-2xl font-bold">{candidate.name}</h2>
                    <p className="text-lg text-muted-foreground">{candidate.position}</p>
                  </div>

                  <Badge className="w-fit bg-blue-100 text-blue-800 flex items-center gap-1 px-3 py-1">
                    <Star className="h-4 w-4 fill-blue-500" />
                    {candidate.matchScore}% Match
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {candidate.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    {candidate.experience}
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {candidate.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {candidate.phone}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Interview
                </Button>
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <MoreHorizontal className="mr-2 h-4 w-4" />
                      More Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      View Resume
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Move to Next Stage
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject Candidate
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Candidate Summary</h3>
                <p className="text-muted-foreground">
                  {candidate.name} is a {candidate.position} with {candidate.experience} of relevant experience.
                  They have a strong background in {candidate.skills.slice(0, 3).join(", ")} and other technical skills.
                  Based on their profile and experience, they have a {candidate.matchScore}% match with the job requirements.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Education</h3>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{candidate.education}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Application Stage</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-1/4 md:w-1/6 text-sm font-medium">Current Stage:</div>
                    <Badge variant="outline" className="font-medium">
                      {stageLabels[candidate.stage]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-1/4 md:w-1/6 text-sm font-medium">Last Activity:</div>
                    <div className="text-sm text-muted-foreground">
                      {candidate.lastActivity} ({candidate.lastActivityDate})
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-1/4 md:w-1/6 text-sm font-medium">Source:</div>
                    <div className="text-sm">{candidate.source}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Available Documents</h3>
                <div className="flex flex-wrap gap-3">
                  {candidate.resume && (
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      View Resume
                    </Button>
                  )}
                  {candidate.coverLetter && (
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      View Cover Letter
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <div className="space-