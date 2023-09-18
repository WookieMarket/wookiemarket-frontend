import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAdOwnerUsername, getJwt } from '../../store/selectors';
import storage from '../../utils/storage';
import jwt_decode from 'jwt-decode';
import Layout from '../layout/Layout';

const ChatRoom = () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    let { userId, recipientUsername } = useParams();
    /*
    console.log('userId: ' + userId)
    console.log('adOwnerUsername: ' + ownerUserName)
    console.log('Chat Window');

    // Llamar a la API para iniciar el chat
    fetch(`${apiBaseUrl}/api/chat/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.message);
        // Aquí puedes realizar cualquier otra lógica que necesites con la respuesta.
      })
      .catch(error => {
        console.error('Error al iniciar el chat:', error);
      });
    
    
    // Redirects to the Chat with the advert owner
    //navigate(`/chatRoom/${KEY}`); --> Ensure the key for chatRoom
  useEffect(() => {
    const socket = io(`${apiBaseUrl}`);

    // Escuchar eventos desde el servidor
    socket.on('chat message', (msg) => {
      console.log(`Mensaje del servidor: ${msg}`);
    });

    // ... (otros eventos y lógica de chat)
  }, []);*/

  return (
  <Layout>

    <div><h2>Chat Room</h2>
      <p>User ID: {userId}</p>
      <p>Username: {recipientUsername}</p></div>
  </Layout>
  )
};

export default ChatRoom;
