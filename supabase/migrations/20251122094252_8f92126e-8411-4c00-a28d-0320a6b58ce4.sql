-- Add annual_income and credit_score columns to users table
ALTER TABLE public.users
ADD COLUMN annual_income text,
ADD COLUMN credit_score text;