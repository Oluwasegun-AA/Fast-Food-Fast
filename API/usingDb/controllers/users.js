//Import statments
import model from '../model/user-model';
import pool from '../db/index';

export default class Controller {
    /**
        * Gets All user_accounts in the database and sends as response
        * @param {*} req - incomming request data
        * @param {*} res - response to the validity of the data 
    */
    async getUsers(req, res) {
        const command = 'SELECT * FROM user_accounts';
        try {
            const { rows, rowCount } = await pool.query(command);
            return res.status(200).send({
                success: 'true',
                status: 'Food Items retrieved successfully',
                user_accounts: rows,
                total_user_accounts: rowCount
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
         * Gets a particular User in the database and send as response
         * @param {*} req - incomming Request data
         * @param {*} res - response to the validity of the data
    */
    async getUser(req, res) {
        const id = parseInt(req.params.userId, 10);
        const command = 'SELECT * FROM user_accounts WHERE id = $1';
        try {
            const { rows } = await db.query(command, id);
            if (!rows[0]) {
                return res.status(404).send({
                    success: 'false',
                    status: 'User Not Found in the Database'
                });
            } else return res.status(200).send({
                success: 'true',
                status: 'User retrieved successfully',
                User: rows[0]
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
    * Add an User to existing user_accounts in the database
    *  @param {*} req - incomming json data
    *  @param {*} res - response to the sucess of the event
*/
async addUser(req, res) {
    let newUser = model.populate(req);
    const command = `INSERT INTO
    user_accounts(user_name,user_role,user_email,user_password)
      VALUES($1, $2, $3, $4) returning *`;
    try {
        const { rows } = await pool.query(command, newUser);
        return res.status(201).send({
            User_sent: rows[0],
            status: 'User Sent Successfully'
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
 * Update an User in the database
 *  @param {*} req - incomming json data
 * @param {*} res - response to the success of the event 
 */
async updateUser(req, res){
    let user = model.populate(req);
    user.reqId = req.params,userId;
    const findQuery = 'SELECT * FROM user_accounts WHERE id=$1  returning *';
    const updateQuery =`UPDATE user_accounts
      SET user_name=$1,user_role=$2,user_email=$3,user_password=$4 WHERE id=$5 returning *`;
    try {
      const { rows } = await db.query(findQuery, [req.params.userId]);
      if(!rows[0]) {
        return res.status(410).send({
            success: 'false',
            status: 'Requested resourse is no longer available'
        });
      }
      const response = await db.query(updateQuery, user);
      return res.status(200).send({
        userId: id,
        old_user: rows[0],
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
* Delete an User in the database
*  @param {*} req - incomming request data
* @param {*} res - response to the validity of the data
*/
async updateUser(req, res) {
    const deleteQuery = 'DELETE FROM user_accounts WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.userId]);
      if(!rows[0]) {
        return res.status(404).send({
            success: 'false',
            status: 'User Not Found in the Database'
        });
      }
      return res.status(204).send({
        success: 'true',
        status: 'User deleted successfuly'
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