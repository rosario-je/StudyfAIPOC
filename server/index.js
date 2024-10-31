//express needed for server
import express from 'express';

//Routes import
import userRoutes from './routes/user.js'

//import db connection
import db from './db/connection.js';

const app = express();

app.use(express.json());

app.use("/api", userRoutes);


app.listen(3000, () => {
  console.log('Server connected to port 3000')
})

db.on('error', (error) => {
  console.log(error)
})

db.once('connected', () => {
  console.log('Database connected')
})


