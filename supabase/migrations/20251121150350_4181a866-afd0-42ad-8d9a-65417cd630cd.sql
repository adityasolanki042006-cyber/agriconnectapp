-- Add farmer-specific fields to users table
ALTER TABLE public.users
ADD COLUMN field_size text,
ADD COLUMN location text,
ADD COLUMN soil_type text,
ADD COLUMN major_crops text[];