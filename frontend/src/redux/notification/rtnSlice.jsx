import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  likeNotifications: [],
  messageNotifications: [],
};

const rtnSlice = createSlice({
  name: "rtn",
  initialState,
  reducers: {
    setLikeNotifications: (state, action) => {
      if (action.payload.type === "like") {
        state.likeNotifications.push(action.payload);
      } else if (action.payload.type === "dislike") {
        state.likeNotifications = state.likeNotifications.filter(
          (notification) => notification.post._id !== action.payload.post._id
        );
      }
    },
    markAllNotificationsAsSeen: (state) => {
      
      state.likeNotifications = state.likeNotifications.map((notification) => ({
        ...notification,
        seen: true,
      }));
    },
    setMessageNotifications: (state, action) => {
      state.messageNotifications = [action.payload, ...state.messageNotifications];
    },

    markAllMessageNotificationsAsSeen: (state) => {
      state.messageNotifications = state.messageNotifications.map(
        (notification) => ({
          ...notification,
          seen: true,
        })
      );
    },
  },
});

export const {
  setLikeNotifications,
  markAllNotificationsAsSeen,
  setMessageNotifications,
  markAllMessageNotificationsAsSeen,
} = rtnSlice.actions;

export default rtnSlice.reducer;
