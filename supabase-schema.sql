-- Hillcrest Rising Stars Nursery Database Schema
-- This file should be run in your Supabase SQL editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE user_role AS ENUM ('parent', 'teacher', 'admin', 'support_staff');
CREATE TYPE nursery_location AS ENUM ('hillcrest', 'rainbow_stars');
CREATE TYPE announcement_type AS ENUM ('urgent', 'event', 'celebration', 'general');
CREATE TYPE target_audience AS ENUM ('all', 'parents', 'staff');
CREATE TYPE forum_category AS ENUM ('general', 'events', 'questions', 'support');
CREATE TYPE notification_type AS ENUM ('info', 'warning', 'success', 'urgent');
CREATE TYPE application_status AS ENUM ('pending', 'reviewing', 'approved', 'rejected', 'waiting_list');

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'parent',
    phone TEXT,
    avatar_url TEXT,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    address TEXT,
    date_of_birth DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Children table
CREATE TABLE children (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    gender TEXT,
    allergies TEXT,
    medical_conditions TEXT,
    dietary_requirements TEXT,
    emergency_contact_name TEXT NOT NULL,
    emergency_contact_phone TEXT NOT NULL,
    emergency_contact_relationship TEXT,
    nursery_location nursery_location NOT NULL,
    enrollment_date DATE,
    room_assignment TEXT,
    photo_url TEXT,
    pickup_authorization TEXT[], -- Array of authorized pickup names
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications table
CREATE TABLE applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    parent_email TEXT NOT NULL,
    parent_name TEXT NOT NULL,
    parent_phone TEXT NOT NULL,
    child_name TEXT NOT NULL,
    child_dob DATE NOT NULL,
    preferred_nursery nursery_location NOT NULL,
    preferred_start_date DATE,
    days_required TEXT[], -- Array like ['monday', 'tuesday', 'wednesday']
    hours_required TEXT, -- e.g., 'full_day', 'morning_only', 'custom'
    additional_info TEXT,
    status application_status DEFAULT 'pending',
    priority_score INTEGER DEFAULT 0,
    notes TEXT, -- Internal staff notes
    assigned_to UUID REFERENCES profiles(id),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Form submissions
CREATE TABLE contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_urgent BOOLEAN DEFAULT FALSE,
    preferred_contact_method TEXT DEFAULT 'email',
    responded BOOLEAN DEFAULT FALSE,
    responded_at TIMESTAMP WITH TIME ZONE,
    responded_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance tracking
CREATE TABLE attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    child_id UUID REFERENCES children(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    check_in_time TIME,
    check_out_time TIME,
    checked_in_by UUID REFERENCES profiles(id), -- Staff member
    checked_out_by UUID REFERENCES profiles(id), -- Staff member
    picked_up_by TEXT, -- Name of person who picked up
    pickup_authorized BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(child_id, date)
);

-- Daily updates from staff to parents
CREATE TABLE daily_updates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    child_id UUID REFERENCES children(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    meals JSONB, -- {"breakfast": "eaten_well", "lunch": "some", "snack": "all"}
    naps JSONB, -- {"duration": "2 hours", "quality": "good", "time": "12:30-14:30"}
    activities JSONB, -- Array of activities
    mood TEXT,
    developmental_notes TEXT,
    photos TEXT[], -- Array of photo URLs
    staff_id UUID REFERENCES profiles(id) NOT NULL,
    parent_viewed BOOLEAN DEFAULT FALSE,
    parent_viewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(child_id, date)
);

-- Forum posts
CREATE TABLE forum_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category forum_category NOT NULL DEFAULT 'general',
    pinned BOOLEAN DEFAULT FALSE,
    likes_count INTEGER DEFAULT 0,
    replies_count INTEGER DEFAULT 0,
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Forum replies
CREATE TABLE forum_replies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE NOT NULL,
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    likes_count INTEGER DEFAULT 0,
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Forum likes (for posts and replies)
CREATE TABLE forum_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
    reply_id UUID REFERENCES forum_replies(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, post_id),
    UNIQUE(user_id, reply_id),
    CHECK ((post_id IS NOT NULL) OR (reply_id IS NOT NULL))
);

-- Announcements
CREATE TABLE announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type announcement_type NOT NULL DEFAULT 'general',
    author_id UUID REFERENCES profiles(id) NOT NULL,
    target_audience target_audience NOT NULL DEFAULT 'all',
    nursery_location nursery_location,
    scheduled_for TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_published BOOLEAN DEFAULT TRUE,
    read_by UUID[], -- Array of user IDs who have read
    likes UUID[], -- Array of user IDs who liked
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- QR Code pickup system
CREATE TABLE qr_pickups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    child_id UUID REFERENCES children(id) ON DELETE CASCADE NOT NULL,
    parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    qr_code TEXT UNIQUE NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE,
    used_by_staff_id UUID REFERENCES profiles(id),
    pickup_notes TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- Notifications
CREATE TABLE notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type notification_type NOT NULL DEFAULT 'info',
    read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    data JSONB, -- Additional structured data
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events and calendar
CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    end_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    event_type TEXT, -- 'closure', 'celebration', 'trip', 'meeting'
    target_audience target_audience DEFAULT 'all',
    nursery_location nursery_location,
    max_attendees INTEGER,
    rsvp_required BOOLEAN DEFAULT FALSE,
    rsvp_deadline TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES profiles(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event RSVPs
CREATE TABLE event_rsvps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    attending BOOLEAN NOT NULL,
    number_of_attendees INTEGER DEFAULT 1,
    dietary_requirements TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- File uploads
CREATE TABLE file_uploads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    uploader_id UUID REFERENCES profiles(id) NOT NULL,
    filename TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type TEXT NOT NULL,
    category TEXT, -- 'child_photo', 'document', 'policy', 'general'
    related_child_id UUID REFERENCES children(id),
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fee payments and invoicing
CREATE TABLE invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    parent_id UUID REFERENCES profiles(id) NOT NULL,
    child_id UUID REFERENCES children(id) NOT NULL,
    invoice_number TEXT UNIQUE NOT NULL,
    amount_due DECIMAL(10,2) NOT NULL,
    amount_paid DECIMAL(10,2) DEFAULT 0,
    due_date DATE NOT NULL,
    invoice_date DATE NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'overdue', 'cancelled'
    items JSONB, -- Line items
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invoice_id UUID REFERENCES invoices(id) NOT NULL,
    parent_id UUID REFERENCES profiles(id) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method TEXT, -- 'bank_transfer', 'card', 'cash', 'voucher'
    payment_reference TEXT,
    payment_date DATE NOT NULL,
    processed_by UUID REFERENCES profiles(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_pickups ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: Users can read/update their own profile, staff can read others
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Staff can read all profiles" ON profiles FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('teacher', 'admin', 'support_staff')
    )
);

-- Children: Parents can access their children, staff can access all
CREATE POLICY "Parents can access their children" ON children FOR ALL USING (
    parent_id = auth.uid()
);
CREATE POLICY "Staff can access all children" ON children FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('teacher', 'admin', 'support_staff')
    )
);

-- Applications: Applicants can see their own, staff can see all
CREATE POLICY "Users can see own applications" ON applications FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND email = applications.parent_email
    )
);
CREATE POLICY "Staff can see all applications" ON applications FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('admin', 'support_staff')
    )
);

-- Contact submissions: Staff only
CREATE POLICY "Staff can access contact submissions" ON contact_submissions FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('teacher', 'admin', 'support_staff')
    )
);

-- Attendance: Parents see their children's, staff see all
CREATE POLICY "Parents can see their children's attendance" ON attendance FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM children 
        WHERE id = attendance.child_id 
        AND parent_id = auth.uid()
    )
);
CREATE POLICY "Staff can access all attendance" ON attendance FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('teacher', 'admin', 'support_staff')
    )
);

-- Daily updates: Similar to attendance
CREATE POLICY "Parents can see their children's daily updates" ON daily_updates FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM children 
        WHERE id = daily_updates.child_id 
        AND parent_id = auth.uid()
    )
);
CREATE POLICY "Staff can access all daily updates" ON daily_updates FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('teacher', 'admin', 'support_staff')
    )
);

-- Forum: Authenticated users can participate
CREATE POLICY "Authenticated users can read forum posts" ON forum_posts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can create forum posts" ON forum_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update their posts" ON forum_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors and admins can delete posts" ON forum_posts FOR DELETE USING (
    auth.uid() = author_id OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Forum replies
CREATE POLICY "Authenticated users can read forum replies" ON forum_replies FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can create forum replies" ON forum_replies FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update their replies" ON forum_replies FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors and admins can delete replies" ON forum_replies FOR DELETE USING (
    auth.uid() = author_id OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Forum likes
CREATE POLICY "Users can manage their own likes" ON forum_likes FOR ALL USING (auth.uid() = user_id);

-- Announcements: All can read, staff can manage
CREATE POLICY "All can read published announcements" ON announcements FOR SELECT USING (is_published = true);
CREATE POLICY "Staff can manage announcements" ON announcements FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('teacher', 'admin', 'support_staff')
    )
);

-- QR pickups: Parents and staff
CREATE POLICY "Parents can manage their QR codes" ON qr_pickups FOR ALL USING (parent_id = auth.uid());
CREATE POLICY "Staff can access all QR codes" ON qr_pickups FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('teacher', 'admin', 'support_staff')
    )
);

-- Notifications: Users see their own
CREATE POLICY "Users can see their notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Events: All can read, staff can manage
CREATE POLICY "All can read events" ON events FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Staff can manage events" ON events FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('teacher', 'admin', 'support_staff')
    )
);

-- Event RSVPs: Users manage their own
CREATE POLICY "Users can manage their RSVPs" ON event_rsvps FOR ALL USING (auth.uid() = user_id);

-- File uploads: Based on category and ownership
CREATE POLICY "Users can see public files" ON file_uploads FOR SELECT USING (is_public = true);
CREATE POLICY "Users can see their own files" ON file_uploads FOR SELECT USING (auth.uid() = uploader_id);
CREATE POLICY "Staff can see all files" ON file_uploads FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('teacher', 'admin', 'support_staff')
    )
);
CREATE POLICY "Users can upload files" ON file_uploads FOR INSERT WITH CHECK (auth.uid() = uploader_id);

-- Invoices and payments: Parents see their own, staff see all
CREATE POLICY "Parents can see their invoices" ON invoices FOR SELECT USING (parent_id = auth.uid());
CREATE POLICY "Staff can access all invoices" ON invoices FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('admin', 'support_staff')
    )
);

CREATE POLICY "Parents can see their payments" ON payments FOR SELECT USING (parent_id = auth.uid());
CREATE POLICY "Staff can access all payments" ON payments FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('admin', 'support_staff')
    )
);

-- Functions and Triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON children FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_daily_updates_updated_at BEFORE UPDATE ON daily_updates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON forum_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forum_replies_updated_at BEFORE UPDATE ON forum_replies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', 'New User'),
        COALESCE(new.raw_user_meta_data->>'role', 'parent')::user_role
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update forum post reply counts
CREATE OR REPLACE FUNCTION update_forum_post_reply_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE forum_posts 
        SET replies_count = replies_count + 1 
        WHERE id = NEW.post_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE forum_posts 
        SET replies_count = replies_count - 1 
        WHERE id = OLD.post_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER forum_reply_count_trigger
    AFTER INSERT OR DELETE ON forum_replies
    FOR EACH ROW EXECUTE FUNCTION update_forum_post_reply_count();

-- Function to create notification for new daily update
CREATE OR REPLACE FUNCTION notify_parent_daily_update()
RETURNS TRIGGER AS $$
DECLARE
    parent_id UUID;
    child_name TEXT;
BEGIN
    -- Get parent ID and child name
    SELECT c.parent_id, c.first_name INTO parent_id, child_name
    FROM children c WHERE c.id = NEW.child_id;
    
    -- Create notification
    INSERT INTO notifications (user_id, title, message, type, action_url)
    VALUES (
        parent_id,
        'Daily Update Available',
        'New daily update for ' || child_name || ' is now available.',
        'info',
        '/dashboard?tab=daily-updates&child=' || NEW.child_id
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER daily_update_notification_trigger
    AFTER INSERT ON daily_updates
    FOR EACH ROW EXECUTE FUNCTION notify_parent_daily_update();

-- Indexes for better performance
CREATE INDEX idx_children_parent_id ON children(parent_id);
CREATE INDEX idx_attendance_child_date ON attendance(child_id, date);
CREATE INDEX idx_daily_updates_child_date ON daily_updates(child_id, date);
CREATE INDEX idx_forum_posts_category ON forum_posts(category);
CREATE INDEX idx_forum_replies_post_id ON forum_replies(post_id);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, read);
CREATE INDEX idx_events_start_datetime ON events(start_datetime);
CREATE INDEX idx_qr_pickups_active ON qr_pickups(is_active, expires_at);
CREATE INDEX idx_announcements_published ON announcements(is_published, created_at);

-- Sample data for testing (optional)
-- This would typically be removed in production

-- Insert sample admin user (you'll need to update the UUID to match your auth user)
-- INSERT INTO profiles (id, email, full_name, role) 
-- VALUES ('your-admin-user-uuid', 'admin@hillcrestrisingstars.com', 'Admin User', 'admin');
