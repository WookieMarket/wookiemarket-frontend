import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Notifications = () => {
  // Configura la conexión del socket en index.js

  const [mensajes, setMensajes] = useState([]);
  const [mensajes2, setMensajes2] = useState([]);
  useEffect(() => {
    const socket = io('http://localhost:3001');
    console.log('Conexión establecida con el servidor de Socket.io');

    // Escucha el evento 'mensajeDesdeServidor' del servidor
    socket.on('mensajeDesdeServidor', mensaje => {
      console.log('Mensaje desde el servidor:', mensaje);
      setMensajes(prevMensajes => [...prevMensajes, mensaje]);
    });
    // Escucha el evento 'precioActualizado' del servidor
    // Unirse a la sala 'anuncios'
    socket.emit('joinRoom', 'anuncios'); // Envía una solicitud al servidor
    socket.on('priceActualizado', ({ advertId, nuevoPrecio }) => {
      console.log(
        'Evento precioActualizado recibido. advertId:',
        advertId,
        'nuevoPrecio:',
        nuevoPrecio,
      );
      setMensajes2(prevMensajes => [
        ...prevMensajes,
        { advertId, nuevoPrecio },
      ]);
    });
  }, []);

  // useEffect(() => {
  //   socket.on('mensajeDesdeServidor', mensaje => {
  //     console.log('Mensaje desde el servidor:', mensaje);
  //     setMensajes(prevMensajes => [...prevMensajes, mensaje]);
  //   });

  //   // Asegúrate de quitar el evento cuando el componente se desmonte para evitar pérdidas de memoria.
  //   return () => {
  //     socket.off('mensajeDesdeServidor');
  //     socket.off('priceActualizado');
  //   };
  // }, [socket]);

  return (
    <div>
      <h2>Notificaciones</h2>
      <ul>
        {mensajes2.map((mensaje, index) => (
          <li key={index}>
            Advert ID: {mensaje.advertId}, Nuevo Precio: {mensaje.nuevoPrecio}
          </li>
        ))}
      </ul>
    </div>
  );
};
//   return (
//     <div>
//       <h2>Notificaciones</h2>
//       <ul>
//         {mensajes2.map((mensaje, index) => (
//           <li key={index}>{mensaje}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

export default Notifications;
