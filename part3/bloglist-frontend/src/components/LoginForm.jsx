import { useState } from "react";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (event) => {
    event.preventDefault();
    await handleLogin({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={onLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          className="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          className="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button className="login" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
