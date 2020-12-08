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
const mailjet = require ('node-mailjet').connect('2ef02d60d3a9b38d4bcfb3a26c89725d', '8d774aa18f52ce0bd8ea710b1ae00570');


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

app.get('/email/:mail/:price', (req, res) => {
  mailjet.post("send", {'version': 'v3.1'})
      .request({
        "Messages": [
          {
            "From": {
              "Email": "nadersaber@hotmail.fr",
              "Name": "Nader"
            },
            "To": [
              {
                "Email":  req.params.mail.trim().toLowerCase(),
              }
            ],
            "Subject": "Commande Confirmation",
            "HTMLPart": `<h1>Commande Confirmation</h1>
                                       <p>Cet email est envoyé automatiquement après votre commande de ${req.params.price} </p>
                                       <p>Merci pour votre achat.</p>
                                      `,

          }
        ]
      });
  res.json({
    'message': 'email Sent',
  });
})

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
