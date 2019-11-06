const express = require('express')

const postRoutes = require('./Posts/postRoutes')

const server = express();

server.use(express.json());

server.use('/api/posts', postRoutes)

server.get('/', (req, res) => {
  res.status(200).send('Welcome to root')
})

server.listen(4000, () => {
  console.log('Server is listening on port 4000')
})