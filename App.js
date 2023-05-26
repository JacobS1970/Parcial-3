import React, { useState } from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';
import Menu from './shared/Menu';
import Login from './components/Login';
import PublicarTweet from './components/PublicarTweet';
import { ChakraProvider } from '@chakra-ui/react';
import RedditCards from './components/RedditCards';
import ProfileCircle from './components/ProfileCircle.js';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Agrega esta línea

import ChatBubble from './components/ChatBubble';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCompartir, setShowCompartir] = useState(true);

  const handleLoginClick = (event) => {
    event.preventDefault();
    setShowLogin(true);
  };

  const guardarDatosEnFirebase = async () => { // Agrega esta función
    const db = getFirestore();
    const datos = {
      mensaje: 'Hola, Firebase!',
      fecha: new Date()
    };

    try {
      const docRef = await addDoc(collection(db, 'miColeccion'), datos);
      console.log('Documento guardado con ID:', docRef.id);
    } catch (error) {
      console.error('Error al guardar el documento:', error);
    }
  };

  return (
    <ChakraProvider>
      {!showLogin ? (
        <Flex direction="column" align="center" maxW="800px" mx="auto" p="4" margin="auto">
          <Menu />
          <Box mt="4">
            <Text fontSize="2xl" fontWeight="bold">Comparte tu noticia del día.</Text>
          </Box>
          {showCompartir && (
            <Box mt="4">
              <PublicarTweet />
            </Box>
          )}
          <Box mt="4">
            <Link href="#" onClick={handleLoginClick}>Dale click aquí para iniciar sesión</Link>
          </Box>
          <Box mt="4">
            <RedditCards />
            <Box position="absolute" top="4" right="4">
              <ProfileCircle userName="John" />
            </Box>
          </Box>
          <ChatBubble />
          <button onClick={guardarDatosEnFirebase}>Guardar datos en Firebase</button> {/* Agrega este botón */}
        </Flex>
      ) : (
        <Box bg="white" w="100%" h="100%">
          <Login />
        </Box>
      )}
    </ChakraProvider>
  );
}

export default App;
