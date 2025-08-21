import { supabase } from './client';

export async function initializeDatabase() {
  try {
    console.log('Initializing database...');

    // Check if tables exist and create them if they don't
    const tableExists = await checkTableExists('products');
    
    if (!tableExists) {
      console.log('Creating database tables...');
      await createTables();
    } else {
      console.log('Database tables already exist');
    }

    // Initialize default categories
    await initializeCategories();
    
    console.log('Database initialization complete');
    return { success: true };
  } catch (error) {
    console.error('Database initialization failed:', error);
    return { success: false, error };
  }
}

async function checkTableExists(tableName: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('id')
      .limit(1);
    
    return !error;
  } catch (error) {
    return false;
  }
}

async function createTables() {
  // This would typically be done via SQL, but for demo purposes
  // we'll assume tables exist or are created via the SQL file
  console.log('Tables should be created via the Supabase SQL editor using schema.sql');
}

async function initializeCategories() {
  try {
    // Check if categories already exist
    const { data: existingCategories, error: selectError } = await supabase
      .from('categories')
      .select('slug')
      .limit(1);

    if (selectError) {
      console.error('Error checking categories:', selectError.message);
      return;
    }

    if (existingCategories && existingCategories.length > 0) {
      console.log('Categories already exist in database');
      return;
    }

    console.log('No categories found, this should not happen with current database setup');
    // Categories should already exist based on the database schema
  } catch (error: any) {
    const errorMessage = error?.message || error?.toString() || 'Unknown error';
    console.error('Error initializing categories:', errorMessage);
  }
}

// Function to test database connection
export async function testDatabaseConnection() {
  try {
    // Try to select from a system table that should always exist
    const { data, error } = await supabase
      .from('categories')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Database connection test failed:', error);
      return { connected: false, error: error.message };
    }

    return { connected: true };
  } catch (error) {
    console.error('Database connection test error:', error);
    return { connected: false, error: error.message };
  }
}
