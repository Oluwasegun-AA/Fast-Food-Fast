import Orders from '../data/database';
import _ from 'lodash';

//creates an instance of Orders
const orders = new Orders;


/**
* Validate post and Put request contains all required parameters
* @param {*} req - incomming json data
* @param {*} res - response to the validity of the data
*/


/**
 * Stage an instance of required data to be pushed to database 
 * @param {*} req - incomming json data
 * @param {*} id  - orderId associated with the data
 */

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
    let id = module.orders.database.length;
    let state = module.orders.pushOrder(req, res, id)
    if (state != "invalid") {
        res.status(201).send({
            orderId: id,
            order_sent: state,
            message: 'Order Sent Successfully'
        });
    } else return;
};

/**
 * Update an order in the database
 *  @param {*} req - incomming json data
 * @param {*} res - response to the success of the event 
 */
let updateOrder = (req, res) => {
    let map = 0;
    const id = parseInt(req.params.orderId, 10);
    let oldOrder = module.orders.database[id];
    module.orders.database.map((order, index) => {
        map++;
        if (order.orderId == id) {
            map--;
            let state = module.orders.putOrder(req, res, index, id);
            if (state != "invalid") {
                res.status(200).send({
                    orderId: id,
                    old_Order: oldOrder,
                    update: state,
                    message: "Update successful"
                });
            }else return;
        } else {
            if (map == module.orders.database.length){
            return res.status(410).send({
                success: 'false',
                message: 'Requested resourse is no longer available'
            });
        }else return;
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