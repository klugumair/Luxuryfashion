@@ .. @@
 -- Example: Uncomment and replace with your email after signup
--- INSERT INTO user_roles (user_id, role) 
--- SELECT id, 'admin' FROM auth.users WHERE email = 'admin@example.com'
--- ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
+-- Grant admin access to the specific email
+INSERT INTO user_roles (user_id, role) 
+SELECT id, 'admin' FROM auth.users WHERE email = 'umairjalbani80@gmail.com'
+ON CONFLICT (user_id) DO UPDATE SET role = 'admin', updated_at = NOW();