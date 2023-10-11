import React from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import { createPortal } from "react-dom";

const Notification = ({ show, onHide, title, body, varient }) => {
  return (
    <>
      {createPortal(
        <ToastContainer position="bottom-end">
          <Toast
            show={show}
            onClose={onHide}
            autohide
            delay={3000}
            bg={varient}
          >
            <Toast.Header>
              <strong className="me-auto">{title}</strong>
              <small>Just Now</small>
            </Toast.Header>
            <Toast.Body>{body}</Toast.Body>
          </Toast>
        </ToastContainer>,
        document.getElementById("toast-root")
      )}
    </>
  );
};

export default Notification;
