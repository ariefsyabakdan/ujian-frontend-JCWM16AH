import axios from "axios";

export const authLogin = (email, password) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:2021/users?email=${email}&password=${password}`)
      .then((res) => {
        if (res.data.length > 0) {
          localStorage.setItem("tkn_id", res.data[0].id);
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data[0] });
          console.log("hehe");
        } else {
          axios.post(`http://localhost:2021/users`, {
            email: email,
            password: password,
            cart: [],
          });
        }
      })
      .catch((err) => {
        console.log("Gagal Login", err);
      });
  };
};

export const keepLogin = (data) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: data,
  };
};

export const authLogout = () => {
  return {
    type: "LOGOUT",
  };
};

export const updateCart = (data) => {
  return {
    type: "UPDATE_CART",
    payload: data,
  };
};
