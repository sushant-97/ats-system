// File path: /components/job-search.jsx
// Optimized JobSearch component
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
    BookmarkPlus, Briefcase, Building, Clock, DollarSign, ExternalLink,
    Filter, MapPin, Search as SearchIcon, Star, StarHalf, Trash
} from "lucide-react";
import { useEffect, useState } from 'react';

// Mock job data - reduced for brevity
const initialJobs = [
  {
    id: "1", title: "Senior Frontend Developer", company: "Acme Technology",
    location: "Remote", type: "Full-time", salary: "$120,000 - $150,000", posted: "3 days ago",
    description: "We're seeking a Senior Frontend Developer proficient in React, TypeScript, and modern frontend development practices...",
    requirements: ["5+ years of frontend development experience", "Expert knowledge of React"],
    rating: 4.8, reviews: 128, logo: "/placeholder.svg"
  },
  {
    id: "2", title: "Full Stack Engineer", company: "Globex Corporation",
    location: "San Francisco, CA", type: "Full-time", salary: "$130,000 - $160,000", posted: "1 week ago",
    description: "Join our dynamic team as a Full Stack Engineer, working across our entire tech stack...",
    requirements: ["3+ years of full stack development experience", "Proficiency in React and Node.js"],
    rating: 4.2, reviews: 85, logo: "/placeholder.svg"
  }
];

// Sample expert-written search queries
const searchExamples = [
  "Sales Engineer with 5+ years of experience in technical sales and solution architecture",
  "Product manager with experience in B2B software and a background in UX design",
];

export default function JobSearch() {
  // State for search filters
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("all");
  const [salaryRange, setSalaryRange] = useState([50, 200]);
  const [experienceLevel, setExperienceLevel] = useState("all");
  const [jobs, setJobs] = useState(initialJobs);
  const [filteredJobs, setFilteredJobs] = useState(initialJobs);
  const [savedJobs, setSavedJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Filter jobs on changes
  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    const timeout = setTimeout(() => {
      const filtered = jobs.filter(job => {
        // Keyword filter
        const matchesKeyword = keyword === "" ||
          job.title.toLowerCase().includes(keyword.toLowerCase()) ||
          job.company.toLowerCase().includes(keyword.toLowerCase()) ||
          job.description.toLowerCase().includes(keyword.toLowerCase());

        // Location filter
        const matchesLocation = location === "" ||
          job.location.toLowerCase().includes(location.toLowerCase());

        // Job type filter
        const matchesType = jobType === "all" || job.type === jobType;

        // Salary filter (simplified for demo)
        const jobSalaryLower = parseInt(job.salary.replace(/\\D/g, '')) / 1000;
        const matchesSalary = jobSalaryLower >= salaryRange[0] && jobSalaryLower <= salaryRange[1];

        // Experience level filter (simplified)
        let matchesExperience = true;
        if (experienceLevel !== "all") {
          const reqs = job.requirements.join(" ").toLowerCase();
          if (experienceLevel === "entry") {
            matchesExperience = !reqs.includes("5+") && !reqs.includes("senior");
          } else if (experienceLevel === "mid") {
            matchesExperience = reqs.includes("3+") || reqs.includes("2+");
          } else if (experienceLevel === "senior") {
            matchesExperience = reqs.includes("5+") || reqs.includes("senior");
          }
        }

        return matchesKeyword && matchesLocation && matchesType && matchesSalary && matchesExperience;
      });

      setFilteredJobs(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [keyword, location, jobType, salaryRange, experienceLevel, jobs]);

  // Toggle save job
  const saveJob = (jobId) => {
    setSavedJobs(savedJobs.includes(jobId)
      ? savedJobs.filter(id => id !== jobId)
      : [...savedJobs, jobId]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setKeyword("");
    setLocation("");
    setJobType("all");
    setSalaryRange([50, 200]);
    setExperienceLevel("all");
  };

  // Format salary range for display
  const formatSalaryRange = (range) => `$${range[0]}K - $${range[1]}K`;

  // Render search bar
  const renderSearchBar = () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Job title, keywords, or company"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Location or Remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button className="sm:w-auto w-full" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="p-4 border rounded-md bg-background space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="job-type">Job Type</Label>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger id="job-type">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level</Label>
              <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                <SelectTrigger id="experience">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Salary Range (K)</Label>
              <span className="text-sm font-medium">{formatSalaryRange(salaryRange)}</span>
            </div>
            <Slider
              value={salaryRange}
              min={30}
              max={250}
              step={5}
              onValueChange={setSalaryRange}
              className="py-4"
            />
          </div>

          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <Trash className="mr-2 h-3 w-3" />
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  // Render job card
  const renderJobCard = (job) => (
    <Card key={job.id} className={`overflow-hidden cursor-pointer transition-all hover:border-primary/50 ${
      selectedJob?.id === job.id ? 'border-primary' : ''
    }`} onClick={() => setSelectedJob(job)}>
      <CardContent className="p-5">
        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-md border bg-muted flex items-center justify-center shrink-0">
            <Building className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex-1 space-y-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-medium text-base leading-tight">{job.title}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  saveJob(job.id);
                }}
              >
                <BookmarkPlus className={`h-5 w-5 ${
                  savedJobs.includes(job.id) ? 'fill-primary text-primary' : 'text-muted-foreground'
                }`} />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground truncate">{job.company}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Badge variant="secondary" className="flex gap-1 items-center">
                <MapPin className="h-3 w-3" />
                {job.location}
              </Badge>
              <Badge variant="secondary" className="flex gap-1 items-center">
                <Briefcase className="h-3 w-3" />
                {job.type}
              </Badge>
              <Badge variant="secondary" className="flex gap-1 items-center">
                <DollarSign className="h-3 w-3" />
                {job.salary}
              </Badge>
            </div>
            <div className="flex justify-between items-center pt-2 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Posted {job.posted}
              </div>
              <div className="flex items-center">
                {job.rating >= 4.5 ? (
                  <Star className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
                ) : (
                  <StarHalf className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
                )}
                {job.rating} ({job.reviews} reviews)
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Render job details
  const renderJobDetails = () => selectedJob && (
    <Card className="md:col-span-3">
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">{selectedJob.title}</h2>
            <p className="text-muted-foreground">{selectedJob.company} • {selectedJob.location}</p>
          </div>
          <Button
            variant={savedJobs.includes(selectedJob.id) ? "default" : "outline"}
            onClick={() => saveJob(selectedJob.id)}
          >
            <BookmarkPlus className="mr-2 h-4 w-4" />
            {savedJobs.includes(selectedJob.id) ? "Saved" : "Save Job"}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex gap-1 items-center">
            <Briefcase className="h-3 w-3" />
            {selectedJob.type}
          </Badge>
          <Badge variant="secondary" className="flex gap-1 items-center">
            <DollarSign className="h-3 w-3" />
            {selectedJob.salary}
          </Badge>
          <Badge variant="secondary" className="flex gap-1 items-center">
            <Clock className="h-3 w-3" />
            Posted {selectedJob.posted}
          </Badge>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Job Description</h3>
          <p className="text-sm text-muted-foreground">{selectedJob.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Requirements</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            {selectedJob.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-4">
          <Button className="sm:flex-1">Apply Now</Button>
          <Button variant="outline" className="sm:flex-1">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Original Posting
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Render saved jobs
  const renderSavedJobs = () => savedJobs.length > 0 && (
    <div className="pt-4 border-t">
      <h3 className="text-lg font-medium mb-4">Saved Jobs ({savedJobs.length})</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {jobs
          .filter(job => savedJobs.includes(job.id))
          .map(job => (
            <Card key={job.id} className="cursor-pointer hover:border-primary/50" onClick={() => setSelectedJob(job)}>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h4 className="font-medium">{job.title}</h4>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">{job.location}</Badge>
                    <Badge variant="outline" className="text-xs">{job.type}</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    saveJob(job.id);
                  }}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Remove
                </Button>
                <Button size="sm" variant="outline">View</Button>
              </CardFooter>
            </Card>
          ))
        }
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderSearchBar()}

      {/* Results Stats */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Found {filteredJobs.length} jobs matching your search
        </p>
        <Select defaultValue="relevance">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Sort by: Relevance</SelectItem>
            <SelectItem value="recent">Sort by: Most Recent</SelectItem>
            <SelectItem value="salary-high">Sort by: Salary (High to Low)</SelectItem>
            <SelectItem value="salary-low">Sort by: Salary (Low to High)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results and Job Details */}
      <div className="grid md:grid-cols-5 gap-6">
        {/* Job Listings */}
        <div className={`space-y-4 ${selectedJob ? 'md:col-span-2' : 'md:col-span-5'}`}>
          {loading ? (
            // Loading state
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded-md w-3/4 mb-4"></div>
                  <div className="h-4 bg-muted rounded-md w-1/2 mb-2"></div>
                  <div className="h-4 bg-muted rounded-md w-full mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-muted rounded-full w-20"></div>
                    <div className="h-6 bg-muted rounded-full w-20"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map(job => renderJobCard(job))
          ) : (
            <div className="p-8 text-center border rounded-lg">
              <SearchIcon className="h-10 w-10 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No jobs found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try changing your search filters or keywords
              </p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>

        {/* Job Details */}
        {selectedJob && renderJobDetails()}
      </div>

      {/* Saved Jobs Section */}
      {renderSavedJobs()}
    </div>
  );
}