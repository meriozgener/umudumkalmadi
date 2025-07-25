
// supabaseClient.js
const SUPABASE_URL = 'https://rizenojzaklraiqlgxpk.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpemVub2p6YWtscmFpcWxneHBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4NzUyNzcsImV4cCI6MjA2ODQ1MTI3N30.sxmHSPCibp0W16xT0riMAhAAceXPxIwuDBFtfGeN4ms'

// Initialize Supabase client with proper error handling
function initializeSupabase() {
  try {
    if (typeof window.supabase === 'undefined') {
      console.error('Supabase library not loaded');
      return false;
    }

    const { createClient } = window.supabase;
    
    if (typeof createClient !== 'function') {
      console.error('createClient is not available');
      return false;
    }

    window.supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
    window.supabase = window.supabaseClient;
    
    console.log('Supabase client initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing Supabase:', error);
    return false;
  }
}

// Try to initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit for Supabase library to load
  setTimeout(initializeSupabase, 500);
});

// Also try immediate initialization
if (document.readyState === 'loading') {
  // Document is still loading
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeSupabase, 500);
  });
} else {
  // Document is already loaded
  setTimeout(initializeSupabase, 500);
}

// Export initialization function
window.initializeSupabase = initializeSupabase;
