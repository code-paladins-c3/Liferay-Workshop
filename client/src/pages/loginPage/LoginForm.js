import React from 'react';

const LoginForm = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Implement login logic here, e.g., using an API call
      console.log('Login attempted:', username, password);
  
      // Reset form fields after submission (optional)
      setUsername('');
      setPassword('');
    };
  
    return (
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <br />
          <button type="submit">Login</button>
        </form>
        <a href="/forgot-password">Forgot Password</a>
      </div>
    );
  };
  
  export default LoginForm;
  