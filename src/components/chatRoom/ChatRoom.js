import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import storage from '../../utils/storage';
import Layout from '../layout/Layout';
import { t } from 'i18next';
import { getIsLogged, getJwt } from '../../store/selectors';
import io from 'socket.io-client';
import Button from '../shared/Button';
import Modal from '../shared/modal/Modal';

const ChatRoom = () => {
  const isLogged = useSelector(getIsLogged);
  const navigate = useNavigate();
  const jwt = useSelector(getJwt);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const { userId, recipientUsername } = useParams();
  const username = storage.get('username');
  const newSocket = io(`${apiBaseUrl}`);

  console.log('userId: ' + userId)
  console.log('recipientUsername: ' + recipientUsername)
  console.log('Chat Window');

  const [socket, setSocket] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    newSocket.connect();
    setSocket(newSocket);

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
      })
      .catch(error => {
        console.error('Error al iniciar el chat:', error);
      });

    // Escuchar eventos desde el servidor
    /*socket.on('chat message', msg => {
      console.log(`Mensaje del servidor: ${msg}`);
    });*/
  }, [apiBaseUrl, userId, jwt, newSocket, socket]);

  const handleCloseChat = () => {
    if (socket) {
      socket.disconnect();
      console.log('Chat cerrado');
    }
    navigate(-1);
    console.log('Chat cerrado');
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <Layout>
      {isLogged ? (
        <div>
          <h2>Chat Room</h2>
          <p>
            {t('User')}: {username}
          </p>
          <p>
            {t('Ad owner')}: {recipientUsername}
          </p>
          <section>
            <Button id="closeButton" onClick={() => handleCloseChat()}>
              {t('Close chat')}
            </Button>
          </section>
        </div>
      ) : (
        // Renderizar tu ventana modal aquí
        <Modal
          id="noLoginModal1"
          title={t('please, login before start chat')}
          message={t('You need to be logged to start a chat with the owner.')}
          onConfirm={() => navigate('/login')}
          onCancel={handleCloseModal}
        />
      )}
    </Layout>
  );
};

export default ChatRoom;
