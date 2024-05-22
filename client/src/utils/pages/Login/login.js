// src/utils/pages/Login/Login.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../config/supabaseClient";
import foto from "./assets/images/background.png";
import logo from "./assets/images/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserProfile = async () => {
      const user = supabase.auth.user();

      if (user) {
        const { data, error } = await supabase
          .from("public.profiles")
          .select("id")
          .eq("uuid", user.id);

        if (error) {
          console.error("Error checking user profile:", error);
          return;
        }

        if (!data || data.length === 0) {
          await supabase.from("public.profiles").insert([
            { uuid: user.id, First_Access: true },
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
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) {
        alert("Login não existe");
        throw error;
      }

      navigate(user ? "/firstaccess" : "/eventcreate");
    } catch (error) {
      console.error("Error signing in:", error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="welcomeBoard desktop-only">
        <img src={foto} alt="" id="backgroundWelcome" />
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
          <label htmlFor="password">Password:</label>
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
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
      <div className="logo">
        <img src={logo} alt="" id="logoPosition" />
      </div>
    </form>
  );
};

export default Login;
