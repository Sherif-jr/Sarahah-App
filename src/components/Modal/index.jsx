import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createPortal } from "react-dom";

function ModalDiag({ show, onHide, title, body }) {
  return (
    <>
      {createPortal(
        <Modal show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{body}</Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={onHide}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>,
        document.getElementById("Modal-root")
      )}
    </>
  );
}

export default ModalDiag;
