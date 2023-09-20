import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { readNotifications } from '../../store/slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { getNotification } from '../../store/selectors';
import { Link } from 'react-router-dom';
//import { BsCheckAll } from 'react-icons/bs';

//import { isRead } from '../../service/user';
import './Notifications.css';
import { useTranslation } from 'react-i18next';

const Notifications = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [mensajes, setMensajes] = useState([]);
  const notifications = useSelector(getNotification);

  const handleIsRead = notificationId => {
    dispatch(readNotifications(notificationId)).catch(error =>
      console.log(error),
    );
  };

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_BASE_URL);
    console.log('Conexión establecida con el servidor de Socket.io');

    // Listen to the server's 'messageFromServer' event
    socket.on('mensajeDesdeServidor', mensaje => {
      console.log('Mensaje desde el servidor:', mensaje);
      setMensajes(prevMensajes => [...prevMensajes, mensaje]);
    });
  }, []);

  return (
    <>
      <div className="notification-container">
        <div className="server">
          <ul>
            {mensajes.map((mensaje, index) => (
              <li key={index}>{mensaje}</li>
            ))}
          </ul>
        </div>
        {notifications.length > 0 ? (
          <ul>
            {notifications
              .slice()
              .sort((a, b) => (a.readAt ? 1 : -1))
              .map((notificacion, index2) => (
                <li
                  key={index2}
                  className={`notification ${
                    notificacion.readAt ? 'read' : ''
                  }`}
                >
                  {notificacion.readAt ? (
                    <span>{t('Read')}</span>
                  ) : (
                    <button
                      onClick={() => {
                        console.log('ID de notificación:', notificacion._id);
                        handleIsRead(notificacion._id);
                      }}
                    >
                      {t('Mark as read')}
                    </button>
                  )}
                  <span>
                    {t('Ad ')}
                    {notificacion.notification.advert.name}{' '}
                    {t('has changed its price to ')}
                    {notificacion.notification.price}
                    {notificacion.notification.advert.coin}{' '}
                    {t('and its status is:')} {notificacion.notification.status}
                  </span>
                  <Link
                    className="see-ad "
                    to={`/adverts/${notificacion.notification.advert._id}/${notificacion.notification.advert.name}`}
                    style={{ color: 'black' }}
                  >
                    {t('See advertisement')}
                  </Link>
                </li>
              ))}
          </ul>
        ) : (
          <p>{t('There are no notifications.')}</p>
        )}
      </div>
    </>
  );
};

export default Notifications;
