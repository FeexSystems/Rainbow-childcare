import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://your-project.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: "parent" | "teacher" | "admin" | "support_staff";
  phone: string | null;
  avatar_url: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  address: string | null;
  date_of_birth: string | null;
  created_at: string;
  updated_at: string;
}

export interface Child {
  id: string;
  parent_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string | null;
  allergies: string | null;
  medical_conditions: string | null;
  dietary_requirements: string | null;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship: string | null;
  nursery_location: "hillcrest" | "rainbow_stars";
  enrollment_date: string | null;
  room_assignment: string | null;
  photo_url: string | null;
  pickup_authorization: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface Attendance {
  id: string;
  child_id: string;
  date: string;
  check_in_time: string | null;
  check_out_time: string | null;
  picked_up_by: string | null;
  notes: string | null;
  created_at: string;
}

export interface DailyUpdate {
  id: string;
  child_id: string;
  date: string;
  meals: Record<string, any>;
  naps: Record<string, any>;
  activities: Record<string, any>;
  mood: string | null;
  developmental_notes: string | null;
  photos: string[];
  staff_id: string;
  parent_viewed: boolean;
  parent_viewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ForumPost {
  id: string;
  author_id: string;
  title: string;
  content: string;
  category: "general" | "events" | "questions" | "support";
  pinned: boolean;
  likes_count: number;
  replies_count: number;
  created_at: string;
  updated_at: string;
}

export interface ForumReply {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  likes_count: number;
  created_at: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: "urgent" | "event" | "celebration" | "general";
  author_id: string;
  target_audience: "all" | "parents" | "staff";
  nursery_location: "hillcrest" | "rainbow_stars" | null;
  scheduled_for: string | null;
  expires_at: string | null;
  is_published: boolean;
  read_by: string[];
  likes: string[];
  created_at: string;
  updated_at: string;
}

export interface QRPickup {
  id: string;
  child_id: string;
  parent_id: string;
  qr_code: string;
  generated_at: string;
  expires_at: string;
  used_at: string | null;
  used_by_staff_id: string | null;
  pickup_notes: string | null;
  is_active: boolean;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "urgent";
  read: boolean;
  action_url: string | null;
  data: Record<string, any> | null;
  created_at: string;
}

// Additional interfaces for new tables
export interface Application {
  id: string;
  parent_email: string;
  parent_name: string;
  parent_phone: string;
  child_name: string;
  child_dob: string;
  preferred_nursery: "hillcrest" | "rainbow_stars";
  preferred_start_date: string | null;
  days_required: string[];
  hours_required: string;
  additional_info: string | null;
  status: "pending" | "reviewing" | "approved" | "rejected" | "waiting_list";
  priority_score: number;
  notes: string | null;
  assigned_to: string | null;
  submitted_at: string;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  is_urgent: boolean;
  preferred_contact_method: string;
  responded: boolean;
  responded_at: string | null;
  responded_by: string | null;
  created_at: string;
}

export interface VisitBooking {
  id: string;
  location: "hillcrest" | "rainbow_stars";
  visit_date: string;
  time_slot: string;
  attendees: number;
  child_age_group: string;
  name: string;
  email: string;
  phone: string | null;
  notes: string | null;
  consent_contact: boolean;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  start_datetime: string;
  end_datetime: string;
  location: string | null;
  event_type: string;
  target_audience: "all" | "parents" | "staff";
  nursery_location: "hillcrest" | "rainbow_stars" | null;
  max_attendees: number | null;
  rsvp_required: boolean;
  rsvp_deadline: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface EventRSVP {
  id: string;
  event_id: string;
  user_id: string;
  attending: boolean;
  number_of_attendees: number;
  dietary_requirements: string | null;
  notes: string | null;
  created_at: string;
}

export interface FileUpload {
  id: string;
  uploader_id: string;
  filename: string;
  original_filename: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  category: string | null;
  related_child_id: string | null;
  description: string | null;
  is_public: boolean;
  created_at: string;
}

export interface Invoice {
  id: string;
  parent_id: string;
  child_id: string;
  invoice_number: string;
  amount_due: number;
  amount_paid: number;
  due_date: string;
  invoice_date: string;
  period_start: string;
  period_end: string;
  status: string;
  items: Record<string, any>;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  invoice_id: string;
  parent_id: string;
  amount: number;
  payment_method: string;
  payment_reference: string | null;
  payment_date: string;
  processed_by: string | null;
  notes: string | null;
  created_at: string;
}

// Auth helpers
export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const signUp = async (
  email: string,
  password: string,
  metadata: any,
) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};

// Email verification
export const resendConfirmation = async (email: string) => {
  return await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};

// Password reset
export const resetPassword = async (email: string) => {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });
};

// Update password
export const updatePassword = async (password: string) => {
  return await supabase.auth.updateUser({ password });
};

// Submit application
export const submitApplication = async (
  applicationData: Omit<
    Application,
    | "id"
    | "status"
    | "priority_score"
    | "submitted_at"
    | "created_at"
    | "updated_at"
  >,
) => {
  return await supabase
    .from("applications")
    .insert([applicationData])
    .select()
    .single();
};

// Submit contact form
export const submitContactForm = async (
  contactData: Omit<
    ContactSubmission,
    "id" | "responded" | "responded_at" | "responded_by" | "created_at"
  >,
) => {
  return await supabase
    .from("contact_submissions")
    .insert([contactData])
    .select()
    .single();
};

// Get user's children
export const submitVisitBooking = async (
  payload: Omit<VisitBooking, "id" | "created_at">,
) => {
  return await supabase
    .from("visit_bookings")
    .insert([payload])
    .select()
    .single();
};

export const getUserChildren = async (userId: string) => {
  return await supabase
    .from("children")
    .select("*")
    .eq("parent_id", userId)
    .order("created_at", { ascending: true });
};

// Get daily updates for a child
export const getDailyUpdates = async (childId: string, limit: number = 10) => {
  return await supabase
    .from("daily_updates")
    .select(
      `
      *,
      staff:profiles!daily_updates_staff_id_fkey(full_name)
    `,
    )
    .eq("child_id", childId)
    .order("date", { ascending: false })
    .limit(limit);
};

// Get announcements
export const getAnnouncements = async (limit: number = 20) => {
  return await supabase
    .from("announcements")
    .select(
      `
      *,
      author:profiles!announcements_author_id_fkey(full_name)
    `,
    )
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(limit);
};

// Get user notifications
export const getUserNotifications = async (
  userId: string,
  limit: number = 50,
) => {
  return await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId: string) => {
  return await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", notificationId);
};

// Generate QR code for pickup
export const generateQRPickup = async (childId: string, parentId: string) => {
  const qrCode = crypto.randomUUID();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 2); // QR code expires in 2 hours

  return await supabase
    .from("qr_pickups")
    .insert([
      {
        child_id: childId,
        parent_id: parentId,
        qr_code: qrCode,
        expires_at: expiresAt.toISOString(),
      },
    ])
    .select()
    .single();
};
