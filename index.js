const express = require('express');
const app = express();
const config = require('config');
const mongoose = require('mongoose');

const uriDbConnection = `mongodb+srv://${config.get('dbusername')}:
${config.get('dbpassword')}@cluster0-mcqrm.mongodb.net/test?retryWrites
=true&w=majority`;

mongoose.connect(uriDbConnection, 
    {useNewUrlParser: true, useUnifiedTopology: true})
.then(console.log("Connected to database..."))
.catch(err => console.log("Error on connecting to database: ", err));


app.set(express.json());

app.get('/', (req, res) => {
  res.send('Responding good!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at ${port}.`);
});
