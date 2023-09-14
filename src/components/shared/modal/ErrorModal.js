import './ErrorModal.css';

function ErrorModal(props) {
  const { message, title, onCancel, testid } = props;

  return (
    <div className="modal-container-error">
      <div className="modal-error">
        <div className="modal-header-error">{title}</div>
        <div className="modal-body-error">{message}</div>
        <div className="modal-errorButton-error">
          <button data-testid={testid} onClick={onCancel}>
            Click
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
