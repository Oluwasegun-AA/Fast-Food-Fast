const database = require('../data/database');
let newOrder;

module.exports = {
    
    validate: (req, res) => {
        if (!req.body.food) {
            return res.status(400).send({
                success: 'false',
                message: 'Bad Request! Food Name is Required'
            });
        } else if (!req.body.price) {
            return res.status(400).send({
                success: 'false',
                message: 'Bad Request! Price is Required'
            });
        } else if (!req.body.quantity) {
            return res.status(400).send({
                success: 'false',
                message: 'Bad Request! Quantity is required'
            });
        } else if (!req.body.orderStatus) {
            return res.status(400).send({
                success: 'false',
                message: 'Bad Request! Order Status is Required'
            });
        }
    },

    populate: (req, id) => {
      newOrder = {
            orderId: id,
            food: req.body.food,
            price: req.body.price,
            quantity: req.body.quantity,
            orderStatus: req.body.orderStatus
        };
    },

    getOrders(req, res) {
        res.status(200).send({
            success: 'true',
            message: 'Orders retrieved successfully',
            orders: database.orders
        });
    },

    getOrder(req, res) {
        const id = parseInt(req.params.orderId, 10);
        let orderIndex;
        database.orders.map((order, index) => {
            if (order.orderId == id) {
                orderIndex = index;
                let neededOrder = database.orders[index];
                res.status(200).send({
                    success: 'true',
                    message: 'Order retrieved successfully',
                    order: neededOrder
                });
            }
        });
        if (orderIndex == undefined) {
            return res.status(404).send({
                success: 'false',
                message: 'Order Not Found in the Database'
            })
        }
    },

    addOrder(req, res) {
        module.exports.validate(req, res);
        let id = database.orders.length;
        module.exports.populate(req, id);
        database.orders.push(newOrder);
        res.status(201).send({
            orderId: id,
            order_sent: newOrder,
            message: 'Order Sent Successfully'
        });
        newOrder = {};
    },

    updateOrder(req, res) {
        module.exports.validate(req, res);
        const id = parseInt(req.params.orderId, 10);
        let oldOrder = database.orders[id];
        let orderIndex;
        database.orders.map((order, index) => {
            if (order.orderId == id) {
                orderIndex = index;
                module.exports.populate(req, id);
                database.orders[index] = newOrder
                res.status(200).send({
                    orderId: id,
                    old_Order: oldOrder,
                    update: newOrder,
                    message: "Update successful"
                })
            }
        });

        if (orderIndex == undefined) {
            return res.status(404).send({
                success: 'false',
                message: 'Previous Order Not Found in the Database'
            })
        }
    },

    deleteOrder(req, res) {
        const id = parseInt(req.params.orderId, 10)
        let orderIndex;
        database.orders.map((order, index) => {
            if (order.orderId == id) {
                orderIndex = index
                database.orders.splice(index, 1)
                res.status(200).send({
                    success: 'true',
                    message: 'Order deleted successfuly'
                });
            }
        });

        if (orderIndex == undefined) {
            return res.status(404).send({
                success: 'false',
                message: 'Order Not Found in the Database'
            });
        }
    }
}