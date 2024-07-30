import React, { useContext } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

function NotificationForm() {
  const { user } = useContext(UserContext);

  const handleAdd = async (title: any, body: any) => {
    toast.success("Add Notification");
    try {
      const value = await addDoc(collection(db, "users"), {
        title,
        body,
        read: false,
        uid: user.uid,
      });
      console.log("Document written with ID: ", value.id);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container pt-4">
      <Formik
        initialValues={{ title: "", body: "" }}
        validate={(values) => {}}
        onSubmit={async (values, { setSubmitting }) => {
          handleAdd(values.title, values.body);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="pb-3">
              <input
                type="text"
                name="title"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                placeholder="Enter Notification Title"
                required
              />
            </div>
            <div className="pb-3">
              <input
                type="text"
                name="body"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.body}
                placeholder="Enter Notification Body"
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <div className="pe-2">
                <button className="btn btn-primary btn-lg" type="submit">
                  Send Notification
                </button>
              </div>
              <div>
                <Link className="btn btn-info btn-lg" to="/notification">
                  View Notification
                </Link>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default NotificationForm;
