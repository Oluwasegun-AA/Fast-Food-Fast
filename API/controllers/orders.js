//Import statments
import storage from '../data/database';
import model from '../model/order-model';

/**
 * Adds an Order to the database
 * @param {*} req - incomming json data
 * @param {*} res - response to the validity of the data
 * @param {*} id  - orderId associated with the data
 */
let pushOrder = (req, res, id) => {
    let newOrder = model.populate(req, id);
    storage.database.push(newOrder);
    return newOrder;
}

/**
 * Updates an Order in the database
 * @param {*} req   - incomming json data
 * @param {*} res   - response to the validity of the data
 * @param {*} index - the index of the order being Updated
 * @param {*} id    - orderId associated with the data
 */
let putOrder = (req, index, id) => {
    let newOrder = model.populate(req, id);
    storage.database[index] = newOrder;
    return newOrder;
}

export default class Controller {
    /**
        * Gets All orders in the database and sends as response
        * @param {*} req - incomming request data
        * @param {*} res - response to the validity of the data 
    */
    getOrders(req, res) {
        res.status(200).send({
            success: 'true',
            status: 'Orders retrieved successfully',
            orders: storage.database
        });
    }

    /**
         * Gets a particular order in the database and send as response
         * @param {*} req - incomming Request data
         * @param {*} res - response to the validity of the data
         */
    getOrder(req, res) {
        const id = parseInt(req.params.orderId, 10);
        let orderIndex;
        storage.database.map((order, index) => {
            if (order.orderId == id) {
                orderIndex = index;
                let value = storage.database[index];
                res.status(200).send({
                    success: 'true',
                    status: 'Order retrieved successfully',
                    order: value
                });
            };
        });
        if (orderIndex == undefined) {
            return res.status(404).send({
                success: 'false',
                status: 'Order Not Found in the Database'
            })
        }
    }

    /**
        * Add an Order to existing orders in the database
        *  @param {*} req - incomming json data
        *  @param {*} res - response to the sucess of the event
    */
    addOrder(req, res) {
        let id = storage.database.length;
        let sentOrder = pushOrder(req, res, id);
        res.status(201).send({
            orderId: id,
            order_sent: sentOrder,
            status: 'Order Sent Successfully'
        });
    }

    /**
     * Update an order in the database
     *  @param {*} req - incomming json data
     * @param {*} res - response to the success of the event 
     */
    updateOrder(req, res) {

        let map = 0;
        const id = parseInt(req.params.orderId, 10);
        let oldOrder = storage.database[id];
        storage.database.map((order, index) => {
            map++;
            if (order.orderId == id) {
                map--;
                let state = putOrder(req, index, id);
                res.status(200).send({
                    orderId: id,
                    old_Order: oldOrder,
                    update: state,
                    status: "Update successful"
                });
            } else {
                if (map == storage.database.length) {
                    return res.status(410).send({
                        success: 'false',
                        status: 'Requested resourse is no longer available'
                    });
                } else return;
            }
        });
    }


    /**
    * Delete an order in the database
    *  @param {*} req - incomming request data
    * @param {*} res - response to the validity of the data
    */
    deleteOrder(req, res) {
        const id = parseInt(req.params.orderId, 10)
        let orderIndex;
        storage.database.map((order, index) => {
            if (order.orderId == id) {
                orderIndex = index
                storage.database.splice(index, 1)
                res.status(200).send({
                    success: 'true',
                    status: 'Order deleted successfuly'
                });
            }
        });
        if (orderIndex == undefined) {
            return res.status(404).send({
                success: 'false',
                status: 'Order Not Found in the Database'
            });
        }
    }
}