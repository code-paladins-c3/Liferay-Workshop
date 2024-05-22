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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data: users, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("Login não existe");
        throw error;
      }

      const { data: userPublic, error: dataError } = await supabase
        .from('users')
        .select('id_user, first_access')
        .eq('id_user', users.user.id)
        .single();

      if (dataError) {
        throw dataError;
      }

      if (userPublic && userPublic.first_access) {
        navigate('/firstaccess');
      } else {
        navigate('/eventcreate');
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
          <label htmlFor="email">Email</label>
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
        <input className="Forgot" type="reset" value="Forgot your Password" />
        <button type="submit" className="buttonLogin" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </div>
      <div className="logo">
        <img src={logo} alt="logo" id="logoPosition" />
      </div>
    </form>
  );
}

export default Login;
