import "./Modal.css";

function ErrorModal(props) {
  const { message, title, onCancel } = props;

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">{title}</div>
        <div className="modal-body">{message}</div>
        <div className="modal-errorButton">
          <button
            //data-testid="modalButton"
            onClick={onCancel}>
            Click
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
