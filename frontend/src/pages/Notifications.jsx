import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  markAllFollowNotificationsAsSeen,
  markAllNotificationsAsSeen,
  setLikeNotifications,
} from "../redux/notification/rtnSlice";
import moment from "moment";
import { Avatar } from "flowbite-react";
const Notifications = () => {
  const { likeNotifications: notifications, followNotifications } = useSelector(
    (state) => state.rtn
  );

  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(markAllNotificationsAsSeen());
      dispatch(markAllFollowNotificationsAsSeen([]));
    };
  }, []);
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-300 w-[50%] mx-auto mt-6 ">
      <ul>
        {notifications.length || followNotifications.length > 0 ? (
          [...notifications, ...followNotifications].map(
            (notification, index) => (
              <li
                key={index}
                className={`text-sm text-gray-700 py-4 flex items-center ${
                  index < notifications.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <Avatar
                  img={
                    notification?.userDetails?.profilePicture ||
                    notification?.userProfile
                  }
                  alt={`${notification?.userDetails?.username} profile`}
                  className="w-20 h-20 rounded-full mr-1"
                  rounded
                  shadow="md"
                />
                <div className="flex-1 text-xl">
                  <span className="font-bold text-2xl">
                    {notification?.userDetails?.username ||
                      notification.username}
                  </span>{" "}
                  {notification.username
                    ? "starting following you."
                    : "liked your post"}
                  <p className="text-[15px]">
                    {moment(notification.createdAt).fromNow()}
                  </p>
                </div>
                {notification?.post?.image && (
                  <img
                    src={notification?.post?.image}
                    alt={`${notification.post.caption}`}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                )}
              </li>
            )
          )
        ) : (
          <li className="text-sm text-gray-700 py-4 text-center">
            No notifications
          </li>
        )}
      </ul>
    </div>
  );
};

export default Notifications;
