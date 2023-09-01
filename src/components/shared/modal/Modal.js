import { useTranslation } from 'react-i18next';
import Button from '../Button';
import StarField from './StarField';
import './Modal.css';

function Modal(props) {
  const { message, title, onConfirm, onCancel } = props;
  const { t } = useTranslation();

  return (
    <div className="modal-container">
      <StarField />
      <div className="modal">
        <div className="stars"></div> {/* Para las estrellas de fondo */}
        <div className="modal-content">
          <div className="modal-header">{title}</div>
          <div className="modal-body">{message}</div>
          <div className="modal-buttons">
            <Button onClick={onCancel} className="oncancel">
              {t('Cancel')}
            </Button>
            <Button onClick={onConfirm} className="onconfirm">
              {t('Confirm')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
