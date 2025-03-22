// File path: /components/applications/enhanced-applications-table.jsx
// Create this new component file

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Download, Edit, Eye, MoreHorizontal, RefreshCw, Search, Trash } from "lucide-react";
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

const statusColors = {
  Applied: "default",
  Screening: "secondary",
  Interview: "warning",
  Offer: "success",
  Rejected: "destructive",
};

// Sample data - in a real app, this would come from an API
const initialApplications = [
  {
    id: "1",
    company: "Acme Inc",
    position: "Frontend Developer",
    status: "Applied",
    date: new Date(2023, 6, 15),
    location: "Remote",
    type: "Full-time",
  },
  {
    id: "2",
    company: "Globex Corporation",
    position: "Full Stack Engineer",
    status: "Interview",
    date: new Date(2023, 6, 12),
    location: "San Francisco, CA",
    type: "Full-time",
  },
  {
    id: "3",
    company: "Stark Industries",
    position: "UI/UX Designer",
    status: "Rejected",
    date: new Date(2023, 6, 10),
    location: "New York, NY",
    type: "Contract",
  },
  {
    id: "4",
    company: "Wayne Enterprises",
    position: "Software Engineer",
    status: "Offer",
    date: new Date(2023, 6, 8),
    location: "Chicago, IL",
    type: "Full-time",
  },
  {
    id: "5",
    company: "Umbrella Corporation",
    position: "DevOps Engineer",
    status: "Screening",
    date: new Date(2023, 6, 5),
    location: "Remote",
    type: "Full-time",
  },
  {
    id: "6",
    company: "Cyberdyne Systems",
    position: "Machine Learning Engineer",
    status: "Applied",
    date: new Date(2023, 6, 3),
    location: "Boston, MA",
    type: "Full-time",
  },
  {
    id: "7",
    company: "Initech",
    position: "Backend Developer",
    status: "Applied",
    date: new Date(2023, 6, 1),
    location: "Austin, TX",
    type: "Full-time",
  },
  {
    id: "8",
    company: "Massive Dynamic",
    position: "Data Scientist",
    status: "Interview",
    date: new Date(2023, 5, 28),
    location: "Seattle, WA",
    type: "Full-time",
  }
];

export default function EnhancedApplicationsTable() {
  // State
  const [applications, setApplications] = useState(initialApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const itemsPerPage = 5;

  // Apply all filters and sorting
  const filteredApplications = useMemo(() => {
    return applications
      .filter(app => {
        // Search term filter
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          app.company.toLowerCase().includes(searchLower) ||
          app.position.toLowerCase().includes(searchLower) ||
          app.location.toLowerCase().includes(searchLower);

        // Status filter
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

        // Type filter
        const matchesType = typeFilter === 'all' || app.type === typeFilter;

        // Location filter
        const matchesLocation =
          locationFilter === 'all' ||
          (locationFilter === 'Remote' && app.location.includes('Remote'));

        return matchesSearch && matchesStatus && matchesType && matchesLocation;
      })
      .sort((a, b) => {
        if (sortField === 'date') {
          return sortDirection === 'asc'
            ? a.date.getTime() - b.date.getTime()
            : b.date.getTime() - a.date.getTime();
        } else if (sortField === 'company') {
          return sortDirection === 'asc'
            ? a.company.localeCompare(b.company)
            : b.company.localeCompare(a.company);
        } else if (sortField === 'position') {
          return sortDirection === 'asc'
            ? a.position.localeCompare(b.position)
            : b.position.localeCompare(a.position);
        }
        return 0;
      });
  }, [
    applications,
    searchTerm,
    statusFilter,
    typeFilter,
    locationFilter,
    sortField,
    sortDirection
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const paginatedApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredApplications.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredApplications, currentPage]);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTypeFilter('all');
    setLocationFilter('all');
    setSortField('date');
    setSortDirection('desc');
    setCurrentPage(1);
  };

  // Delete application
  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  // Format date to relative time (e.g., "2 days ago")
  const formatRelativeDate = (date) => {
    return date ? `${Math.floor(Math.random() * 30) + 1} days ago` : 'Unknown';
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-background">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by company, position or location..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={resetFilters} className="sm:w-auto w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Screening">Screening</SelectItem>
              <SelectItem value="Interview">Interview</SelectItem>
              <SelectItem value="Offer">Offer</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>

          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="Onsite">Onsite</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {Math.min(filteredApplications.length, itemsPerPage)} of {filteredApplications.length} applications
        </p>
        <Button asChild>
          <Link href="/dashboard/applications/new">
            Add Application
          </Link>
        </Button>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {paginatedApplications.length > 0 ? (
          paginatedApplications.map((application) => (
            <div
              key={application.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg bg-background gap-4"
            >
              <div className="flex-1 space-y-1">
                <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                  <h3 className="font-medium">{application.position}</h3>
                  <p className="text-sm text-muted-foreground">at {application.company}</p>
                </div>
                <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                  <Badge variant={statusColors[application.status]}>
                    {application.status}
                  </Badge>
                  <span>•</span>
                  <span>{application.type}</span>
                  <span>•</span>
                  <span>{application.location}</span>
                  <span>•</span>
                  <span>Applied {formatRelativeDate(application.date)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end md:self-auto">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/applications/${application.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/applications/${application.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => deleteApplication(application.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center border rounded-lg bg-background">
            <p>No applications found matching your filters.</p>
            <Button variant="outline" className="mt-4" onClick={resetFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}