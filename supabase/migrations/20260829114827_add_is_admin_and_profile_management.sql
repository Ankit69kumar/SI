/*
# Add is_admin() function and admin profile management

## Overview
The existing RLS policies check `auth.jwt() -> 'raw_app_meta_data' ->> 'role' = 'admin'`
for admin access. But new users signing up via Supabase Auth don't get a 'role' in their
JWT metadata — their role lives in the `profiles` table. This migration:

1. Creates an `is_admin()` SECURITY DEFINER function that checks the profiles table.
2. Updates all admin-checking RLS policies to use `is_admin()` instead of JWT.
3. Adds admin SELECT and UPDATE policies on the profiles table so admins can
   view all users and change their roles.

## New Functions
- `is_admin()` — returns true if the current authenticated user has role='admin' in profiles.

## Modified Policies
- profiles: added admin SELECT (all users) and admin UPDATE (change role/status)
- service_categories: admin INSERT/UPDATE/DELETE now use is_admin()
- providers: admin UPDATE/DELETE now use is_admin()
- service_requests: admin SELECT/UPDATE/DELETE now use is_admin()
- reviews: admin DELETE now uses is_admin()
- complaints: admin SELECT/UPDATE/DELETE now use is_admin()

## Security
- is_admin() is SECURITY DEFINER with fixed search_path, EXECUTE revoked from anon/public.
- All admin policies now consistently check is_admin() instead of JWT metadata.
*/

-- ============================================================
-- 1. CREATE is_admin() function
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon, public;

-- ============================================================
-- 2. PROFILES — add admin policies
-- ============================================================
-- Admin can SELECT all profiles (to manage users)
DROP POLICY IF EXISTS "select_admin_profiles" ON profiles;
CREATE POLICY "select_admin_profiles" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id OR public.is_admin());

-- Admin can UPDATE any profile (change role, status)
DROP POLICY IF EXISTS "update_admin_profiles" ON profiles;
CREATE POLICY "update_admin_profiles" ON profiles FOR UPDATE
  TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============================================================
-- 3. SERVICE CATEGORIES — update admin policies
-- ============================================================
DROP POLICY IF EXISTS "insert_categories" ON service_categories;
CREATE POLICY "insert_categories" ON service_categories FOR INSERT
  TO authenticated WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "update_categories" ON service_categories;
CREATE POLICY "update_categories" ON service_categories FOR UPDATE
  TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "delete_categories" ON service_categories;
CREATE POLICY "delete_categories" ON service_categories FOR DELETE
  TO authenticated USING (public.is_admin());

-- ============================================================
-- 4. PROVIDERS — update admin policies
-- ============================================================
DROP POLICY IF EXISTS "update_admin_provider" ON providers;
CREATE POLICY "update_admin_provider" ON providers FOR UPDATE
  TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "delete_admin_provider" ON providers;
CREATE POLICY "delete_admin_provider" ON providers FOR DELETE
  TO authenticated USING (public.is_admin());

-- ============================================================
-- 5. SERVICE REQUESTS — update admin policies
-- (replace the existing select/update/delete with is_admin versions)
-- ============================================================
DROP POLICY IF EXISTS "select_service_requests" ON service_requests;
CREATE POLICY "select_service_requests" ON service_requests FOR SELECT
  TO authenticated USING (
    customer_id = auth.uid()
    OR provider_id IN (SELECT id FROM providers WHERE user_id = auth.uid())
    OR public.is_admin()
  );

DROP POLICY IF EXISTS "update_own_service_request" ON service_requests;
CREATE POLICY "update_own_service_request" ON service_requests FOR UPDATE
  TO authenticated
  USING (
    customer_id = auth.uid()
    OR provider_id IN (SELECT id FROM providers WHERE user_id = auth.uid())
    OR public.is_admin()
  )
  WITH CHECK (
    customer_id = auth.uid()
    OR provider_id IN (SELECT id FROM providers WHERE user_id = auth.uid())
    OR public.is_admin()
  );

DROP POLICY IF EXISTS "delete_own_service_request" ON service_requests;
CREATE POLICY "delete_own_service_request" ON service_requests FOR DELETE
  TO authenticated USING (
    customer_id = auth.uid()
    OR public.is_admin()
  );

-- ============================================================
-- 6. REVIEWS — update admin delete policy
-- ============================================================
DROP POLICY IF EXISTS "delete_own_review" ON reviews;
CREATE POLICY "delete_own_review" ON reviews FOR DELETE
  TO authenticated USING (
    customer_id = auth.uid()
    OR public.is_admin()
  );

-- ============================================================
-- 7. COMPLAINTS — update admin policies
-- ============================================================
DROP POLICY IF EXISTS "select_complaints" ON complaints;
CREATE POLICY "select_complaints" ON complaints FOR SELECT
  TO authenticated USING (
    complainant_id = auth.uid()
    OR public.is_admin()
  );

DROP POLICY IF EXISTS "update_admin_complaint" ON complaints;
CREATE POLICY "update_admin_complaint" ON complaints FOR UPDATE
  TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "delete_admin_complaint" ON complaints;
CREATE POLICY "delete_admin_complaint" ON complaints FOR DELETE
  TO authenticated USING (public.is_admin());
