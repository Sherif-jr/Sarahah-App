import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Alert, Card } from "react-bootstrap";
import { UserContext } from "../../../context/UserContext";
import avatarImg from "../../../Assets/img/avatar.png";
import ModalDiag from "../../../components/Modal";
import jwtDecode from "jwt-decode";

const MessagesPage = () => {
  const [modalProps, setModalProps] = useState({ show: false, copied: false });
  const { userToken, loading } = useContext(UserContext);
  const {
    isLoading,
    error,
    data: messages,
  } = useQuery(["messages"], () =>
    axios
      .get("https://sara7aiti.onrender.com/api/v1/message", {
        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        return res.data.allMessages;
      })
  );

  const { id, name } = jwtDecode(userToken);
  console.log(messages);
  return (
    <>
      <div className="container text-center py-5 my-5 text-center">
        <div className="card pt-5">
          <img src={avatarImg} className="avatar " alt="" />
          <h3 className="py-2">{name}</h3>
          <button
            className="btn btn-default-outline share"
            onClick={() => {
              setModalProps((prev) => ({ ...prev, show: true }));
            }}
          >
            <i className="fas fa-share-alt"></i> Share Profile
          </button>
        </div>
      </div>

      <div className="container text-center my-5 text-center">
        <div className="row">
          <div className="col-md-12">
            {error && <Alert variant="danger">{error}</Alert>}
            {(loading || isLoading) && (
              <Card className="py-5">
                <i className="fas fa-spin fa-spinner fa-3x"></i>
              </Card>
            )}
            {messages?.length === 0 ? (
              <Card className="py-5">
                <p>You don't have any messages... </p>
              </Card>
            ) : (
              messages?.map((message) => {
                const date = new Date(message.createdAt);
                return (
                  <Card className="py-3" key={message.id}>
                    <Card.Title>{message.messageContent}</Card.Title>
                    <Card.Body>{`${date.toDateString()} - ${date.toLocaleTimeString()} `}</Card.Body>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
      <ModalDiag
        title="Share you link to get messages."
        body={
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              value={`${process.env.REACT_APP_SITE_URL}/messages/send/${id}`}
              disabled
            />
            <button
              className={`btn ${
                modalProps.copied ? "btn-success" : "btn-dark"
              }`}
              onClick={() => {
                if (!modalProps.copied) {
                  navigator.clipboard
                    .writeText(
                      `${process.env.REACT_APP_SITE_URL}/messages/send/${id}`
                    )
                    .then(() => {
                      setModalProps((prev) => ({ ...prev, copied: true }));
                    });
                }
              }}
            >
              {modalProps.copied ? (
                <i className="fa-solid fa-check"></i>
              ) : (
                <i className="fa-solid fa-copy"></i>
              )}
            </button>
          </div>
        }
        show={modalProps.show}
        onHide={() => {
          setModalProps({ show: false, copied: false });
        }}
      />
    </>
  );
};

export default MessagesPage;
