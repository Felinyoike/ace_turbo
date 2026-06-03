-- Add start_year and end_year columns to turbos table
-- This matches the legacy tbl_product table structure

-- First, check if the columns exist (MySQL 8.0+)
-- Run this to see current structure:
-- DESCRIBE turbos;

-- Add start_year column (year the turbo model started production)
ALTER TABLE turbos 
ADD COLUMN IF NOT EXISTS start_year INT(4) DEFAULT NULL COMMENT 'First year this turbo was manufactured' 
AFTER year;

-- Add end_year column (year the turbo model ended production)
ALTER TABLE turbos 
ADD COLUMN IF NOT EXISTS end_year INT(4) DEFAULT NULL COMMENT 'Last year this turbo was manufactured' 
AFTER start_year;

-- Add index for performance on year range queries
CREATE INDEX IF NOT EXISTS idx_year_range ON turbos(start_year, end_year);

-- Optional: Update existing records if you have year data
-- This sets start_year and end_year to the single 'year' value for existing records
UPDATE turbos 
SET start_year = year, end_year = year 
WHERE year IS NOT NULL 
  AND (start_year IS NULL OR end_year IS NULL);

-- Verify the changes
SELECT 
    COLUMN_NAME, 
    DATA_TYPE, 
    IS_NULLABLE, 
    COLUMN_DEFAULT, 
    COLUMN_COMMENT 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'turbos' 
  AND COLUMN_NAME IN ('year', 'start_year', 'end_year');
