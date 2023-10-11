import React, { useState } from "react";
import avatarImage from "../../../Assets/img/avatar.png";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";
import Notification from "../../../components/Notification";

const SendMessage = () => {
  const [notification, setNotification] = useState({
    show: false,
    title: "Sent!",
    body: "Your message was sent successfully!",
    varient: "success",
  });
  const { id: receivedId } = useParams();

  return (
    <>
      <div className="container text-center py-5 my-5 text-center">
        <div className="card py-5 mb-5">
          <img src={avatarImage} className="avatar " alt="" />
          <h3 className="py-2">User-{receivedId}</h3>
          <div className="container w-50 m-auto">
            <Formik
              initialValues={{ messageContent: "" }}
              validationSchema={Yup.object().shape({
                messageContent: Yup.string().trim().required(),
              })}
              onSubmit={async (values, { setStatus, setSubmitting }) => {
                try {
                  const { data } = await axios.post(
                    "https://sara7aiti.onrender.com/api/v1/message",
                    {
                      ...values,
                      receivedId,
                    }
                  );
                  setSubmitting(false);
                  setStatus({ success: true });
                  setNotification({
                    show: true,
                    title: "Sent!",
                    body: "Your message was sent successfully!",
                    varient: "success",
                  });
                  console.log(data);
                } catch (err) {
                  console.log(err);
                  setSubmitting(false);
                  setStatus({ success: false });
                  setNotification({
                    show: true,
                    title: "faild!",
                    body: "Your message was not sent.",
                    varient: "danger",
                  });
                }
              }}
            >
              {({
                values,
                handleSubmit,
                handleChange,
                handleBlur,
                isSubmitting,
                dirty,
                isValid,
              }) => (
                <form onSubmit={handleSubmit}>
                  <textarea
                    className="form-control"
                    name="messageContent"
                    id=""
                    cols="10"
                    rows="9"
                    placeholder="You Shouldn't send a Sarahah to yourself, share your profile with your friends :)"
                    value={values.messageContent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></textarea>
                  <button
                    type="submit"
                    className="btn btn-outline-info mt-3"
                    disabled={isSubmitting || !(isValid && dirty)}
                  >
                    <i className="far fa-paper-plane"></i> Send
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Notification
        show={notification.show}
        onHide={() => {
          setNotification((prev) => ({ ...prev, show: false }));
        }}
        title={notification.title}
        body={notification.body}
        varient={notification.varient}
      />
    </>
  );
};

export default SendMessage;
