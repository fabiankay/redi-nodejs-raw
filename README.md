# Node.js Hello World
Eine Node.js App mit Verbindung zu Azure Cosmos DB (MongoDB API)

Pull von https://github.com/fabiankay/redi-nodejs-raw
Final Version can be found here (Link to finished Repo)

# Step by Step

**npm install**
npm install (installiert alle Dependencies, die in der package.json hinterlegt sind)
npm install express --save (installiert Express package = Server Framework)

## First Application Test
Tests mit Postman (Link) (Notwendig für POST Abfrage) oder Browser
Definierte Routen ('/') können getestet werden (GET, POST)

## HTML hinzufügen
'view' Ordner erstellen und index.html hinzufügen
view Ordner als statische Quelle hinterlegen

**Code:**
```js
/* Configuration */
app.use(express.static(__dirname + '/view'));

/* Return index.html in '/' GET-Request */
res.sendFile('index.html');
```

## Parse Request

**npm install**
npm install body-parser --save

**post route implementieren**
```js
/* Imports */
var bodyParser = require('body-parser');

/* Configuration */
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/* Return Request Body in '/' POST-Request */
console.log(req.body);
```

## Datenbankverbindung erstellen

**npm install**
npm install mongoose --save
npm install dotenv --save

**.env Datei erstellen**
Das 'dotenv' package überträgt den Inhalt der .env Datei in die process.env Variable.

```
COSMOSDB_DBNAME=redidb
COSMOSDB_PW = 6sZ4LN7qiOMhVgYPMNaqGElPRuGssKl9S7SRXHGHckIeORVIIKCt0tC2PtKECzGBsP8hkoRpuXFG5RHsaPLaEQ==
```

**require hinzufügen**
```js
/* Imports */
var mongoose = require('mongoose');
var env = require('dotenv').load();    //Use the .env file to load the variables
```

### Konfigurieren 

Sicherstellen, dass vorher die Datenbank erstellt und die Verbindungsdaten in die .env Datei eingetragen wurdem.

```js
/* Configuration */
mongoose.connect('mongodb://'+process.env.COSMOSDB_DBNAME+'.documents.azure.com:10255/'+process.env.COSMOSDB_DBNAME+'?ssl=true', {
    auth: {
      user: process.env.COSMOSDB_DBNAME,
      password: process.env.COSMOSDB_PW
    }
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));
```

### Datenbankmodell erstellen und befüllen
```js
/* Configuration */

var Person = mongoose.model('Person', new mongoose.Schema({
    name: String,
    lastname: String
}));

/* '/' Post-Request */
var p = new Person({
    name: req.body.user.name, // Übertragung aus dem HTML Formular - Zum Testen: 'Hallo'
    lastname: req.body.user.lastname // 'Welt'
})

p.save((err, savePerson) => {
    console.log(JSON.stringify(savePerson));
});
```

## Verbindung zum HTML
Form zum Eintragen der Daten erstellen
Anschließend wieder req.body.user.name einfügen

```HTML
<form method="post" action="/"> <!-- '/' POST-Request -->
    <input type="text" name="user[name]">
    <input type="text" name="user[lastname]">
    <input type="submit" value="Submit">
</form>
```