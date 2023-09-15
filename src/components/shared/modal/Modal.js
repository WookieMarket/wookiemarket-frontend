import { useTranslation } from 'react-i18next';
import Button from '../Button';
import StarField from './StarField';
import './Modal.css';

function Modal(props) {
  const {
    message,
    title,
    onConfirm,
    onCancel,
    cancelButton,
    buttonId1,
    buttonId2,
  } = props;
  const { t } = useTranslation();

  return (
    <div className="modal-container">
      <StarField />
      <div className="modal">
        <div className="stars"></div> {/* Background stars */}
        <div className="modal-content">
          <div className="modal-header">{title}</div>
          <div className="modal-body">{message}</div>
          <div className="modal-buttons">
            <Button
              id={buttonId1}
              onClick={onCancel}
              className="oncancel"
              data-testid={cancelButton}
            >
              {t('Cancel')}
            </Button>
            <Button
              id={buttonId2}
              onClick={onConfirm}
              className="onconfirm"
              data-testid="confirmButton"
            >
              {t('Confirm')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
