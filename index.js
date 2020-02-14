const express = require('express');
const app = express();
const config = require('config');
const mongoose = require('mongoose');

const uriDbConnection = 'mongodb://localhost:27017/cclientesdb'

mongoose.connect(uriDbConnection, 
    {useNewUrlParser: true, useUnifiedTopology: true})
.then(console.log("Connected to database..."))
.catch(err => console.log("Error on connecting to database: ", err));


app.use(express.json());

const funcionariosRoutes = require('./route/funcionarios');
app.use("/funcionarios", funcionariosRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at ${port}.`);
});
