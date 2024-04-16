import React from "react";
import foto from "./assets/images/background.png"
import logo from "./assets/images/logo.png"
function Login() {
  return (
    <>
    <div class="welcomeBoard" >
        <img src={foto}alt="" id="backgroundWelcome"/>
    </div>
    <div div class="welcomePhrase">
        <h1>Welcome to <span>Liferay</span></h1>
    </div>
    <form>
      <div class="loginForm">
        <div class="labelForm">
          <label for="Email">Email</label>
          <br/>
          <input type="email" id="email" name="email" required/>
        </div>

        <div class="labelForm">
                <label for="password">Password:</label>
                <br/>
                <input type="password" id="password" name="password" required/>
            </div>
            <input type="reset" value="Forgot your Password"/>
            <input type="submit" value="Login"/>
      </div>
    </form>
    <div class="logo" >
        <img src={logo}alt="" id="logoPosition"/>
    </div>


    </>
      
  );
}

export default Login;