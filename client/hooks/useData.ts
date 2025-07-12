import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  supabase,
  Child,
  DailyUpdate,
  Attendance,
  ForumPost,
  ForumReply,
  Announcement,
  QRPickup,
  Notification,
} from "@/lib/supabase";

// Children hooks
export const useChildren = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchChildren = async () => {
      const { data, error } = await supabase
        .from("children")
        .select("*")
        .eq("parent_id", user.id)
        .order("first_name");

      if (error) {
        console.error("Error fetching children:", error);
      } else {
        setChildren(data || []);
      }
      setLoading(false);
    };

    fetchChildren();
  }, [user]);

  return { children, loading };
};

// Daily updates hooks
export const useDailyUpdates = (childId?: string) => {
  const [updates, setUpdates] = useState<DailyUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!childId) return;

    const fetchUpdates = async () => {
      const { data, error } = await supabase
        .from("daily_updates")
        .select(
          `
          *,
          children!inner(first_name, last_name),
          profiles!daily_updates_staff_id_fkey(full_name)
        `,
        )
        .eq("child_id", childId)
        .order("date", { ascending: false })
        .limit(30);

      if (error) {
        console.error("Error fetching daily updates:", error);
      } else {
        setUpdates(data || []);
      }
      setLoading(false);
    };

    fetchUpdates();
  }, [childId]);

  return { updates, loading };
};

// Attendance hooks
export const useAttendance = (childId?: string) => {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!childId) return;

    const fetchAttendance = async () => {
      const { data, error } = await supabase
        .from("attendance")
        .select("*")
        .eq("child_id", childId)
        .order("date", { ascending: false })
        .limit(30);

      if (error) {
        console.error("Error fetching attendance:", error);
      } else {
        setAttendance(data || []);
      }
      setLoading(false);
    };

    fetchAttendance();
  }, [childId]);

  return { attendance, loading };
};

// Forum hooks
export const useForumPosts = (category?: string) => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      let query = supabase
        .from("forum_posts")
        .select(
          `
          *,
          profiles!forum_posts_author_id_fkey(full_name, role)
        `,
        )
        .order("pinned", { ascending: false })
        .order("created_at", { ascending: false });

      if (category && category !== "all") {
        query = query.eq("category", category);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching forum posts:", error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [category]);

  return { posts, loading, setPosts };
};

export const useForumReplies = (postId: string) => {
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    const fetchReplies = async () => {
      const { data, error } = await supabase
        .from("forum_replies")
        .select(
          `
          *,
          profiles!forum_replies_author_id_fkey(full_name, role)
        `,
        )
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching forum replies:", error);
      } else {
        setReplies(data || []);
      }
      setLoading(false);
    };

    fetchReplies();
  }, [postId]);

  return { replies, loading, setReplies };
};

// Announcements hooks
export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select(
          `
          *,
          profiles!announcements_author_id_fkey(full_name, role)
        `,
        )
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) {
        console.error("Error fetching announcements:", error);
      } else {
        setAnnouncements(data || []);
      }
      setLoading(false);
    };

    fetchAnnouncements();
  }, []);

  return { announcements, loading, setAnnouncements };
};

// QR Pickup hooks
export const useQRPickups = () => {
  const [pickups, setPickups] = useState<QRPickup[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchPickups = async () => {
      const { data, error } = await supabase
        .from("qr_pickups")
        .select(
          `
          *,
          children!inner(first_name, last_name)
        `,
        )
        .eq("parent_id", user.id)
        .eq("is_active", true)
        .order("generated_at", { ascending: false });

      if (error) {
        console.error("Error fetching QR pickups:", error);
      } else {
        setPickups(data || []);
      }
      setLoading(false);
    };

    fetchPickups();
  }, [user]);

  return { pickups, loading, setPickups };
};

// Notifications hooks
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) {
        console.error("Error fetching notifications:", error);
      } else {
        setNotifications(data || []);
      }
      setLoading(false);
    };

    fetchNotifications();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setNotifications((prev) => [payload.new as Notification, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setNotifications((prev) =>
              prev.map((n) =>
                n.id === payload.new.id ? (payload.new as Notification) : n,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setNotifications((prev) =>
              prev.filter((n) => n.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const markAsRead = async (notificationId: string) => {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", notificationId);

    if (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, loading, markAsRead, unreadCount };
};

// Admin hooks
export const useAdminStats = () => {
  const [stats, setStats] = useState({
    totalChildren: 0,
    totalStaff: 0,
    totalParents: 0,
    todayAttendance: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [childrenRes, staffRes, parentsRes, attendanceRes] =
          await Promise.all([
            supabase.from("children").select("id", { count: "exact" }),
            supabase
              .from("profiles")
              .select("id", { count: "exact" })
              .in("role", ["teacher", "admin", "support_staff"]),
            supabase
              .from("profiles")
              .select("id", { count: "exact" })
              .eq("role", "parent"),
            supabase
              .from("attendance")
              .select("id", { count: "exact" })
              .eq("date", new Date().toISOString().split("T")[0])
              .not("check_in_time", "is", null),
          ]);

        setStats({
          totalChildren: childrenRes.count || 0,
          totalStaff: staffRes.count || 0,
          totalParents: parentsRes.count || 0,
          todayAttendance: attendanceRes.count || 0,
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};

// Create new data functions
export const createForumPost = async (
  title: string,
  content: string,
  category: string,
  authorId: string,
) => {
  const { data, error } = await supabase
    .from("forum_posts")
    .insert({
      title,
      content,
      category,
      author_id: authorId,
    })
    .select(
      `
      *,
      profiles!forum_posts_author_id_fkey(full_name, role)
    `,
    )
    .single();

  if (error) {
    console.error("Error creating forum post:", error);
    throw error;
  }

  return data;
};

export const createForumReply = async (
  postId: string,
  content: string,
  authorId: string,
) => {
  const { data, error } = await supabase
    .from("forum_replies")
    .insert({
      post_id: postId,
      content,
      author_id: authorId,
    })
    .select(
      `
      *,
      profiles!forum_replies_author_id_fkey(full_name, role)
    `,
    )
    .single();

  if (error) {
    console.error("Error creating forum reply:", error);
    throw error;
  }

  return data;
};

export const generateQRCode = async (childId: string, parentId: string) => {
  const qrCode = Math.random().toString(36).substring(2, 15);
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry

  const { data, error } = await supabase
    .from("qr_pickups")
    .insert({
      child_id: childId,
      parent_id: parentId,
      qr_code: qrCode,
      expires_at: expiresAt.toISOString(),
    })
    .select("*")
    .single();

  if (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }

  return data;
};

export const createAnnouncement = async (
  title: string,
  content: string,
  type: string,
  authorId: string,
  targetAudience: string = "all",
) => {
  const { data, error } = await supabase
    .from("announcements")
    .insert({
      title,
      content,
      type,
      author_id: authorId,
      target_audience: targetAudience,
    })
    .select(
      `
      *,
      profiles!announcements_author_id_fkey(full_name, role)
    `,
    )
    .single();

  if (error) {
    console.error("Error creating announcement:", error);
    throw error;
  }

  return data;
};
