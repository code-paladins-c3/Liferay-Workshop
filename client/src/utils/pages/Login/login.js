import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../config/supabaseClient";
import foto from "./assets/images/background.png";
import logo from "./assets/images/logo.png";

const SessionContext = createContext(null);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserProfile = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id);

        if (error) {
          console.error("Error checking user profile:", error);
          return;
        }

        // If user profile doesn't exist, create one
        if (!data || data.length === 0) {
          await supabase.from("profiles").insert([
            { id: user.id, First_Access: true },
          ]);
        }
      }
    };

    checkUserProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("Login não existe");
        throw error;
      }

      const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('id, First_Access')
        .eq('id', user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      if (userProfile && userProfile.First_Access) {
        navigate('/firstaccess');
      } else {
        navigate('/mainevents');
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <div className="welcomeBoard desktop-only">
        <img src={foto} alt="background" id="backgroundWelcome" />
      </div>
      <div className="welcomePhrase desktop-only">
        <h1>Welcome to <span>Liferay</span></h1>
      </div>
      <div className="loginForm">
        <div className="labelForm">
          <label htmlFor="email" id="login">Email</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="labelForm">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttonPlace">
        
          <input className="Forgot" type="reset" value="Forgot your Password" />
          <button type="submit" className="buttonLogin" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>

        </div>
        
      </div>
      <div className="logo">
        <img src={logo} alt="logo" id="logoPosition" />
      </div>
    </form>
  );
}

export default Login;
