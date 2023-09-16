import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { userNotification } from '../../store/slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { getNotification } from '../../store/selectors';
import { Link } from 'react-router-dom';

//import { getAdById } from '../../store/slices/ads';

const Notifications = () => {
  const dispatch = useDispatch();
  const [mensajes, setMensajes] = useState([]);
  const notification = useSelector(getNotification);
  console.log('Notification:', notification);
  // const [mensajes2, setMensajes2] = useState([]);

  // Utiliza la función map() para extraer los valores de advertId
  const advertData = notification.map(notification => ({
    advertId: notification.advertId,
    message: notification.message,
    // Agrega aquí todas las demás propiedades que quieras extraer
  }));

  console.log('info', advertData.message);

  useEffect(() => {
    dispatch(userNotification()).catch(error => console.log(error));
  }, [dispatch]);

  useEffect(() => {
    const socket = io('http://localhost:3001');
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
    <div>
      <h2>Notificaciones</h2>
      <ul>
        {mensajes.map((mensaje, index) => (
          <li key={index}>{mensaje}</li>
        ))}
      </ul>
      <ul>
        {notification.map((notificacion, index2) => (
          <li key={index2}>
            <span>Anuncio: {notificacion.name} </span>
            <span>
              Ha modificado su precio a {notificacion.message}{' '}
              {notificacion.coin}{' '}
            </span>
            <span>y su estado es: {notificacion.status} </span>
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
  );
};

export default Notifications;
