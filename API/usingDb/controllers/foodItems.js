//Import statments
import storage from '../data/database';
import model from '../model/order-model';
import pool from '../db/index';

export default class Controller {
    /**
        * Gets All food_items in the database and sends as response
        * @param {*} req - incomming request data
        * @param {*} res - response to the validity of the data 
    */
    async getFoodItems(req, res) {
        const command = 'SELECT * FROM food_items';
        try {
            const { rows, rowCount } = await pool.query(command);
            return res.status(200).send({
                success: 'true',
                status: 'Food Items retrieved successfully',
                Food_Items: rows,
                total_Food_Items: rowCount
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
    async getFoodItem(req, res) {
        const id = parseInt(req.params.orderId, 10);
        const command = 'SELECT * FROM food_items WHERE id = $1';
        try {
            const { rows } = await db.query(command, id);
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
    * Add an Order to existing food_items in the database
    *  @param {*} req - incomming json data
    *  @param {*} res - response to the sucess of the event
*/
async addFoodItem(req, res) {
    let newOrder = model.populate(req);
    const command = `INSERT INTO
    food_items(item_id, quantity, total_price, order_status,customer_id, customer_address)
      VALUES($1, $2, $3, $4, $5,$6)
      returning *`;
    try {
        const { rows } = await pool.query(command, newOrder);
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
async updateFoodItem(req, res){
    let order = model.populate(req);
    order.reqId = req.params,orderId;
    const findQuery = 'SELECT * FROM food_items WHERE id=$1';
    const updateQuery =`UPDATE food_items
      SET item_id=$1, quantity=$2, total_price=$3, order_status=$4,customer_id=$5, customer_address=$6
      WHERE id=$7 returning *`;
    try {
      const { rows } = await db.query(findQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(410).send({
            success: 'false',
            status: 'Requested resourse is no longer available'
        });
      }
      const response = await db.query(updateQuery, order);
      return res.status(200).send({
        orderId: id,
        old_Order: oldOrder,
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
async updateFoodItem(req, res) {
    const deleteQuery = 'DELETE FROM food_items WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({
            success: 'false',
            status: 'Order Not Found in the Database'
        });
      }
      return res.status(204).send({
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