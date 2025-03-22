// File path: /components/interview-scheduler.jsx
// Create this new component file

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addDays, format } from 'date-fns';
import { AlertTriangle, Building, CalendarCheck, CalendarPlus, CalendarX, Clock, MapPin, User, Video } from "lucide-react";
import React, { useState } from 'react';

// Initial sample interviews
const initialInterviews = [
  {
    id: '1',
    company: 'Acme Inc',
    position: 'Frontend Developer',
    type: 'Technical Interview',
    date: addDays(new Date(), 2),
    time: '14:00',
    duration: 60,
    location: 'Remote - Zoom',
    interviewers: ['Jane Smith (Tech Lead)', 'John Doe (Engineering Manager)'],
    notes: 'Prepare to discuss React, TypeScript, and component design patterns.',
    reminder: true,
    status: 'upcoming'
  },
  {
    id: '2',
    company: 'Globex Corporation',
    position: 'Full Stack Engineer',
    type: 'HR Screening',
    date: addDays(new Date(), 4),
    time: '10:30',
    duration: 30,
    location: 'Remote - Google Meet',
    interviewers: ['Sarah Johnson (HR Manager)'],
    notes: 'Initial screening call to discuss background and experience.',
    reminder: true,
    status: 'upcoming'
  },
  {
    id: '3',
    company: 'Wayne Enterprises',
    position: 'Software Engineer',
    type: 'Final Interview',
    date: addDays(new Date(), 7),
    time: '15:00',
    duration: 90,
    location: 'Onsite - Chicago Office',
    interviewers: ['Bruce Wayne (CTO)', 'Lucius Fox (Engineering Director)'],
    notes: 'Panel interview with senior leadership. Be prepared to discuss system design and architecture.',
    reminder: true,
    status: 'upcoming'
  },
  {
    id: '4',
    company: 'Stark Industries',
    position: 'UI/UX Designer',
    type: 'Portfolio Review',
    date: addDays(new Date(), -3),
    time: '11:00',
    duration: 45,
    location: 'Remote - Microsoft Teams',
    interviewers: ['Tony Stark (Product Lead)'],
    notes: 'Completed. Feedback: Strong portfolio, good communication skills.',
    reminder: false,
    status: 'completed'
  },
];

// Interview types
const interviewTypes = [
  "HR Screening",
  "Technical Interview",
  "Take-home Assignment",
  "Culture Fit",
  "Portfolio Review",
  "System Design",
  "Behavioral Interview",
  "Final Interview",
  "Pair Programming",
  "Case Study"
];

// Time slots
const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

// Duration options (in minutes)
const durationOptions = [15, 30, 45, 60, 90, 120];

export default function InterviewScheduler() {
  const [interviews, setInterviews] = useState(initialInterviews);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  // Form state for adding a new interview
  const [newInterview, setNewInterview] = useState({
    company: '',
    position: '',
    type: '',
    date: new Date(),
    time: '09:00',
    duration: 60,
    location: '',
    interviewers: '',
    notes: '',
    reminder: true,
    status: 'upcoming'
  });

  // Get interviews for selected date
  const getInterviewsForDate = (date) => {
    return interviews.filter(interview => {
      const interviewDate = new Date(interview.date);
      return (
        interviewDate.getDate() === date.getDate() &&
        interviewDate.getMonth() === date.getMonth() &&
        interviewDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Filter interviews
  const filteredInterviews = filter === 'all'
    ? interviews
    : interviews.filter(interview => interview.status === filter);

  // Get days with interviews
  const getInterviewDays = () => {
    const interviewDays = {};
    interviews.forEach(interview => {
      const date = new Date(interview.date);
      const dateString = date.toDateString();
      interviewDays[dateString] = interviewDays[dateString]
        ? interviewDays[dateString] + 1
        : 1;
    });
    return interviewDays;
  };

  const interviewDays = getInterviewDays();

  // Handle adding a new interview
  const handleAddInterview = () => {
    const id = (interviews.length + 1).toString();
    setInterviews([...interviews, { id, ...newInterview }]);
    setIsAddDialogOpen(false);
    setNewInterview({
      company: '',
      position: '',
      type: '',
      date: new Date(),
      time: '09:00',
      duration: 60,
      location: '',
      interviewers: '',
      notes: '',
      reminder: true,
      status: 'upcoming'
    });
  };

  // Handle deleting an interview
  const handleDeleteInterview = (id) => {
    setInterviews(interviews.filter(interview => interview.id !== id));
    setIsConfirmDialogOpen(false);
    setSelectedInterview(null);
  };

  // Handle updating interview status
  const handleUpdateStatus = (id, status) => {
    setInterviews(interviews.map(interview =>
      interview.id === id ? { ...interview, status } : interview
    ));
    setIsDetailsDialogOpen(false);
  };

  // Custom day renderer for the calendar
  const renderDay = (day) => {
    const dateString = day.toDateString();
    const hasInterviews = interviewDays[dateString];

    return (
      <div className="relative">
        <div>{day.getDate()}</div>
        {hasInterviews && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <div className="h-1 w-1 rounded-full bg-primary" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar */}
        <Card className="md:w-80 flex-shrink-0">
          <CardHeader>
            <CardTitle>Interview Calendar</CardTitle>
            <CardDescription>
              Select a date to view interviews
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="border rounded-md p-3"
              renderDay={renderDay}
            />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Schedule Interview
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Schedule a New Interview</DialogTitle>
                  <DialogDescription>
                    Enter the details for your upcoming interview.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={newInterview.company}
                      onChange={(e) => setNewInterview({ ...newInterview, company: e.target.value })}
                      placeholder="Company name"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={newInterview.position}
                      onChange={(e) => setNewInterview({ ...newInterview, position: e.target.value })}
                      placeholder="Job title"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="type">Interview Type</Label>
                    <Select
                      value={newInterview.type}
                      onValueChange={(value) => setNewInterview({ ...newInterview, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select interview type" />
                      </SelectTrigger>
                      <SelectContent>
                        {interviewTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date">Date</Label>
                      <div className="relative">
                        <Input
                          id="date"
                          value={format(newInterview.date, 'yyyy-MM-dd')}
                          onChange={(e) => {
                            const date = new Date(e.target.value);
                            if (!isNaN(date.getTime())) {
                              setNewInterview({ ...newInterview, date });
                            }
                          }}
                          type="date"
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="time">Time</Label>
                      <Select
                        value={newInterview.time}
                        onValueChange={(value) => setNewInterview({ ...newInterview, time: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="duration">Duration (min)</Label>
                      <Select
                        value={newInterview.duration.toString()}
                        onValueChange={(value) => setNewInterview({ ...newInterview, duration: parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {durationOptions.map((duration) => (
                            <SelectItem key={duration} value={duration.toString()}>
                              {duration} minutes
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newInterview.location}
                        onChange={(e) => setNewInterview({ ...newInterview, location: e.target.value })}
                        placeholder="Remote/Office location"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="interviewers">Interviewers</Label>
                    <Input
                      id="interviewers"
                      value={newInterview.interviewers}
                      onChange={(e) => setNewInterview({ ...newInterview, interviewers: e.target.value })}
                      placeholder="Names and titles of interviewers"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newInterview.notes}
                      onChange={(e) => setNewInterview({ ...newInterview, notes: e.target.value })}
                      placeholder="Preparation notes, questions to ask, etc."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="reminder"
                      checked={newInterview.reminder}
                      onCheckedChange={(checked) => setNewInterview({ ...newInterview, reminder: checked })}
                    />
                    <Label htmlFor="reminder">Set reminder (1 day before)</Label>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" onClick={handleAddInterview}>
                    Schedule Interview
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        {/* Interviews for selected date */}
        <Card className="flex-1">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle>
                  Interviews for {format(selectedDate, 'MMMM d, yyyy')}
                </CardTitle>
                <CardDescription>
                  {getInterviewsForDate(selectedDate).length} interviews scheduled
                </CardDescription>
              </div>
              <Select
                value={filter}
                onValueChange={setFilter}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Interviews</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getInterviewsForDate(selectedDate).length > 0 ? (
                getInterviewsForDate(selectedDate).map((interview) => (
                                      <Card key={interview.id} className={`overflow-hidden ${
                    interview.status === 'cancelled' ? 'border-destructive/40 bg-destructive/5' :
                    interview.status === 'completed' ? 'border-muted/60 bg-muted/10' : ''
                  }`}>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base font-semibold">
                            {interview.company} - {interview.type}
                          </CardTitle>
                          <CardDescription>
                            {interview.position}
                          </CardDescription>
                        </div>
                        {interview.status === 'upcoming' ? (
                          <Button size="sm" variant="outline" className="h-8">
                            Prepare
                          </Button>
                        ) : (
                          <Badge variant={
                            interview.status === 'completed' ? 'secondary' :
                            interview.status === 'cancelled' ? 'destructive' : 'default'
                          }>
                            {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{interview.time} ({interview.duration} min)</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{interview.location}</span>
                        </div>

                        {typeof interview.interviewers === 'string' ? (
                          <div className="flex items-center text-muted-foreground col-span-2">
                            <User className="h-4 w-4 mr-2" />
                            <span>{interview.interviewers}</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-muted-foreground col-span-2">
                            <User className="h-4 w-4 mr-2" />
                            <span>{interview.interviewers.join(', ')}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex mt-4 space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => {
                              setSelectedInterview(interview);
                              setIsDetailsDialogOpen(true);
                            }}>
                              View Details
                            </Button>
                          </DialogTrigger>
                        </Dialog>

                        {interview.status === 'upcoming' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateStatus(interview.id, 'completed')}
                            >
                              <CalendarCheck className="h-4 w-4 mr-2" />
                              Mark as Completed
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive border-destructive/30"
                              onClick={() => {
                                setSelectedInterview(interview);
                                setIsConfirmDialogOpen(true);
                              }}
                            >
                              <CalendarX className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="p-8 text-center border rounded-md bg-muted/5">
                  <CalendarPlus className="h-10 w-10 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No interviews on this date</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Click "Schedule Interview" to add a new interview
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Interviews Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
          <CardDescription>
            Your next 3 scheduled interviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interviews
              .filter(interview => interview.status === 'upcoming')
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .slice(0, 3)
              .map(interview => (
                <div key={interview.id} className="flex items-center gap-4 p-4 border rounded-md">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {interview.type === 'Technical Interview' ? (
                      <Video className="h-6 w-6 text-primary" />
                    ) : interview.type === 'HR Screening' ? (
                      <User className="h-6 w-6 text-primary" />
                    ) : (
                      <Building className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{interview.company} - {interview.position}</h4>
                    <p className="text-sm text-muted-foreground">{interview.type}</p>
                    <div className="flex text-xs text-muted-foreground mt-1">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {format(new Date(interview.date), 'MMM d')} at {interview.time}
                      </div>
                      <div className="mx-2">•</div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {interview.location}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/dashboard/interviews/${interview.id}`}>View</a>
                  </Button>
                </div>
              ))}
            {interviews.filter(interview => interview.status === 'upcoming').length === 0 && (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No upcoming interviews scheduled</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Interview Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        {selectedInterview && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{selectedInterview.company} - {selectedInterview.type}</DialogTitle>
              <DialogDescription>
                {selectedInterview.position}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-y-2">
                <div className="text-sm font-medium">Date:</div>
                <div className="text-sm">{format(new Date(selectedInterview.date), 'MMMM d, yyyy')}</div>

                <div className="text-sm font-medium">Time:</div>
                <div className="text-sm">{selectedInterview.time} ({selectedInterview.duration} minutes)</div>

                <div className="text-sm font-medium">Location:</div>
                <div className="text-sm">{selectedInterview.location}</div>

                <div className="text-sm font-medium">Status:</div>
                <div className="text-sm">
                  <Badge variant={
                    selectedInterview.status === 'completed' ? 'secondary' :
                    selectedInterview.status === 'cancelled' ? 'destructive' : 'default'
                  }>
                    {selectedInterview.status.charAt(0).toUpperCase() + selectedInterview.status.slice(1)}
                  </Badge>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-1">Interviewers:</div>
                <div className="text-sm">
                  {typeof selectedInterview.interviewers === 'string'
                    ? selectedInterview.interviewers
                    : selectedInterview.interviewers.join(', ')}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-1">Notes:</div>
                <div className="text-sm p-3 border rounded-md bg-muted/10">
                  {selectedInterview.notes || "No notes added."}
                </div>
              </div>

              {selectedInterview.reminder && (
                <div className="flex items-center p-3 border rounded-md bg-muted/10">
                  <AlertTriangle className="h-4 w-4 mr-2 text-warning" />
                  <span className="text-sm">Reminder set for 1 day before the interview</span>
                </div>
              )}
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {selectedInterview.status === 'upcoming' ? (
                <>
                  <Button
                    variant="outline"
                    className="sm:w-auto w-full"
                    onClick={() => handleUpdateStatus(selectedInterview.id, 'completed')}
                  >
                    <CalendarCheck className="h-4 w-4 mr-2" />
                    Mark as Completed
                  </Button>
                  <Button
                    variant="outline"
                    className="sm:w-auto w-full text-destructive border-destructive/30"
                    onClick={() => {
                      setIsDetailsDialogOpen(false);
                      setIsConfirmDialogOpen(true);
                    }}
                  >
                    <CalendarX className="h-4 w-4 mr-2" />
                    Cancel Interview
                  </Button>
                </>
              ) : null}
              <Button
                className="sm:w-auto w-full"
                onClick={() => setIsDetailsDialogOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Confirm Cancellation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        {selectedInterview && (
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Cancel Interview</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this interview? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="p-3 border rounded-md">
                <p className="font-medium">{selectedInterview.company} - {selectedInterview.type}</p>
                <p className="text-sm text-muted-foreground">{format(new Date(selectedInterview.date), 'MMMM d, yyyy')} at {selectedInterview.time}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
                Keep Interview
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleUpdateStatus(selectedInterview.id, 'cancelled')}
              >
                Cancel Interview
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}