//Import statments
import model from '../model/order-model';
import database from '../db/Index';


export default class Controller {
    /**
        * Gets All orders in the database and sends as response
        * @param {*} req - incomming request data
        * @param {*} res - response to the validity of the data 
    */
    async getOrders(req, res) {
        const command = 'SELECT * FROM orders';
        try {
            const { rows, rowCount } = await database.query(command);
            return res.status(200).send({
                success: 'true',
                status: 'Orders retrieved successfully',
                orders: rows,
                total_orders: rowCount
            });
        } catch (error) {
            return res.status(400).send({
                success: 'false',
                status: 'Bad Request',
                message : error
            });
        }
    }

    /**
         * Gets a particular order in the database and send as response
         * @param {*} req - incomming Request data
         * @param {*} res - response to the validity of the data
         */
    async getOrder(req, res) {
        const command = 'SELECT * FROM orders WHERE order_id=$1';
        try {
            const { rows } = await database.query(command, [req.params.orderId]);
            if (!rows[0]) {
                return res.status(404).send({
                    success: 'false',
                    status: 'Order Not Found in the Database'
                });
            } else return res.status(200).send({
                success: 'true',
                status: 'Order retrieved successfully',
                order: rows[0]
            });
        } catch (error) {
            return res.status(400).send({
                success: 'false',
                status: 'Bad Request',
                message : error
            })
        }
    }

/**
    * Add an Order to existing orders in the database
    *  @param {*} req - incomming json data
    *  @param {*} res - response to the sucess of the event
*/
async addOrder(req, res) {
    let newOrder = model.populate(req);
    const command = `INSERT INTO
    orders(item_id, quantity, total_price, order_status,customer_id, customer_address)
      VALUES($1, $2, $3, $4, $5,$6)
      returning *`;
    try {
        const { rows } = await database.query(command, newOrder);
        return res.status(201).send({
            order_sent: rows[0],
            status: 'Order Sent Successfully'
        });
    } catch (error) {
        return res.status(400).send({
            success: 'false',
            status: 'Bad Request',
            message : error
        });
    }
}

/**
 * Update an order in the database
 *  @param {*} req - incomming json data
 * @param {*} res - response to the success of the event 
 */
async updateOrder(req, res){
    let order = model.populate(req);
    let date = new Date();
    order.push(date);
    order.push(req.params.orderId);
    const findQuery = 'SELECT * FROM orders WHERE order_id=$1';
    const updateQuery =`UPDATE orders SET item_id=$1,quantity=$2,total_price=$3,order_status=$4,customer_id=$5,customer_address=$6,modified_date=$7 WHERE order_id=$8 returning *`;
    try {
      const { rows } = await database.query(findQuery, [req.params.orderId]);
      if(!rows[0]) {
        return res.status(410).send({
            success: 'false',
            status: 'Order Not Found in the Database'
        });
      }
      console.log("again")
      const response = await database.query(updateQuery, order);
      console.log("entered again")
      return res.status(200).send({
        orderId: req.params.orderId,
        old_Order: rows[0],
        update: response.rows[0],
        status: "Update successful"
    });
    } catch(err) {
      return res.status(400).send({
        success: 'false',
        status: 'Bad Request',
        message : err
    });
    }
}


/**
* Delete an order in the database
*  @param {*} req - incomming request data
* @param {*} res - response to the validity of the data
*/
async deleteOrder(req, res) {
    const deleteQuery = 'DELETE FROM orders WHERE order_id=$1 returning *';
    try {
      const { rows } = await database.query(deleteQuery, [req.params.orderId]);
      if(!rows[0]) {
        return res.status(404).send({
            success: 'false',
            status: 'Order Not Found in the Database'
        });
      }
      return res.status(200).send({
        success: 'true',
        status: 'Order deleted successfuly'
    });
    } catch(error) {
      return res.status(400).send({
        success: 'false',
        status: 'Bad Request',
        message : error
    });
    }
  }
}