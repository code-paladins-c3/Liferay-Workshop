import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from '../../../config/supabaseClient'
import foto from "./assets/images/background.png"
import logo from "./assets/images/logo.png"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {

      const { users, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) 
        alert("Login nao existe");
        throw error;



      // const { data, error: dataError } = await supabase
      //   .from('users')
      //   .select('last_sing_in_at')
      //   .single();

      // if (dataError) throw dataError;

      // if (data.last_sing_in_at) {
      //   navigate("/firstaccess", { state: { userId: users.id } });
      // } else {
      //   navigate("/firstaccess");
      // }

      navigate("/firstaccess");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="welcomeBoard">
        <img src={foto} alt="" id="backgroundWelcome" />
      </div>
      <div className="welcomePhrase">
        <h1>Welcome to <span>Liferay</span></h1>
      </div>
      <div className="loginForm">
        <div className="labelForm">
          <label htmlFor="email">Email</label>
          <br />
          <input type="email" id="email" name="email" required onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="labelForm">
          <label htmlFor="password">Password:</label>
          <br />
          <input type="password" id="password" name="password" required onChange={e => setPassword(e.target.value)} />
        </div>
        <input type="reset" value="Forgot your Password" />
        <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
      </div>
      <div className="logo">
        <img src={logo} alt="" id="logoPosition" />
      </div>
    </form>
  );
}

export default Login;