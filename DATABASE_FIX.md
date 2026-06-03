# Database Schema Fix - Adding Year Range Columns

## Problem
The error `Unknown column 'start_year' in 'WHERE'` occurs because your `turbos` table is missing the `start_year` and `end_year` columns that are required for vehicle-year matching.

## Why These Columns Are Needed
In your legacy PHP code (regnum2.php, line 975), the turbo search uses:
```php
AND (start_year > '1999' AND start_year <= '$year') 
AND (end_year >= '$year')
```

This allows matching turbos based on their production year range. For example:
- A turbo for "Audi A3 2.0 TDI" might be used from **2008-2012** (`start_year=2008, end_year=2012`)
- If someone searches for a 2010 A3, it matches because 2010 is between 2008 and 2012

## Solution Options

### Option 1: Add Columns to Database (RECOMMENDED)

**Step 1**: Connect to your MySQL database:
```bash
# Using MySQL command line
mysql -u your_username -p your_database_name

# OR using psql if it's PostgreSQL
psql -U your_username -d your_database_name
```

**Step 2**: Run the migration script:
```bash
# For MySQL
mysql -u your_username -p your_database_name < scripts/add-year-columns.sql

# OR execute line by line in MySQL Workbench / phpMyAdmin
```

**Step 3**: Verify columns were added:
```sql
DESCRIBE turbos;
-- OR
SHOW COLUMNS FROM turbos;
```

You should see:
- `start_year` INT(4) NULL
- `end_year` INT(4) NULL

**Step 4**: Populate the data:

If you're migrating from legacy:
```sql
-- Copy year ranges from legacy tbl_product table
UPDATE turbos t
INNER JOIN tbl_product p ON t.sku = p.turbo_part_no
SET t.start_year = p.start_year, t.end_year = p.end_year;
```

If starting fresh, update manually:
```sql
-- Example: Set year range for a specific turbo
UPDATE turbos 
SET start_year = 2008, end_year = 2012 
WHERE sku = '49173-07508';
```

### Option 2: Modify Code to Work Without Year Columns (TEMPORARY WORKAROUND)

If you can't update the database immediately, modify `src/lib/data-access.ts`:

**Find lines 302-306:**
```typescript
if (filters?.year) {
  // Match turbos whose year range covers the vehicle year
  conditions.push("(start_year IS NULL OR start_year <= ?) AND (end_year IS NULL OR end_year >= ?)");
  params.push(filters.year, filters.year);
}
```

**Replace with:**
```typescript
if (filters?.year) {
  // Temporary: Match on exact year field instead of year range
  conditions.push("(year IS NULL OR year = ?)");
  params.push(filters.year);
}
```

**Note**: This is less accurate since it only matches exact years, not year ranges.

---

## Recommended Approach

1. ✅ **Run the SQL migration** (`scripts/add-year-columns.sql`)
2. ✅ **Populate year data** for your turbos
3. ✅ **Restart your dev server** (if needed)
4. ✅ **Test the vehicle lookup** with a real registration

## After the Fix

Once the columns are added, your vehicle lookup will work exactly like the legacy system:
- User enters registration → Gets vehicle year (e.g., 2010)
- System finds turbos where `start_year <= 2010 AND end_year >= 2010`
- Shows all matching turbos with proper year range filtering

## Testing

After applying the fix, test with:
```bash
# In your browser, search for: AB12CDE
# Or any valid UK registration

# Check the console - you should see:
✓ Compiled /api/turbos in XXXms
GET /api/turbos?make=VAUXHALL&model=ASTRA&year=2017&bhp=125 200 in XXXms
# (No error about 'start_year')
```

## Need Help?

If you encounter issues:
1. Check your database user has ALTER TABLE permissions
2. Verify table name is exactly `turbos` (not `tbl_turbos` or similar)
3. Check MySQL/PostgreSQL version supports `ADD COLUMN IF NOT EXISTS`
4. For older MySQL versions, remove `IF NOT EXISTS` from the SQL script
