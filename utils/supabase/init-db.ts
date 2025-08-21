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

    if (selectError && selectError.code === 'PGRST116') {
      // Table doesn't exist, skip initialization
      console.log('Categories table does not exist, skipping initialization');
      return;
    }

    if (existingCategories && existingCategories.length > 0) {
      console.log('Categories already initialized');
      return;
    }

    // Insert default categories
    const defaultCategories = [
      {
        name: 'Men',
        slug: 'men',
        description: 'Men\'s clothing and accessories',
        sort_order: 1,
        is_active: true
      },
      {
        name: 'Women',
        slug: 'women',
        description: 'Women\'s clothing and accessories',
        sort_order: 2,
        is_active: true
      },
      {
        name: 'Kids',
        slug: 'kids',
        description: 'Children\'s clothing',
        sort_order: 3,
        is_active: true
      },
      {
        name: 'Accessories',
        slug: 'accessories',
        description: 'Fashion accessories',
        sort_order: 4,
        is_active: true
      },
      {
        name: 'Summer Collection',
        slug: 'summer',
        description: 'Summer collection items',
        sort_order: 5,
        is_active: true
      }
    ];

    const { error } = await supabase
      .from('categories')
      .insert(defaultCategories);

    if (error) {
      console.error('Error inserting default categories:', error);
    } else {
      console.log('Default categories inserted successfully');
    }
  } catch (error) {
    console.error('Error initializing categories:', error);
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
