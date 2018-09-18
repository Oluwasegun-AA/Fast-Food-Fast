class Orders {
    constructor() {
        this.database = [
            {
                orderId: 0,
                food: 'peperony pizza',
                price: 10,
                quantity: 10,
                orderStatus: 'uncompleted',
                userAddress: "Address"
            },
            {
                orderId: 1,
                food: 'grilled Chicken',
                price: 20,
                quantity: 20,
                orderStatus: 'uncompleted',
                userAddress: "Address"
            }
        ]
    }

 /**
* Validate post and Put request contains all required parameters
* @param {*} req - incomming json data
* @param {*} res - response to the validity of the data
*/
    validate(req, res) {
        if (!(req.body.food)) return res.status(400).send({ "Error!": 'Food Name is Required' });
        if (!(req.body.price)) return res.status(400).send({ "Error!": 'Price is Required' });
        if (!(req.body.quantity)) return res.status(400).send({ "Error!": 'Quantity is Required' });
        if (!(req.body.orderStatus)) return res.status(400).send({ "Error!": ' Order Status is Required' });
        if (!(req.body.userAddress)) return res.status(400).send({ "Error!": ' user Address is Required' });
        else return;
    }

/**
 * Stage an instance of required data to be pushed to database 
 * @param {*} req - incomming json data
 * @param {*} id  - orderId associated with the data
*/
    populate(req, id) {
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

    //Gets all orders in the database
    getAllOrder() {
        let value = this.database;
        return value;
    }

    /**
     * Returns a specific order in the database
     * @param {*} index - the index of the order being fetched
     */
    returnOrder(index) {
        let value = this.database[index];
        return value;
    }

    /**
     * Adds an Order to the database
     * @param {*} req - incomming json data
     * @param {*} res - response to the validity of the data
     * @param {*} id  - orderId associated with the data
     */
    pushOrder(req, res, id) {
        let statusCode = this.validate(req, res);
        if (!statusCode) {
            let newOrder = this.populate(req, id);
            this.database.push(newOrder);
            return newOrder;
        } else return "invalid";
    }

    /**
     * Updates an Order in the database
     * @param {*} req   - incomming json data
     * @param {*} res   - response to the validity of the data
     * @param {*} index - the index of the order being Updated
     * @param {*} id    - orderId associated with the data
     */
    putOrder(req, res, index, id) {
        let statusCode = this.validate(req, res);
        if (!statusCode) {
            let newOrder = this.populate(req, id);
            this.database[index] = newOrder;
            return newOrder;
        } else return "invalid";
    }

    /**
     * Deletes an order in the database
     * @param {*} index - the index of the order being deleted
     */
    spliceOrder(index) {
        this.database.splice(index, 1);
        return this.database;
    }
}

export default Orders;
