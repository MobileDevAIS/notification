// src/components/Notifications.js

import React, { useState, useEffect, useContext } from "react";
import {
  firestore,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "../firebase/firebaseConfig";
import { query, where } from "firebase/firestore";
import UserContext from "../context/UserContext";

const Notifications = () => {
  const [notifications, setNotifications] = useState<any>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    let unsubscribe: any;
    if (user) {
      const q = query(
        collection(firestore, "users"),
        where("uid", "==", user.uid)
      );
      unsubscribe = onSnapshot(q, (snapshot) => {
        const notificationsData: any = [];
        snapshot.forEach((doc) =>
          notificationsData.push({ ...doc.data(), id: doc.id })
        );
        setNotifications(notificationsData);
      });
    } else {
      setNotifications([]);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  const markAsRead = async (id: any, read: any) => {
    await updateDoc(doc(firestore, "users", id), { read });
  };

  const deleteNotification = async (id: any) => {
    await deleteDoc(doc(firestore, "users", id));
  };

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <ul className="notification-list">
        {notifications.map((notification: any) => (
          <li
            key={notification.id}
            className={`notification-item ${notification.read ? "read" : ""}`}
          >
            <h3>{notification.title}</h3>
            <p>{notification.body}</p>
            <div className="button-group">
              <button
                className="mark-read"
                onClick={() => markAsRead(notification.id, !notification.read)}
              >
                Mark as {notification.read ? "Unread" : "Read"}
              </button>
              <button
                className="delete"
                onClick={() => deleteNotification(notification.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
