const SignUp = () => {
  return (
    <div className="signUp">
      <form>
        <input type="text" name="username" placeholder="User name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
        />
      </form>
    </div>
  );
};

export default SignUp;
