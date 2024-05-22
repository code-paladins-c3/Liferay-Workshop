import supabase from './supabaseClient';
import User from "../api/services/User";

class AuthService {
  static async login(email, password) {
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    if (error) {
      alert("Login nao existe");
      throw error;
    }

    return { user, session };
  }

  static async logout() {
    await supabase.auth.signOut();
  }

  static async getCurrentUser() {
    const user = await supabase.auth.user();
    return user;
  }
}

export default AuthService;