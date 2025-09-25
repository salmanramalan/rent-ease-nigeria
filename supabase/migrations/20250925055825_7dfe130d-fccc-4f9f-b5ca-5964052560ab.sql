-- Enable real-time updates for properties table
ALTER TABLE public.properties REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.properties;

-- Enable real-time updates for tenants table  
ALTER TABLE public.tenants REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tenants;

-- Enable real-time updates for profiles table
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;