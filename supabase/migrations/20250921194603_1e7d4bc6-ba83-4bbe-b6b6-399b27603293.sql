-- Enable RLS on subscription_plans table (it was missing)
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;