import supabase from "./db";


// sign up
export async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (error) {
      console.error("Error signing up:", error.message);
    } else {
      console.log("User signed up:", data.user);
    }
    return error;
  }
  
  
// sign in
  export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      console.error("Error signing in:", error.message);
    } else {
      console.log("User signed in:", data.user);
    }

    return error;
  }
  
  
// sign out
  export async function signOut() {
    const { error } = await supabase.auth.signOut();
  
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      console.log("User signed out");
    }
  }
