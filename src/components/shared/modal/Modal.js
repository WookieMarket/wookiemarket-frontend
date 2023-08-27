import { useTranslation } from 'react-i18next';
import Button from '../Button';
import './Modal.css';

function Modal(props) {
  const { message, title, onConfirm, onCancel, showCancel = true } = props;
  const { t } = useTranslation();

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">{title}</div>

        <div className="modal-body">{message}</div>
        <div className="modal-buttons">
          {showCancel && (
            <Button onClick={onCancel} className="oncancel">
              {t('Cancel')}
            </Button>
          )}
          <Button onClick={onConfirm} className="onconfirm">
            {t('Confirm')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
