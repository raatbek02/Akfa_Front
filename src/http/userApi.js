import { $host } from ".";
import { setIsAuth } from "../store/isAuthStore";
import { setIsUser } from "../store/userStore";

export const registration = async (username, email, password) => {
  const { data } = await $host.post("api/auth/register", {
    username,
    email,
    password,
    role: "ADMIN",
  });

  localStorage.setItem("token", JSON.stringify(data.token));
  return data.token;
};

export const login = async (username, password) => {
  const { data } = await $host.post("api/auth/login", {
    username,
    password,
  });
  localStorage.setItem("token", JSON.stringify(data.token));
  return data.token;
};

// export const check = async () => {
//   const { data } = await $authHost.get("api/auth/user");
//   localStorage.setItem("token", data.token);
//   return data.token;
// };

export const getUserData = (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return $host
    .get(`api/auth/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
    })
    .then(({ data }) => {
      dispatch(setIsAuth(true));
      dispatch(setIsUser(data));
      localStorage.setItem("user_id", data.id);
    })
    .catch((e) => {
      dispatch(setIsAuth(false));
    });
};
