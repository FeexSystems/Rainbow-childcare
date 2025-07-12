import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Plus,
  Clock,
  MapPin,
  Users,
  Bell,
  Star,
  Camera,
  Cake,
  GraduationCap,
  Heart,
  Music,
  Palette,
  TreePine,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  startOfWeek,
  endOfWeek,
} from "date-fns";

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  type: "school" | "activity" | "meeting" | "celebration" | "holiday";
  location?: string;
  attendees?: string[];
  createdBy: string;
  isRecurring?: boolean;
  color: string;
  canEdit?: boolean;
  rsvpRequired?: boolean;
  rsvpList?: { userId: string; name: string; status: "yes" | "no" | "maybe" }[];
}

const eventTypes = {
  school: { icon: GraduationCap, color: "bg-blue-500", label: "School Event" },
  activity: { icon: Star, color: "bg-purple-500", label: "Activity" },
  meeting: { icon: Users, color: "bg-green-500", label: "Meeting" },
  celebration: { icon: Cake, color: "bg-pink-500", label: "Celebration" },
  holiday: { icon: Heart, color: "bg-red-500", label: "Holiday" },
};

export function InteractiveCalendar() {
  const { profile } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");

  // Sample events
  useEffect(() => {
    const sampleEvents: CalendarEvent[] = [
      {
        id: "1",
        title: "School Photos",
        description: "Professional photographer visiting for annual photos",
        date: new Date(2024, 11, 15),
        startTime: "09:00",
        endTime: "15:00",
        type: "school",
        location: "Main Hall",
        createdBy: "admin",
        color: "bg-blue-500",
        canEdit: profile?.role === "admin",
        rsvpRequired: true,
        rsvpList: [
          { userId: "1", name: "Sarah Johnson", status: "yes" },
          { userId: "2", name: "Michael Chen", status: "maybe" },
        ],
      },
      {
        id: "2",
        title: "Christmas Party",
        description: "Annual Christmas celebration with activities and treats",
        date: new Date(2024, 11, 20),
        startTime: "14:00",
        endTime: "16:00",
        type: "celebration",
        location: "Rainbow Room",
        createdBy: "teacher",
        color: "bg-pink-500",
        canEdit: false,
        rsvpRequired: true,
      },
      {
        id: "3",
        title: "Parent-Teacher Meetings",
        description: "Individual meetings to discuss child progress",
        date: new Date(2024, 11, 18),
        startTime: "15:30",
        endTime: "18:00",
        type: "meeting",
        location: "Conference Room",
        createdBy: "admin",
        color: "bg-green-500",
        canEdit: profile?.role !== "parent",
      },
      {
        id: "4",
        title: "Outdoor Adventure Day",
        description: "Forest exploration and nature activities",
        date: new Date(2024, 11, 22),
        startTime: "10:00",
        endTime: "14:00",
        type: "activity",
        location: "Local Forest",
        createdBy: "teacher",
        color: "bg-purple-500",
        canEdit: false,
      },
    ];
    setEvents(sampleEvents);
  }, [profile?.role]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCreateEvent = () => {
    setIsCreatingEvent(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const canCreateEvents =
    profile?.role && ["admin", "teacher"].includes(profile.role);

  const EventCard = ({ event }: { event: CalendarEvent }) => {
    const EventIcon = eventTypes[event.type].icon;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="glass-card p-3 cursor-pointer interactive-card"
        onClick={() => handleEventClick(event)}
      >
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg ${event.color} text-white`}>
            <EventIcon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 truncate">
              {event.title}
            </h4>
            <p className="text-sm text-gray-600">
              {event.startTime && event.endTime && (
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>
                    {event.startTime} - {event.endTime}
                  </span>
                </span>
              )}
            </p>
            {event.location && (
              <p className="text-xs text-gray-500 flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{event.location}</span>
              </p>
            )}
            <Badge variant="secondary" className="text-xs mt-1">
              {eventTypes[event.type].label}
            </Badge>
          </div>
        </div>
      </motion.div>
    );
  };

  const EventDetailsModal = ({ event }: { event: CalendarEvent }) => (
    <Dialog
      open={!!selectedEvent}
      onOpenChange={(open) => !open && setSelectedEvent(null)}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className={`p-2 rounded-lg ${event.color} text-white`}>
              {React.createElement(eventTypes[event.type].icon, {
                className: "w-5 h-5",
              })}
            </div>
            <span>{event.title}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Date & Time</h4>
            <p className="text-gray-700">
              {format(event.date, "EEEE, MMMM d, yyyy")}
            </p>
            {event.startTime && event.endTime && (
              <p className="text-gray-600 text-sm">
                {event.startTime} - {event.endTime}
              </p>
            )}
          </div>

          {event.description && (
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Description</h4>
              <p className="text-gray-700 text-sm">{event.description}</p>
            </div>
          )}

          {event.location && (
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Location</h4>
              <p className="text-gray-700 text-sm flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </p>
            </div>
          )}

          {event.rsvpRequired && event.rsvpList && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                RSVP ({event.rsvpList.length} responses)
              </h4>
              <div className="space-y-1">
                {event.rsvpList.map((rsvp, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>{rsvp.name}</span>
                    <Badge
                      variant={
                        rsvp.status === "yes"
                          ? "default"
                          : rsvp.status === "no"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {rsvp.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            {event.rsvpRequired && (
              <>
                <Button size="sm" className="flex-1">
                  <Check className="w-4 h-4 mr-1" />
                  Attending
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <X className="w-4 h-4 mr-1" />
                  Not Attending
                </Button>
              </>
            )}
            {event.canEdit && (
              <Button size="sm" variant="outline">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-bold">
                {format(currentDate, "MMMM yyyy")}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex border rounded-lg overflow-hidden">
                {(["month", "week", "day"] as const).map((mode) => (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode(mode)}
                    className="rounded-none capitalize"
                  >
                    {mode}
                  </Button>
                ))}
              </div>
              {canCreateEvents && (
                <Button onClick={handleCreateEvent} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid */}
        <Card className="glass-card lg:col-span-3">
          <CardContent className="p-6">
            {/* Month View */}
            {viewMode === "month" && (
              <div className="space-y-4">
                {/* Days of week header */}
                <div className="grid grid-cols-7 gap-1">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="p-2 text-center text-sm font-medium text-gray-600"
                      >
                        {day}
                      </div>
                    ),
                  )}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day) => {
                    const dayEvents = getEventsForDate(day);
                    const isCurrentMonth = isSameMonth(day, currentDate);
                    const isDayToday = isToday(day);
                    const isSelected =
                      selectedDate && isSameDay(day, selectedDate);

                    return (
                      <motion.div
                        key={day.toISOString()}
                        whileHover={{ scale: 1.02 }}
                        className={`min-h-[100px] p-2 border border-gray-100 rounded-lg cursor-pointer transition-all ${
                          isCurrentMonth
                            ? "bg-white hover:bg-gray-50"
                            : "bg-gray-50 text-gray-400"
                        } ${isDayToday ? "bg-blue-50 border-blue-200" : ""} ${
                          isSelected ? "bg-purple-50 border-purple-200" : ""
                        }`}
                        onClick={() => handleDateClick(day)}
                      >
                        <div
                          className={`text-sm font-medium mb-1 ${
                            isDayToday ? "text-blue-600" : ""
                          }`}
                        >
                          {format(day, "d")}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEventClick(event);
                              }}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Events Sidebar */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>
                {selectedDate
                  ? format(selectedDate, "MMM d")
                  : "Upcoming Events"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedDate ? (
                <AnimatePresence>
                  {getEventsForDate(selectedDate).length > 0 ? (
                    getEventsForDate(selectedDate).map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8"
                    >
                      <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-600">No events this day</p>
                      {canCreateEvents && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2"
                          onClick={handleCreateEvent}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Event
                        </Button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                events
                  .filter((event) => event.date >= new Date())
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(0, 5)
                  .map((event) => <EventCard key={event.id} event={event} />)
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && <EventDetailsModal event={selectedEvent} />}

      {/* Create Event Modal */}
      <Dialog open={isCreatingEvent} onOpenChange={setIsCreatingEvent}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Add a new event to the nursery calendar
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventTitle">Event Title</Label>
              <Input id="eventTitle" placeholder="Enter event title..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventType">Event Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(eventTypes).map(([key, type]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center space-x-2">
                        {React.createElement(type.icon, {
                          className: "w-4 h-4",
                        })}
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input id="startTime" type="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input id="endTime" type="time" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Event location..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Event description..."
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsCreatingEvent(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setIsCreatingEvent(false)}>
                Create Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
