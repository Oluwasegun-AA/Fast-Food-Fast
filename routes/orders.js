import orders from '../data/database';
let newOrder;

export default module = {

    /**
     * Validate post and Put request contains all required parameters
     * @param {*} req - incomming json data
     * @param {*} res - response to the validity of the data
     */

    validate: (req, res)=> {
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
        } else if (!req.body.userAddress) {
            return res.status(400).send({
                success: 'false',
                message: 'Bad Request! Order Status is Required'
            });
        }
    },

    /**
     * Stage an instance of required data to be pushed to database 
     * @param {*} req - incomming json data
     * @param {*} id  - orderId associated with the data
     */
    populate: (req, id)=> {
        newOrder = {
            orderId: id,
            food: req.body.food,
            price: req.body.price,
            quantity: req.body.quantity,
            orderStatus: req.body.orderStatus,
            userAddress: req.body.userAddress
        };
    },

    /**
     * Gets All orders in the database and sends as response
     * @param {*} req - incomming request data
     * @param {*} res - response to the validity of the data 
     */
    getOrders: (req, res)=> {
        res.status(200).send({
            success: 'true',
            message: 'Orders retrieved successfully',
            orders: orders
        });
    },

    /**
     * Gets a particular order in the database and send as response
     * @param {*} req - incomming Request data
     * @param {*} res - response to the validity of the data
     */
    getOrder: (req, res)=> {
        const id = parseInt(req.params.orderId, 10);
        let orderIndex;
        orders.map((order, index) => {
            if (order.orderId == id) {
                orderIndex = index;
                let neededOrder = orders[index];
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

    /**
     * Add an Order to existing orders in the database
     *  @param {*} req - incomming json data
     *  @param {*} res - response to the sucess of the event
     */
    addOrder: (req, res)=> {
        module.validate(req, res);
        let id = orders.length;
        module.populate(req, id);
        orders.push(newOrder);
        res.status(201).send({
            orderId: id,
            order_sent: newOrder,
            message: 'Order Sent Successfully'
        });
        newOrder = {};
    },

    /**
     * Update an order in the database
     *  @param {*} req - incomming json data
     * @param {*} res - response to the success of the event 
     */
    updateOrder: (req, res) =>{
        module.validate(req, res);
        const id = parseInt(req.params.orderId, 10);
        let oldOrder = orders[id];
        let orderIndex;
        orders.map((order, index) => {
            if (order.orderId == id) {
                orderIndex = index;
                module.populate(req, id);
                orders[index] = newOrder
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

    /**
     * Delete an order in the database
     *  @param {*} req - incomming request data
     * @param {*} res - response to the validity of the data
     */
    deleteOrder: (req, res)=> {
        const id = parseInt(req.params.orderId, 10)
        let orderIndex;
        orders.map((order, index) => {
            if (order.orderId == id) {
                orderIndex = index
                orders.splice(index, 1)
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
