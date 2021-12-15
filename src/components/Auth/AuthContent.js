import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useCart } from "react-use-cart";
import { getUserData, login, registration } from "../../http/userApi";
import { setIsAuth } from "../../store/isAuthStore";
import { setIsUser } from "../../store/userStore";
import { CART_ROUTE } from "../../utils/consts";
import "./AuthContent.css";

function AuthContent() {
  const [hasAccount, setHasAccount] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { emptyCart } = useCart();

  const signUp = async () => {
    try {
      let data = await registration(userName, email, password);
      setUserName("");
      setEmail("");
      setPassword("");

      dispatch(setIsAuth(true));
      getUserData(dispatch);
      navigate(CART_ROUTE);

      console.log("Registration response", data);
    } catch (e) {
      alert("Неправильно или этот аккаунт уже зарегистрирован!!!");
    }
  };

  const signIn = async () => {
    try {
      const data = await login(userName, password);

      dispatch(setIsAuth(true));
      getUserData(dispatch);

      navigate(CART_ROUTE);

      console.log("Login response", data);
    } catch (e) {
      alert("Неправильно или такой логин уже существует!!!");
    }
  };

  const logout = () => {
    dispatch(setIsAuth(false));
    dispatch(setIsUser({}));
    localStorage.removeItem("token");
    localStorage.clear();
    emptyCart();
  };

  return (
    <div className="authContent">
      <div className="authContent__titles">
        <span onClick={() => setHasAccount(false)}>Sign up</span>
        <span onClick={() => setHasAccount(true)}>Sign in</span>
        <span onClick={() => logout()}>Logout</span>
      </div>
      <div className="authContent__content">
        {hasAccount ? (
          <form onSubmit={(e) => e.preventDefault()}>
            <p>
              <label>UserName:</label>
              <input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                type="text"
              />
            </p>
            <p>
              <label>Password:</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
              />
            </p>
            <button onClick={() => signIn()} type="submit">
              Sign in
            </button>
          </form>
        ) : (
          <form onSubmit={(e) => e.preventDefault()}>
            <p>
              <label>UserName:</label>
              <input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                type="text"
              />
            </p>

            <p>
              <label>Email:</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
              />
            </p>
            <p>
              <label>Password:</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
              />
            </p>

            <button onClick={() => signUp()} type="submit">
              Sign up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthContent;
