import "./Modal.css";

function Modal(props) {
  const { message, title, onConfirm, onCancel } = props;

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">{title}</div>
        <div className="modal-body">{message}</div>
        <div className="modal-buttons">
          <button onClick={onCancel} variant="primary2">
            Cancel
          </button>
          <button onClick={onConfirm} variant="primary3">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
