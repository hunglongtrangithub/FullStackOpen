const LoginForm = ({
  username,
  password,
  setPassword,
  setUsername,
  handleLogin,
}) => (
  <form onSubmit={handleLogin}>
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

export default LoginForm;
