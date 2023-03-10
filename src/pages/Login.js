import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import { useAuth } from "../providers/auth-provider";

const Login = () => {

  const { login } = useAuth();

  const inputs = [
    {
      name: "email",
      type: "email"
    },
    {
      name: "password",
      type: "password"
    }
  ];

  return (
    <div>
      <Form title="Login" onSubmit={login} inputs={inputs} />
      <p>
        Don't have an account? 
      </p>
      <Link to="/signup">Sign up here</Link>
    </div>
  );
  
}

export default Login;