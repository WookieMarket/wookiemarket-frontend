import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { readNotifications, userNotification } from '../../store/slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { getNotification } from '../../store/selectors';
import { Link } from 'react-router-dom';

//import { isRead } from '../../service/user';
import './Notifications.css';

//import { getAdById } from '../../store/slices/ads';

const Notifications = () => {
  const dispatch = useDispatch();
  const [mensajes, setMensajes] = useState([]);
  const notification = useSelector(getNotification);
  const [lastNotificationDate, setLastNotificationDate] = useState(null);

  console.log('Notification:', notification);
  // const [mensajes2, setMensajes2] = useState([]);

  // // Utiliza la función map() para extraer los valores de advertId
  // const advertData = notification.map(notification => ({
  //   advertId: notification.advertId,
  //   message: notification.message,
  //   // Agrega aquí todas las demás propiedades que quieras extraer
  // }));

  // console.log('info', advertData.message);

  const handleIsRead = notificationId => {
    dispatch(readNotifications(notificationId)).catch(error =>
      console.log(error),
    );
  };

  useEffect(() => {
    const loadNotifications = () => {
      dispatch(userNotification())
        .then(newNotifications => {
          if (newNotifications.length > 0) {
            // Find the most recent notification in new notifications
            const mostRecentNotification = newNotifications.reduce(
              (prev, current) =>
                new Date(current.createdAt.$date) >
                new Date(prev.createdAt.$date)
                  ? current
                  : prev,
            );

            // Compares the date of the most recent notification with the date of the last uploaded notification
            if (
              !lastNotificationDate ||
              new Date(mostRecentNotification.createdAt.$date) >
                new Date(lastNotificationDate)
            ) {
              // If the most recent notification is newer, upload it and update the date of the last uploaded notification
              setLastNotificationDate(mostRecentNotification.createdAt.$date);
            }
          }
          console.log('Notificaciones cargadas:', newNotifications);
        })
        .catch(error => console.log(error));
    };

    // Cargar notificaciones al montar el componente
    loadNotifications();
  }, [dispatch, lastNotificationDate]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_BASE_URL);
    console.log('Conexión establecida con el servidor de Socket.io');

    // Escucha el evento 'mensajeDesdeServidor' del servidor
    socket.on('mensajeDesdeServidor', mensaje => {
      console.log('Mensaje desde el servidor:', mensaje);
      setMensajes(prevMensajes => [...prevMensajes, mensaje]);
    });
    // // Escucha el evento 'precioActualizado' del servidor
    // // Unirse a la sala 'anuncios'
    // socket.emit('joinRoom', 'anuncios'); // Envía una solicitud al servidor
    // socket.on('priceActualizado', ({ advertId, nuevoPrecio }) => {
    //   console.log(
    //     'Evento precioActualizado recibido. advertId:',
    //     advertId,
    //     'nuevoPrecio:',
    //     nuevoPrecio,
    //   );
    //   setMensajes2(prevMensajes => [
    //     ...prevMensajes,
    //     { advertId, nuevoPrecio },
    //   ]);
    // });
  }, []);

  //   return (
  //     <div>
  //       <h2>Notificaciones</h2>
  //       <ul>
  //         {mensajes2.map((mensaje, index) => (
  //           <li key={index}>
  //             Advert ID: {mensaje.advertId}, Nuevo Precio: {mensaje.nuevoPrecio}
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // };
  return (
    <>
      <div className="server">
        <ul>
          {mensajes.map((mensaje, index) => (
            <li key={index}>{mensaje}</li>
          ))}
        </ul>
      </div>
      <div className="notification-container">
        <ul>
          {notification.map((notificacion, index2) => (
            <li
              key={index2}
              className={`notification ${notificacion.isRead ? 'read' : ''}`}
            >
              {notificacion.isRead ? (
                // Si la notificación está marcada como leída, muestra el mensaje de leído
                <span>Leído</span>
              ) : (
                // Si la notificación no está marcada como leída, muestra el botón
                <button
                  onClick={() => {
                    console.log('ID de notificación:', notificacion._id);
                    handleIsRead(notificacion._id);
                  }}
                >
                  Marcar como leído
                </button>
              )}
              <span>
                Anuncio: {notificacion.name} Ha modificado su precio a{' '}
                {notificacion.message}
                {notificacion.coin} y su estado es: {notificacion.status}
              </span>
              <Link
                className="see-ad "
                to={`/adverts/${notificacion.advertId}/${notificacion.name}`}
                style={{ color: 'black' }}
              >
                Ver anuncio
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Notifications;
