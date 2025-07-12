-- Create custom types
CREATE TYPE user_role AS ENUM ('parent', 'teacher', 'admin', 'support_staff');
CREATE TYPE nursery_location AS ENUM ('hillcrest', 'riverside');
CREATE TYPE announcement_type AS ENUM ('urgent', 'event', 'celebration', 'general');
CREATE TYPE notification_type AS ENUM ('info', 'warning', 'success', 'urgent');
CREATE TYPE forum_category AS ENUM ('general', 'events', 'questions', 'support');

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'parent',
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Children table
CREATE TABLE children (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    allergies TEXT,
    medical_conditions TEXT,
    emergency_contact_name TEXT NOT NULL,
    emergency_contact_phone TEXT NOT NULL,
    nursery_location nursery_location NOT NULL,
    enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attendance table
CREATE TABLE attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    child_id UUID REFERENCES children(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    check_in_time TIMESTAMPTZ,
    check_out_time TIMESTAMPTZ,
    picked_up_by TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(child_id, date)
);

-- Daily updates table
CREATE TABLE daily_updates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    child_id UUID REFERENCES children(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    meals TEXT NOT NULL,
    naps TEXT NOT NULL,
    activities TEXT NOT NULL,
    mood TEXT NOT NULL,
    notes TEXT,
    photos TEXT[] DEFAULT '{}',
    staff_id UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(child_id, date)
);

-- Forum posts table
CREATE TABLE forum_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category forum_category NOT NULL DEFAULT 'general',
    pinned BOOLEAN DEFAULT FALSE,
    likes_count INTEGER DEFAULT 0,
    replies_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum replies table
CREATE TABLE forum_replies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Announcements table
CREATE TABLE announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type announcement_type NOT NULL DEFAULT 'general',
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    target_audience TEXT NOT NULL DEFAULT 'all',
    scheduled_for TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    read_by UUID[] DEFAULT '{}',
    likes UUID[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- QR pickup codes table
CREATE TABLE qr_pickups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    child_id UUID REFERENCES children(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    qr_code TEXT UNIQUE NOT NULL,
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    used_by_staff_id UUID REFERENCES profiles(id),
    is_active BOOLEAN DEFAULT TRUE
);

-- Notifications table
CREATE TABLE notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type notification_type NOT NULL DEFAULT 'info',
    read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_children_parent_id ON children(parent_id);
CREATE INDEX idx_attendance_child_id ON attendance(child_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_daily_updates_child_id ON daily_updates(child_id);
CREATE INDEX idx_daily_updates_date ON daily_updates(date);
CREATE INDEX idx_forum_posts_category ON forum_posts(category);
CREATE INDEX idx_forum_posts_created_at ON forum_posts(created_at DESC);
CREATE INDEX idx_forum_replies_post_id ON forum_replies(post_id);
CREATE INDEX idx_announcements_type ON announcements(type);
CREATE INDEX idx_announcements_created_at ON announcements(created_at DESC);
CREATE INDEX idx_qr_pickups_child_id ON qr_pickups(child_id);
CREATE INDEX idx_qr_pickups_expires_at ON qr_pickups(expires_at);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_pickups ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Children policies
CREATE POLICY "Parents can view own children" ON children FOR SELECT USING (parent_id = auth.uid());
CREATE POLICY "Staff can view all children" ON children FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('teacher', 'admin', 'support_staff')
    )
);
CREATE POLICY "Parents can insert own children" ON children FOR INSERT WITH CHECK (parent_id = auth.uid());
CREATE POLICY "Parents can update own children" ON children FOR UPDATE USING (parent_id = auth.uid());

-- Attendance policies
CREATE POLICY "Parents can view own children attendance" ON attendance FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM children 
        WHERE id = attendance.child_id 
        AND parent_id = auth.uid()
    )
);
CREATE POLICY "Staff can view and manage all attendance" ON attendance FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('teacher', 'admin', 'support_staff')
    )
);

-- Daily updates policies
CREATE POLICY "Parents can view own children updates" ON daily_updates FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM children 
        WHERE id = daily_updates.child_id 
        AND parent_id = auth.uid()
    )
);
CREATE POLICY "Staff can manage all daily updates" ON daily_updates FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('teacher', 'admin', 'support_staff')
    )
);

-- Forum policies
CREATE POLICY "All authenticated users can view forum posts" ON forum_posts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can create forum posts" ON forum_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own posts" ON forum_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Admins can manage all posts" ON forum_posts FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role = 'admin'
    )
);

-- Forum replies policies
CREATE POLICY "All authenticated users can view forum replies" ON forum_replies FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can create forum replies" ON forum_replies FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own replies" ON forum_replies FOR UPDATE USING (auth.uid() = author_id);

-- Announcements policies
CREATE POLICY "All authenticated users can view announcements" ON announcements FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Staff can manage announcements" ON announcements FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('teacher', 'admin', 'support_staff')
    )
);

-- QR pickups policies
CREATE POLICY "Parents can view own QR codes" ON qr_pickups FOR SELECT USING (parent_id = auth.uid());
CREATE POLICY "Parents can create own QR codes" ON qr_pickups FOR INSERT WITH CHECK (parent_id = auth.uid());
CREATE POLICY "Staff can view and update all QR codes" ON qr_pickups FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('teacher', 'admin', 'support_staff')
    )
);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Staff can create notifications" ON notifications FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('teacher', 'admin', 'support_staff')
    )
);

-- Functions and triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON children FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON forum_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forum_replies_updated_at BEFORE UPDATE ON forum_replies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update forum post reply count
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
$$ language 'plpgsql';

CREATE TRIGGER forum_reply_count_trigger
    AFTER INSERT OR DELETE ON forum_replies
    FOR EACH ROW EXECUTE FUNCTION update_forum_post_reply_count();

-- Insert sample data for development
INSERT INTO profiles (id, email, full_name, role, phone) VALUES
    ('00000000-0000-0000-0000-000000000001', 'admin@hillcrestrisingstars.com', 'Sarah Johnson', 'admin', '+44 7123 456789'),
    ('00000000-0000-0000-0000-000000000002', 'teacher@hillcrestrisingstars.com', 'Emma Davis', 'teacher', '+44 7123 456790'),
    ('00000000-0000-0000-0000-000000000003', 'parent@example.com', 'Michael Thompson', 'parent', '+44 7123 456791'),
    ('00000000-0000-0000-0000-000000000004', 'support@hillcrestrisingstars.com', 'Lisa Wilson', 'support_staff', '+44 7123 456792');

INSERT INTO children (parent_id, first_name, last_name, date_of_birth, emergency_contact_name, emergency_contact_phone, nursery_location) VALUES
    ('00000000-0000-0000-0000-000000000003', 'Sophie', 'Thompson', '2020-05-15', 'Alice Thompson', '+44 7123 456793', 'hillcrest'),
    ('00000000-0000-0000-0000-000000000003', 'James', 'Thompson', '2021-08-22', 'Alice Thompson', '+44 7123 456793', 'riverside');

INSERT INTO announcements (title, content, type, author_id, target_audience) VALUES
    ('Welcome to the New Term!', 'We''re excited to welcome everyone back for the new term. Please check your child''s daily updates for important information.', 'general', '00000000-0000-0000-0000-000000000001', 'all'),
    ('Sports Day Next Friday', 'Don''t forget about our annual sports day next Friday! Please bring sun hats and water bottles.', 'event', '00000000-0000-0000-0000-000000000002', 'parents'),
    ('Sophie''s First Steps!', 'Congratulations to Sophie Thompson who took her first steps today! What an exciting milestone!', 'celebration', '00000000-0000-0000-0000-000000000002', 'all');

INSERT INTO forum_posts (author_id, title, content, category) VALUES
    ('00000000-0000-0000-0000-000000000003', 'Lunch Box Ideas', 'What are your favorite healthy lunch box ideas for toddlers? Looking for some inspiration!', 'questions'),
    ('00000000-0000-0000-0000-000000000001', 'Summer Activities Week', 'We''re planning some exciting summer activities for next week including water play and nature walks!', 'events');
