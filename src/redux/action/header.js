import axios from "axios";
import { NOTIFICATION, NOTIFICATION_2 } from "./type";
export const notificationFun = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://api.npoint.io/fbc14eee7441f3b8877b/header/notification"
    );
    dispatch({
      type: NOTIFICATION,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const notificationFun2 = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://api.npoint.io/fbc14eee7441f3b8877b/header/notification2"
    );
    dispatch({
      type: NOTIFICATION_2,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
