const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const routes = require('./routes')
const port = 3000;

let app = express()
app.use (logger('common'))
app.use(bodyParser.json())

app.get('/api/v1/orders', routes.orders.getOrders)
app.get('/api/v1/orders/:orderId', routes.orders.getOrder)
app.post('/api/v1/orders', routes.orders.addOrder)
app.put('/api/v1/orders/:orderId', routes.orders.updateOrder)
app.delete('/api/v1/orders/:orderId', routes.orders.deleteOrder)

app.listen(port,  () => {
    console.log(`server running on port ${port}`)
  })