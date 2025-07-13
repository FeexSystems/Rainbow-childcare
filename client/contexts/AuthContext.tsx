import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import {
  supabase,
  Profile,
  resendConfirmation,
  resetPassword,
  updatePassword,
} from "../lib/supabase";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, metadata: any) => Promise<any>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  resendConfirmation: (email: string) => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
  updatePassword: (password: string) => Promise<any>;
  isEmailConfirmed: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setIsEmailConfirmed(session?.user?.email_confirmed_at ? true : false);

      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching profile:", error);
        return;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signUp = async (email: string, password: string, metadata: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      // Profile will be created automatically by the database trigger
      // No need to create it manually here

      return { data, error };
    } catch (error) {
      console.error("SignUp error:", error);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);

    if (error) {
      console.error("Error updating profile:", error);
      throw error;
    }

    await fetchProfile(user.id);
  };

  const handleResendConfirmation = async (email: string) => {
    return await resendConfirmation(email);
  };

  const handleResetPassword = async (email: string) => {
    return await resetPassword(email);
  };

  const handleUpdatePassword = async (password: string) => {
    return await updatePassword(password);
  };

  // Demo user functionality for testing
  const createDemoUser = (email: string, role: string) => {
    const demoUser = {
      id: `demo-${Date.now()}`,
      email: email,
      email_confirmed_at: new Date().toISOString(),
      user_metadata: { full_name: "Demo User", role },
      app_metadata: {},
      aud: "authenticated",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as any;

    const demoProfile = {
      id: demoUser.id,
      email: email,
      full_name: "Demo User",
      role: role as any,
      phone: null,
      avatar_url: null,
      emergency_contact_name: null,
      emergency_contact_phone: null,
      address: null,
      date_of_birth: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setUser(demoUser);
    setProfile(demoProfile);
    setIsEmailConfirmed(true);
    setLoading(false);

    // Store demo state in localStorage for persistence
    localStorage.setItem("demo_user", JSON.stringify(demoUser));
    localStorage.setItem("demo_profile", JSON.stringify(demoProfile));
    localStorage.setItem("is_demo", "true");

    return { data: { user: demoUser }, error: null };
  };

  // Check for demo mode on load
  React.useEffect(() => {
    const isDemo = localStorage.getItem("is_demo");
    const storedDemoUser = localStorage.getItem("demo_user");
    const storedDemoProfile = localStorage.getItem("demo_profile");

    if (isDemo && storedDemoUser && storedDemoProfile) {
      try {
        const demoUser = JSON.parse(storedDemoUser);
        const demoProfile = JSON.parse(storedDemoProfile);
        setUser(demoUser);
        setProfile(demoProfile);
        setIsEmailConfirmed(true);
        setLoading(false);
      } catch (error) {
        console.error("Error loading demo user:", error);
        localStorage.removeItem("demo_user");
        localStorage.removeItem("demo_profile");
        localStorage.removeItem("is_demo");
      }
    }
  }, []);

  const signOutDemo = () => {
    localStorage.removeItem("demo_user");
    localStorage.removeItem("demo_profile");
    localStorage.removeItem("is_demo");
    setUser(null);
    setProfile(null);
    setIsEmailConfirmed(false);
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut: async () => {
      const isDemo = localStorage.getItem("is_demo");
      if (isDemo) {
        signOutDemo();
      } else {
        await signOut();
      }
    },
    updateProfile,
    resendConfirmation: handleResendConfirmation,
    resetPassword: handleResetPassword,
    updatePassword: handleUpdatePassword,
    isEmailConfirmed,
    createDemoUser, // Expose for demo login
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
