import Orders from '../data/database';
let newOrder;

//creates an instance of Orders
const orders = new Orders


function returnStatement(res){
    return res.status(400).send({
        success: 'false',
        message: 'Bad Request! Food Name is Required'
    });
}


/**
     * Validate post and Put request contains all required parameters
     * @param {*} req - incomming json data
     * @param {*} res - response to the validity of the data
     */
    function validate(req, res) {
        if (!req.body.food) return returnStatement(res);
        if (!req.body.price) return returnStatement(res);
        if (!req.body.quantity) return returnStatement(res);
        if (!req.body.orderStatus) return returnStatement(res);
        if (!req.body.userAddress) return returnStatement(res);
        if (!req.body) return returnStatement(res);
    }

    /**
     * Stage an instance of required data to be pushed to database 
     * @param {*} req - incomming json data
     * @param {*} id  - orderId associated with the data
     */
    function populate (req, id) {
       let newOrder = {
            orderId: id,
            food: req.body.food,
            price: req.body.price,
            quantity: req.body.quantity,
            orderStatus: req.body.orderStatus,
            userAddress: req.body.userAddress
        };
        return newOrder;
    }

/**
    * Gets All orders in the database and sends as response
    * @param {*} req - incomming request data
    * @param {*} res - response to the validity of the data 
    */
let getOrders = (req, res) => {
    let value = module.orders.getAllOrder();
    res.status(200).send({
        success: 'true',
        message: 'Orders retrieved successfully',
        orders: value
    });
};


/**
     * Gets a particular order in the database and send as response
     * @param {*} req - incomming Request data
     * @param {*} res - response to the validity of the data
     */
let getOrder = (req, res) => {
    const id = parseInt(req.params.orderId, 10);
    let orderIndex;
    module.orders.database.map((order, index) => {
        if (order.orderId == id) {
            orderIndex = index;
            let value = module.orders.returnOrder(index);
            res.status(200).send({
                success: 'true',
                message: 'Order retrieved successfully',
                order: value
            });
        }
    });
    if (orderIndex == undefined) {
        return res.status(404).send({
            success: 'false',
            message: 'Order Not Found in the Database'
        })
    }
};

/**
    * Add an Order to existing orders in the database
    *  @param {*} req - incomming json data
    *  @param {*} res - response to the sucess of the event
    */
let addOrder = (req, res) => {
     validate(req, res);
    let id = orders.length;
    let newOrder =  populate(req, id);
    module.orders.pushOrder(newOrder);
    res.status(201).send({
        orderId: id,
        order_sent: newOrder,
        message: 'Order Sent Successfully'
    });
    newOrder = {};
};

/**
 * Update an order in the database
 *  @param {*} req - incomming json data
 * @param {*} res - response to the success of the event 
 */
let updateOrder = (req, res) => {
     validate(req, res);
    const id = parseInt(req.params.orderId, 10);
    let oldOrder = module.orders.database[id];
    module.orders.database.map((order, index) => {
        if (order.orderId == id) {
            let newOrder =  populate(req, id);
            module.orders.putOrder(index, newOrder);
            res.status(200).send({
                orderId: id,
                old_Order: oldOrder,
                update: newOrder,
                message: "Update successful"
            });
        } else {
            return res.status(410).send({
                success: 'false',
                message: 'Requested resourse is no longer available'
            });
        }
    });
};

/**
* Delete an order in the database
*  @param {*} req - incomming request data
* @param {*} res - response to the validity of the data
*/
let deleteOrder = (req, res) => {
    const id = parseInt(req.params.orderId, 10)
    let orderIndex;
    module.orders.database.map((order, index) => {
        if (order.orderId == id) {
            orderIndex = index
            module.orders.spliceOrder(index, 1)
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
};



export default module = {
    orders,
    getOrders,
    getOrder,
    addOrder,
    updateOrder,
    deleteOrder
}


