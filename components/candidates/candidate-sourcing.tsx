import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
    Briefcase,
    CheckCircle,
    Database,
    Github,
    Globe,
    GraduationCap,
    Linkedin,
    MapPin,
    RefreshCw,
    Search,
    Star,
    Upload
} from "lucide-react";
import React, { useState } from 'react';

// Sample expert-written search queries
const searchExamples = [
  "Sales Engineer with 5+ years of experience in technical sales and solution architecture",
  "Customer Success Manager with SaaS experience and fluent in Spanish",
  "Product manager with experience in B2B software and a background in UX design",
  "Full stack developer proficient in React and Node.js with 3+ years of experience",
  "Marketing professional with content creation experience and SEO knowledge"
];

// Sample sourced candidates data
const sourcedCandidatesData = [
  {
    id: "s1",
    name: "Thomas Wright",
    position: "Technical Sales Engineer",
    company: "TechSolutions Inc.",
    experience: "7 years",
    location: "Chicago, USA",
    education: "BS in Computer Science, University of Illinois",
    skills: ["Technical Sales", "Solution Architecture", "Product Demos", "CRM", "B2B"],
    source: "LinkedIn",
    profileLink: "https://linkedin.com/in/thomaswright",
    matchScore: 94,
    lastActive: "2 weeks ago"
  },
  {
    id: "s2",
    name: "Emma Johnson",
    position: "Solutions Engineer",
    company: "CloudTech Systems",
    experience: "5 years",
    location: "Boston, USA",
    education: "MS in Computer Science, MIT",
    skills: ["Technical Sales", "Cloud Solutions", "API Integration", "Customer Success", "B2B SaaS"],
    source: "GitHub",
    profileLink: "https://github.com/emmajohnson",
    matchScore: 91,
    lastActive: "3 days ago"
  },
  {
    id: "s3",
    name: "Michael Patel",
    position: "Sales Engineer",
    company: "SoftwareInc",
    experience: "6 years",
    location: "Austin, USA",
    education: "BS in Software Engineering, UT Austin",
    skills: ["Solution Architecture", "Technical Sales", "Product Knowledge", "Customer Relations", "Enterprise Sales"],
    source: "LinkedIn",
    profileLink: "https://linkedin.com/in/michaelpatel",
    matchScore: 89,
    lastActive: "1 week ago"
  },
  {
    id: "s4",
    name: "Sarah Miller",
    position: "Technical Account Manager",
    company: "TechPlatform Co.",
    experience: "4 years",
    location: "Denver, USA",
    education: "BS in Business Administration, University of Colorado",
    skills: ["Account Management", "Technical Support", "Solution Selling", "Customer Success", "CRM"],
    source: "Online Resume",
    profileLink: "#",
    matchScore: 87,
    lastActive: "5 days ago"
  },
  {
    id: "s5",
    name: "David Chen",
    position: "Solutions Consultant",
    company: "EnterpriseApp",
    experience: "8 years",
    location: "San Francisco, USA",
    education: "MS in Information Systems, UC Berkeley",
    skills: ["Enterprise Solutions", "Technical Consulting", "Solution Architecture", "Sales Engineering", "B2B"],
    source: "LinkedIn",
    profileLink: "https://linkedin.com/in/davidchen",
    matchScore: 85,
    lastActive: "2 days ago"
  },
  {
    id: "s6",
    name: "Jennifer Lopez",
    position: "Pre-Sales Engineer",
    company: "DataTech",
    experience: "3 years",
    location: "Miami, USA",
    education: "BS in Computer Engineering, University of Miami",
    skills: ["Technical Demos", "Product Knowledge", "Customer Communication", "Solution Design", "Data Analytics"],
    source: "GitHub",
    profileLink: "https://github.com/jenniferlopez",
    matchScore: 83,
    lastActive: "1 day ago"
  }
];

export default function CandidateSourcing({ onSourceCandidate }) {
  const [activeTab, setActiveTab] = useState("search");
  const [searchText, setSearchText] = useState("");
  const [uploadedResume, setUploadedResume] = useState(null);
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const { toast } = useToast();

  // For the job description tab
  const [jobTitle, setJobTitle] = useState("Sales Engineer");
  const [jobDescription, setJobDescription] = useState(
    "We are looking for an experienced Sales Engineer to join our team. The ideal candidate will have strong technical knowledge and excellent communication skills to help customers understand our complex software solutions."
  );

  // For the resume upload tab
  const handleResumeUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedResume(e.target.files[0]);
      toast({
        title: "Resume uploaded",
        description: `${e.target.files[0].name} has been uploaded.`
      });
    }
  };

  // Handle search action
  const handleSearch = () => {
    setIsSearching(true);

    // Simulate search delay
    setTimeout(() => {
      // In a real application, this would be an API call
      setSearchResults(sourcedCandidatesData);
      setIsSearching(false);
    }, 1500);
  };

  // Filter results based on source and experience level
  const filteredResults = searchResults.filter(candidate => {
    if (selectedSource !== "all" && candidate.source.toLowerCase() !== selectedSource.toLowerCase()) {
      return false;
    }

    if (selectedExperienceLevel === "junior" && parseInt(candidate.experience) > 3) {
      return false;
    } else if (selectedExperienceLevel === "mid" && (parseInt(candidate.experience) < 3 || parseInt(candidate.experience) > 6)) {
      return false;
    } else if (selectedExperienceLevel === "senior" && parseInt(candidate.experience) < 6) {
      return false;
    }

    return true;
  });

  // Toggle candidate selection
  const toggleCandidateSelection = (candidateId) => {
    setSelectedCandidates(prevSelected => {
      if (prevSelected.includes(candidateId)) {
        return prevSelected.filter(id => id !== candidateId);
      } else {
        return [...prevSelected, candidateId];
      }
    });
  };

  // Source selected candidates
  const sourceCandidates = () => {
    if (selectedCandidates.length === 0) {
      toast({
        title: "No candidates selected",
        description: "Please select at least one candidate to source.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would add the candidates to your database
    toast({
      title: "Candidates sourced",
      description: `${selectedCandidates.length} candidate(s) added to your leads.`
    });

    // Call the parent component callback if provided
    if (onSourceCandidate) {
      const sourcedCandidates = searchResults.filter(c => selectedCandidates.includes(c.id));
      sourcedCandidates.forEach(candidate => onSourceCandidate(candidate));
    }

    // Reset selections
    setSelectedCandidates([]);
  };

  // Use search examples
  const useSearchExample = (example) => {
    setSearchText(example);
  };

  // Get source icon
  const getSourceIcon = (source) => {
    switch (source.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="h-4 w-4 text-blue-600" />;
      case 'github':
        return <Github className="h-4 w-4 text-gray-800" />;
      default:
        return <Globe className="h-4 w-4 text-green-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="search">Natural Language Search</TabsTrigger>
          <TabsTrigger value="job">Job Description</TabsTrigger>
          <TabsTrigger value="resume">Similar Resume</TabsTrigger>
        </TabsList>

        {/* Natural Language Search Tab */}
        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Search for Candidates</CardTitle>
              <CardDescription>
                Describe the ideal candidate you're looking for in natural language
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    placeholder="E.g., Sales Engineer with 5+ years of experience in technical sales and solution architecture"
                    className="pl-10 min-h-[100px]"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
                <Button
                  className="self-start"
                  onClick={handleSearch}
                  disabled={!searchText.trim() || isSearching}
                >
                  {isSearching ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Searching
                    </>
                  ) : (
                    'Search'
                  )}
                </Button>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Try one of these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {searchExamples.map((example, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => useSearchExample(example)}
                    >
                      {example.substring(0, 30)}...
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search Results Section */}
          {searchResults.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Search Results</CardTitle>
                  <div className="flex gap-2">
                    <Select value={selectedSource} onValueChange={setSelectedSource}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Experience</SelectItem>
                        <SelectItem value="junior">Junior (0-3 years)</SelectItem>
                        <SelectItem value="mid">Mid-Level (3-6 years)</SelectItem>
                        <SelectItem value="senior">Senior (6+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <CardDescription>
                  {filteredResults.length} candidates found matching your search
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredResults.map(candidate => (
                  <Card key={candidate.id} className="border hover:border-primary/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex gap-4 items-start">
                        <Checkbox
                          id={`select-${candidate.id}`}
                          checked={selectedCandidates.includes(candidate.id)}
                          onCheckedChange={() => toggleCandidateSelection(candidate.id)}
                          className="mt-1"
                        />

                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">{candidate.name}</h3>
                              <p className="text-sm text-muted-foreground">{candidate.position} at {candidate.company}</p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center gap-1">
                              <Star className="h-3 w-3 fill-blue-500" />
                              {candidate.matchScore}% Match
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-3.5 w-3.5" />
                              {candidate.experience} experience
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {candidate.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <GraduationCap className="h-3.5 w-3.5" />
                              {candidate.education}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 pt-1">
                            {candidate.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex justify-between items-center pt-1">
                            <div className="flex items-center gap-1">
                              {getSourceIcon(candidate.source)}
                              <span className="text-xs">{candidate.source}</span>
                              <span className="text-xs text-muted-foreground"> • Last active {candidate.lastActive}</span>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8"
                              asChild
                            >
                              <a href={candidate.profileLink} target="_blank" rel="noopener noreferrer">
                                View Profile
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <div className="text-sm text-muted-foreground">
                  {selectedCandidates.length} candidates selected
                </div>
                <Button onClick={sourceCandidates} disabled={selectedCandidates.length === 0}>
                  <Database className="mr-2 h-4 w-4" />
                  Add to Leads
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        {/* Job Description Tab */}
        <TabsContent value="job" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Find Candidates Using Job Description</CardTitle>
              <CardDescription>
                Enter your job description to find candidates with matching skills and experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Title</label>
                <Input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Sales Engineer"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Job Description</label>
                <Textarea
                  placeholder="Enter the full job description..."
                  className="min-h-[200px]"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Our AI will analyze your job description to find the best candidates
                </div>
                <Button onClick={handleSearch}>
                  <Search className="mr-2 h-4 w-4" />
                  Find Candidates
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Similar Resume Tab */}
        <TabsContent value="resume" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Find Similar Candidates</CardTitle>
              <CardDescription>
                Upload a resume of your ideal candidate to find similar profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/30 transition-colors">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Upload Resume</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Drag and drop a resume, or click to browse
                </p>
                <Input
                  type="file"
                  className="hidden"
                  id="resume-upload"
                  onChange={handleResumeUpload}
                  accept=".pdf,.doc,.docx"
                />
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => document.getElementById('resume-upload').click()}
                >
                  Browse Files
                </Button>
              </div>

              {uploadedResume && (
                <div className="p-4 bg-muted/30 rounded-lg flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">{uploadedResume.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadedResume.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleSearch}>
                    <Search className="mr-2 h-4 w-4" />
                    Find Similar Profiles
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sourcing Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle>Sourcing Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">1</div>
              <div>
                <h4 className="font-medium">Be specific in your search</h4>
                <p className="text-sm text-muted-foreground">Include specific skills, years of experience, and industry knowledge to find the most relevant candidates.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">2</div>
              <div>
                <h4 className="font-medium">Review candidate profiles</h4>
                <p className="text-sm text-muted-foreground">Look beyond the match score and review the candidate's full profile before adding them to your leads.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">3</div>
              <div>
                <h4 className="font-medium">Personalize your outreach</h4>
                <p className="text-sm text-muted-foreground">Once you've added candidates to your leads, send them personalized messages referencing their specific skills and experience.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}