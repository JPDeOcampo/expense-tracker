const Login = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2>Login</h2>
      <form className="flex flex-col gap-4">
        <div className="group-input">
          <label>Usename</label>
          <input type="username" name="username" />
        </div>
        <div className="group-input">
          <label>Password</label>
          <input type="username" name="username" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
