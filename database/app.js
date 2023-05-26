const mongoose = require('mongoose');

// URL de conexión a MongoDB Compass
const dbUrl = 'mongodb+srv://admin:admin@cluster0.i94n2hx.mongodb.net/';

// Opciones de conexión
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUrl, connectionParams)
  .then(() => {
    console.log('Conectado a MongoDB');

    // Aquí puedes comenzar a realizar operaciones en la base de datos
  })
  .catch((error) => {
    console.error('Error:', error);
  });
