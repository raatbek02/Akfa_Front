import React from "react";
// import { login, registration } from "../../http/userApi";
import AuthContent from "./AuthContent";

function Auth() {
  //   const [userName, setUserName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [phoneNumber, setPhoneNumber] = useState("");

  //   const signUp = async () => {
  //     const response = await registration();
  //     console.log("Registration response", response);
  //   };
  //   const signIn = async () => {
  //     const response = await login();
  //     console.log("Login response", response);
  //   };
  return (
    <div>
      <AuthContent />
    </div>
  );
}

export default Auth;
