import './Modal.css';
import { useTranslation } from 'react-i18next';

function Modal(props) {
  const { message, title, onConfirm, onCancel } = props;
  const { t } = useTranslation();

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">{title}</div>
        <div className="modal-body">{message}</div>
        <div className="modal-buttons">
          <button onClick={onCancel} variant="primary2">
            {t('Cancel')}
          </button>
          <button onClick={onConfirm} variant="primary3">
            {t('Confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
