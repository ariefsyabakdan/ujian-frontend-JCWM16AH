import axios from "axios";

export const getProductAction = (data) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:2021/products`)
      .then((res) => {
        dispatch({
          type: "GET_PRODUCTS",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log("gagal get Product", err);
      });
  };
};
