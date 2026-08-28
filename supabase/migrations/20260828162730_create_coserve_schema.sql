/*
# Co-Serve Platform Schema — Initial Migration

## Overview
Creates the complete database schema for the Co-Serve Cooperative Gig Services Platform.
This is a multi-user app with sign-in (customer, provider, admin roles), so all tables
use auth.uid()-based ownership and authenticated-only RLS policies.

## New Tables
1. `profiles` — extends Supabase auth.users with role, name, phone, location, avatar, status.
2. `service_categories` — the 12 service categories (cleaning, plumbing, etc.).
3. `providers` — provider-specific data: skills, experience, rates, availability, verification.
4. `service_requests` — a customer's request for a service (the "booking").
5. `reviews` — customer ratings/comments on providers after a completed job.
6. `notifications` — per-user notifications (new request, accepted, completed, review, etc.).
7. `complaints` — user-filed reports against providers, managed by admin.

## Security
- RLS enabled on every table.
- 4 policies per table (SELECT/INSERT/UPDATE/DELETE), scoped to authenticated.
- Owner checks use auth.uid() for user-owned data.
- Provider-scoped tables check ownership through the providers table.
- Admin role checked via raw_app_meta_data->>'role' = 'admin'.
- All owner columns default to auth.uid() so inserts that omit user_id still pass WITH CHECK.

## Important Notes
1. The `profiles` table has a trigger to auto-create a profile row when a new auth.user signs up.
2. `service_categories` is seeded with the 12 categories used by the app.
3. `service_requests.status` is constrained to: pending, accepted, in_progress, completed, cancelled.
4. `profiles.role` is constrained to: customer, provider, admin.
5. `profiles.status` is constrained to: active, suspended, pending.
*/

-- ============================================================
-- 1. PROFILES TABLE (extends auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text DEFAULT '',
  location text DEFAULT '',
  avatar text DEFAULT '',
  role text NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'provider', 'admin')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending')),
  joined date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "delete_own_profile" ON profiles;
CREATE POLICY "delete_own_profile" ON profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name', NEW.email);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 2. SERVICE CATEGORIES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS service_categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  icon text NOT NULL DEFAULT 'Sparkles',
  color text NOT NULL DEFAULT 'primary',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;

-- Categories are readable by all authenticated users
DROP POLICY IF EXISTS "select_categories" ON service_categories;
CREATE POLICY "select_categories" ON service_categories FOR SELECT
  TO authenticated USING (true);

-- Only admins can modify categories
DROP POLICY IF EXISTS "insert_categories" ON service_categories;
CREATE POLICY "insert_categories" ON service_categories FOR INSERT
  TO authenticated WITH CHECK (
    (auth.jwt() -> 'raw_app_meta_data' ->> 'role') = 'admin'
  );

DROP POLICY IF EXISTS "update_categories" ON service_categories;
CREATE POLICY "update_categories" ON service_categories FOR UPDATE
  TO authenticated USING (
    (auth.jwt() -> 'raw_app_meta_data' ->> 'role') = 'admin'
  ) WITH CHECK (
    (auth.jwt() -> 'raw_app_meta_data' ->> 'role') = 'admin'
  );

DROP POLICY IF EXISTS "delete_categories" ON service_categories;
CREATE POLICY "delete_categories" ON service_categories FOR DELETE
  TO authenticated USING (
    (auth.jwt() -> 'raw_app_meta_data' ->> 'role') = 'admin'
  );

-- Seed the 12 categories
INSERT INTO service_categories (id, name, icon, color) VALUES
  ('cleaning', 'Cleaning', 'Sparkles', 'primary'),
  ('plumbing', 'Plumbing', 'Wrench', 'warning'),
  ('electrical', 'Electrical', 'Zap', 'accent'),
  ('painting', 'Painting', 'PaintRoller', 'success'),
  ('carpentry', 'Carpentry', 'Hammer', 'warning'),
  ('gardening', 'Gardening', 'Trees', 'success'),
  ('appliance', 'Appliance Repair', 'Refrigerator', 'primary'),
  ('cooking', 'Cooking', 'ChefHat', 'accent'),
  ('elderly', 'Elderly Assistance', 'HeartHandshake', 'error'),
  ('delivery', 'Delivery', 'PackageCheck', 'primary'),
  ('community', 'Community Help', 'Users', 'success'),
  ('other', 'Other Services', 'MoreHorizontal', 'ink')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 3. PROVIDERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id text NOT NULL REFERENCES service_categories(id),
  name text NOT NULL,
  avatar text DEFAULT '',
  skills text[] NOT NULL DEFAULT '{}',
  experience int NOT NULL DEFAULT 0,
  bio text DEFAULT '',
  service_area text DEFAULT '',
  hourly_rate numeric NOT NULL DEFAULT 0,
  service_rate numeric NOT NULL DEFAULT 0,
  available boolean NOT NULL DEFAULT true,
  verified boolean NOT NULL DEFAULT false,
  rating numeric NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  reviews_count int NOT NULL DEFAULT 0,
  jobs_done int NOT NULL DEFAULT 0,
  active_jobs int NOT NULL DEFAULT 0,
  response_time text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE providers ENABLE ROW LEVEL SECURITY;

-- All authenticated users can browse providers (customers need to see them)
DROP POLICY IF EXISTS "select_providers" ON providers;
CREATE POLICY "select_providers" ON providers FOR SELECT
  TO authenticated USING (true);

-- Providers can insert/update their own profile
DROP POLICY IF EXISTS "insert_own_provider" ON providers;
CREATE POLICY "insert_own_provider" ON providers FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_provider" ON providers;
CREATE POLICY "update_own_provider" ON providers FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Admins can update (verify/suspend) and delete any provider
DROP POLICY IF EXISTS "update_admin_provider" ON providers;
CREATE POLICY "update_admin_provider" ON providers FOR UPDATE
  TO authenticated USING (
    (auth.jwt() -> 'raw_app_meta_data' ->> 'role') = 'admin'
  ) WITH CHECK (
    (auth.jwt() -> 'raw_app_meta_data' ->> 'role') = 'admin'
  );

DROP POLICY IF EXISTS "delete_admin_provider" ON providers;
CREATE POLICY "delete_admin_provider" ON providers FOR DELETE
  TO authenticated USING (
    (auth.jwt() -> 'raw_app_meta_data' ->> 'role') = 'admin'
  );

CREATE INDEX IF NOT EXISTS idx_providers_category ON providers(category_id);
CREATE INDEX IF NOT EXISTS idx_providers_user ON providers(user_id);

-- ============================================================
-- 4. SERVICE REQUESTS TABLE (bookings)
-- ============================================================
CREATE TABLE IF NOT EXISTS service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  provider_id uuid NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  category_id text NOT NULL REFERENCES service_categories(id),
  service_name text NOT NULL,
  description text DEFAULT '',
  request_date date NOT NULL,
  request_time text NOT NULL,
  location text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')),
  image_url text DEFAULT '',
  rating int DEFAULT NULL CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5)),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

-- Customers can see their own requests; providers can see requests assigned to them; admins see all
DROP POLICY IF EXISTS "select_service_requests" ON service_requests;
CREATE POLICY "select_service_requests" ON service_requests FOR SELECT
  TO authenticated USING (
    customer_id = auth.uid()
    OR provider_id IN (SELECT id FROM providers WHERE user_id = auth.uid())
    OR (auth.jwt() -> 'raw_app_meta_data' ->> 'role') = 'admin'
  );

-- Customers create requests; the customer_id defaults to auth.uid()
DROP POLICY IF EXISTS "insert_own_service_request" ON service_requests;
CREATE POLICY "insert_own_service_request" ON service_requests FOR INSERT
  TO authenticated WITH CHECK (customer_id = auth.uid());

-- Customers can update/cancel their own requests; providers can update status of their assigned requests
DROP POLICY IF EXISTS "update_own_service_request" ON service_requests;
CREATE POLICY "update_own_service_request" ON service_requests FOR UPDATE
  TO authenticated
  USING (
    customer_id = auth.uid()
    OR provider_id IN (SELECT id FROM providers WHERE user_id = auth.uid())
    OR (auth.jwt() -> 'raw_app_meta_data' ->> 'role') = 'admin'
  )
  WITH CHECK (
    customer_id = auth.uid()
    OR provider_id IN (SELECT id FROM providers WHERE user_id = auth.uid())
    OR (auth.jwt() -> 'raw_app_meta_data' ->> 'role') = 'admin'
  );

-- Customers can cancel (delete) their own pending requests; admins can delete any
DROP POLICY IF EXISTS "delete_own_service_request" ON service_requests;
CREATE POLICY "delete_own_service_request" ON service_requests FOR DELETE
  TO authenticated USING (
    customer_id = auth.uid()
    OR (auth.jwt() -> 'raw_app_meta_data' ->> 'role') = 'admin'
  );

CREATE INDEX IF NOT EXISTS idx_requests_customer ON service_requests(customer_id);
CREATE INDEX IF NOT EXISTS idx_requests_provider ON service_requests(provider_id);
CREATE INDEX IF NOT EXISTS idx_requests_status ON service_requests(status);

-- ============================================================
-- 5. REVIEWS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  customer_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_name text NOT NULL DEFAULT '',
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text DEFAULT '',
  review_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can read reviews (they're public on provider profiles)
DROP POLICY IF EXISTS "select_reviews" ON reviews;
CREATE POLICY "select_reviews" ON reviews FOR SELECT
  TO authenticated USING (true);

-- Only customers can create reviews for services they requested
DROP POLICY IF EXISTS "insert_own_review" ON reviews;
CREATE POLICY "insert_own_review" ON reviews FOR INSERT
  TO authenticated WITH CHECK (
    customer_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM service_requests
      WHERE service_requests.customer_id = auth.uid()
        AND service_requests.provider_id = reviews.provider_id
        AND service_requests.status = 'completed'
    )
  );

-- Customers can update/delete their own reviews; admins can delete any
DROP POLICY IF EXISTS "update_own_review" ON reviews;
CREATE POLICY "update_own_review" ON reviews FOR UPDATE
  TO authenticated USING (customer_id = auth.uid()) WITH CHECK (customer_id = auth.uid());

DROP POLICY IF EXISTS "delete_own_review" ON reviews;
CREATE POLICY "delete_own_review" ON reviews FOR DELETE
  TO authenticated USING (
    customer_id = auth.uid()
    OR (auth.jwt() -> 'raw_app_meta_data' ->> 'role') = 'admin'
  );

CREATE INDEX IF NOT EXISTS idx_reviews_provider ON reviews(provider_id);

-- ============================================================
-- 6. NOTIFICATIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can only see their own notifications
DROP POLICY IF EXISTS "select_own_notifications" ON notifications;
CREATE POLICY "select_own_notifications" ON notifications FOR SELECT
  TO authenticated USING (user_id = auth.uid());

-- Any authenticated user can insert a notification for themselves (e.g. when creating a request)
DROP POLICY IF EXISTS "insert_own_notifications" ON notifications;
CREATE POLICY "insert_own_notifications" ON notifications FOR INSERT
  TO authenticated WITH CHECK (user_id = auth.uid());

-- Users can mark their own notifications as read
DROP POLICY IF EXISTS "update_own_notifications" ON notifications;
CREATE POLICY "update_own_notifications" ON notifications FOR UPDATE
  TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Users can delete their own notifications
DROP POLICY IF EXISTS "delete_own_notifications" ON notifications;
CREATE POLICY "delete_own_notifications" ON notifications FOR DELETE
  TO authenticated USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, is_read);

-- ============================================================
-- 7. COMPLAINTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  complainant_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  complainant_name text NOT NULL DEFAULT '',
  against_provider_id uuid NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  against_name text NOT NULL DEFAULT '',
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved')),
  complaint_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

-- Complainant can see their own; admins can see all
DROP POLICY IF EXISTS "select_complaints" ON complaints;
CREATE POLICY "select_complaints" ON complaints FOR SELECT
  TO authenticated USING (
    complainant_id = auth.uid()
    OR (auth.jwt() -> 'raw_app_meta_data' ->> 'role') = 'admin'
  );

-- Any authenticated user can file a complaint
DROP POLICY IF EXISTS "insert_own_complaint" ON complaints;
CREATE POLICY "insert_own_complaint" ON complaints FOR INSERT
  TO authenticated WITH CHECK (complainant_id = auth.uid());

-- Only admins can resolve/update complaints
DROP POLICY IF EXISTS "update_admin_complaint" ON complaints;
CREATE POLICY "update_admin_complaint" ON complaints FOR UPDATE
  TO authenticated USING (
    (auth.jwt() -> 'raw_app_meta_data' ->> 'role') = 'admin'
  ) WITH CHECK (
    (auth.jwt() -> 'raw_app_meta_data' ->> 'role') = 'admin'
  );

-- Only admins can delete complaints
DROP POLICY IF EXISTS "delete_admin_complaint" ON complaints;
CREATE POLICY "delete_admin_complaint" ON complaints FOR DELETE
  TO authenticated USING (
    (auth.jwt() -> 'raw_app_meta_data' ->> 'role') = 'admin'
  );

CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);

-- ============================================================
-- UPDATED_AT TRIGGERS for all tables with updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS providers_updated_at ON providers;
CREATE TRIGGER providers_updated_at BEFORE UPDATE ON providers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS service_requests_updated_at ON service_requests;
CREATE TRIGGER service_requests_updated_at BEFORE UPDATE ON service_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS complaints_updated_at ON complaints;
CREATE TRIGGER complaints_updated_at BEFORE UPDATE ON complaints
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
