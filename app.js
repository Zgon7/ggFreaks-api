const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const categorieRoutes = require('./routes/categorie');
const clientRoutes = require('./routes/client');
const adminRoutes = require('./routes/admin');
const commandeRoutes = require('./routes/commande');
const produitRoutes = require('./routes/produit');
const sousCategorieRoutes = require('./routes/sousCategorie');
const auth = require('./middleware/auth');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use(auth);
app.use(categorieRoutes);
app.use(sousCategorieRoutes);
app.use(produitRoutes);
app.use(commandeRoutes);
app.use(clientRoutes);
app.use(adminRoutes);

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
  uploadDir: './files'
});

app.post('/upload', multipartMiddleware, (req, res) => {
  console.log(req.files);
  res.json({
    'message': 'File uploaded succesfully.',
    'name': req.files.uploads[0].path.split("\\")[1]
  });
});

app.use('/files', express.static('files'));
app.get('/files/:name', function (req, res, next) {
  const fileName = req.params.name;
  res.sendFile(fileName, function (err) {console.log(err)}); });

mongoose
    .connect(
        'mongodb://127.0.0.1:27017/ggfreaks', {useUnifiedTopology: true ,  useNewUrlParser: true }
    )
    .then(result => {
      app.listen(8080);
      console.log("Running !")
    })
    .catch(err => console.log(err));
