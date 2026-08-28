/*
# Fix security advisor warnings

1. Revoke EXECUTE on `handle_new_user()` from anon and authenticated — it's a trigger function
   that should only be called by the database trigger, not via the REST API.
2. Set a fixed search_path on `update_updated_at()` via ALTER FUNCTION to preserve existing triggers.
*/

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated;

ALTER FUNCTION public.update_updated_at() SET search_path = public;
