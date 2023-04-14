import { signInWithGoogle } from "./firebase";

const Login = () => {
  return <button onClick={signInWithGoogle}>Click to Sign in</button>;
};

export default Login;