//Import statments
import model from '../model/foodItems-model';
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
         * Gets a particular item in the database and send as response
         * @param {*} req - incomming Request data
         * @param {*} res - response to the validity of the data
         */
    async getFoodItem(req, res) {
        const id = parseInt(req.params.itemId, 10);
        const command = 'SELECT * FROM food_items WHERE id=$1';
        try {
            const { rows } = await pool.query(command, id);
            if (!rows[0]) {
                return res.status(404).send({
                    success: 'false',
                    status: 'Item Not Found in the Database'
                });
            } else return res.status(200).send({
                success: 'true',
                status: 'Item retrieved successfully',
                Item: rows[0]
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
    * Add an Item to existing food_items in the database
    *  @param {*} req - incomming json data
    *  @param {*} res - response to the sucess of the event
*/
async addFoodItem(req, res) {
    let newItem = model.populate(req);
    const command = `INSERT INTO
    food_items(item_name,item_image,item_price,item_tag)
      VALUES($1, $2, $3, $4)
      returning *`;
    try {
        const { rows } = await pool.query(command, newItem);
        return res.status(201).send({
            item_sent: rows[0],
            status: 'Item Sent Successfully'
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
 * Update an Item in the database
 *  @param {*} req - incomming json data
 * @param {*} res - response to the success of the event 
 */
async updateFoodItem(req, res){
    let item = model.populate(req);
    item.reqId = req.params,itemId;
    const findQuery = 'SELECT * FROM food_items WHERE id=$1';
    const updateQuery =`UPDATE food_items
      SET item_name=$1,item_image=$2,item_price=$3,item_tag=$4
      WHERE id=$5 returning *`;
    try {
      const { rows } = await db.query(findQuery, [req.params.itemid]);
      if(!rows[0]) {
        return res.status(410).send({
            success: 'false',
            status: 'Requested resourse is no longer available'
        });
      }
      const response = await db.query(updateQuery, item);
      return res.status(200).send({
        itemId: id,
        old_item: rows[0],
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
* Delete an Item in the database
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
            status: 'Item Not Found in the Database'
        });
      }
      return res.status(204).send({
        success: 'true',
        status: 'Item deleted successfuly'
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