import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useCart } from "react-use-cart";
import { getUserData, login, registration } from "../../http/userApi";
import { setIsAuth } from "../../store/isAuthStore";
import { setIsUser } from "../../store/userStore";
import { CART_ROUTE } from "../../utils/consts";

import google_icon from "../../assets/images/new_design/google_icon.png";
import facebook_icon from "../../assets/images/new_design/facebook_icon.png";

import "./AuthContent.css";

function AuthContent() {
  const [hasAccount, setHasAccount] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpActive, setSignUpActive] = useState(true);
  const [signInActive, setSignInActive] = useState(false);

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
        <span
          onClick={() => {
            setHasAccount(false);
            setSignUpActive(true);
            setSignInActive(false);
          }}
          className={signUpActive ? "active" : ""}
        >
          Создать аккаунт
        </span>
        <span
          onClick={() => {
            setHasAccount(true);
            setSignUpActive(false);
            setSignInActive(true);
          }}
          className={signInActive ? "active" : ""}
        >
          Войти в аккаунт
        </span>
        {/* <span onClick={() => logout()}>Logout</span> */}
      </div>
      <div className="authContent__content">
        {hasAccount ? (
          <form onSubmit={(e) => e.preventDefault()}>
            <p>
              {/* <label>UserName:</label> */}
              <input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                type="text"
                placeholder="User name"
              />
            </p>
            <p>
              {/* <label>Password:</label> */}
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
              />
            </p>
            <div className="authContent__button">
              <button onClick={() => signIn()} type="submit">
                Войти
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="authContent__signUpWith">
              <button>
                <img src={google_icon} alt="" />
                <span>Sign up with Google</span>
              </button>
              <button>
                <img src={facebook_icon} alt="" />

                <span>Sign up with Facebook</span>
              </button>
            </div>

            <div className="authContent__or">
              <div></div>
              <span>Or</span>
              <div></div>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <p>
                {/* <label>UserName:</label> */}
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  type="text"
                  placeholder="User name"
                />
              </p>

              <p>
                {/* <label>Email:</label> */}
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Email address"
                />
              </p>
              <p>
                {/* <label>Password:</label> */}
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                />
              </p>

              <div className="authContent__button">
                <button onClick={() => signUp()} type="submit">
                  Зарегистрироваться
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthContent;
