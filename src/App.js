import React from "react";
import UnauthenticatedApp from "./UnauthenticatedApp";
import AuthenticatedApp  from "./AuthenticatedApp";
import { useAuth } from "./providers/auth-provider";

const App = () => {

  const { user } = useAuth();

  console.log('user = ', user)
  
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;

}

export default App;