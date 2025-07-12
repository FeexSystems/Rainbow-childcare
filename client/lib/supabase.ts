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
  created_at: string;
  updated_at: string;
}

export interface Child {
  id: string;
  parent_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  allergies: string | null;
  medical_conditions: string | null;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  nursery_location: "hillcrest" | "riverside";
  enrollment_date: string;
  photo_url: string | null;
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
  meals: string;
  naps: string;
  activities: string;
  mood: string;
  notes: string;
  photos: string[];
  staff_id: string;
  created_at: string;
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
  scheduled_for: string | null;
  expires_at: string | null;
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
    },
  });
};
