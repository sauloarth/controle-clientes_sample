const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const uriDbConnection = 'mongodb://localhost:27017/cclientesdb'

mongoose.connect(uriDbConnection, 
    {useNewUrlParser: true, useUnifiedTopology: true})
.then(console.log("Connected to database..."))
.catch(err => console.log("Error on connecting to database: ", err));


app.use(express.json());
app.use(cors({origin:'http://localhost:3001'}));

const funcionariosRoutes = require('./route/funcionarios');
app.use("/funcionarios", funcionariosRoutes);
const clientesRoutes = require('./route/clientes');
app.use("/clientes", clientesRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at ${port}.`);
});
