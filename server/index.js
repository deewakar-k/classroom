require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mainRouter = require('./routes/index.js')

const app = express();

app.use(cors());
app.use(express.json())

mongoose
  .connect(process.env.DATABASE_URL)
  .then(console.log("connected to mongodb!"))
  .catch((err) => { console.log("failed connecting to mongodb.", err) })

app.use('/api/v1', mainRouter);

const port = process.env.PORT
app.listen(port, () => {
  console.log(`server running on port:${port}...`)
})


