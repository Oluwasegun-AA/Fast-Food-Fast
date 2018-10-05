//Import statments
import model from '../model/user-model';
import database from '../db/index'

export default class Controller {
    /**
        * Gets All user_accounts in the database and sends as response
        * @param {*} req - incomming request data
        * @param {*} res - response to the validity of the data 
    */
    async getUsers(req, res) {
        const command = 'SELECT * FROM user_accounts';
        try {
            const { rows, rowCount } = await database.query(command);
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
                message: 'Users Not Found'
            });
        }
    }

    /**
         * Gets a particular User in the database and send as response
         * @param {*} req - incomming Request data
         * @param {*} res - response to the validity of the data
    */
    async getUser(req, res) {
        const command = 'SELECT * FROM user_accounts WHERE user_id=$1';
        try {
            const { rows } = await database.query(command, [req.params.userId]);
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
                message: 'User Not Found'
            });
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
            const { rows } = await database.query(command, newUser);
            return res.status(201).send({
                User_sent: rows[0],
                status: 'User Sent Successfully'
            });
        } catch (error) {
            return res.status(400).send({
                success: 'false',
                status: 'Bad Request',
                message: error
            });
        }
    }

    /**
     * Update an User in the database
     *  @param {*} req - incomming json data
     * @param {*} res - response to the success of the event 
     */
    async updateUser(req, res) {
        let user = model.populate(req);
        let date = new Date();
        user.push(date);
        user.push(req.params.userId);
        const findQuery = `SELECT * FROM user_accounts WHERE user_id=$1`;
        const updateQuery = `UPDATE user_accounts SET user_name=$1,user_role=$2,user_email=$3,user_password=$4, modified_date=$5 WHERE user_id=$6 returning *`;
        try {
            const { rows } = await database.query(findQuery, [req.params.userId]);
            if (!rows[0]) {
                return res.status(410).send({
                    success: 'false',
                    status: 'Requested resourse is no longer available'
                });
            }
            const response = await database.query(updateQuery, user);
            return res.status(200).send({
                userId: req.params.userId,
                old_user: rows[0],
                update: response.rows[0],
                status: "Update successful"
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({
                success: 'false',
                status: 'Bad Request',
                message: 'User Not Found'
            });
        }
    }

    /**
    * Delete an User in the database
    *  @param {*} req - incomming request data
    * @param {*} res - response to the validity of the data
    */
    async deleteUser(req, res) {
        const deleteQuery = 'DELETE FROM user_accounts WHERE user_id=$1 returning *';
        try {
            const { rows } = await database.query(deleteQuery, [req.params.userId]);
            if (!rows[0]) {
                return res.status(404).send({
                    success: 'false',
                    status: 'User Not Found in the Database'
                });
            }
            return res.status(200).send({
                success: 'true',
                status: 'User deleted successfuly'
            });
        } catch (error) {
            return res.status(400).send({
                success: 'false',
                status: 'Bad Request',
                message: "User Not Found"
            });
        }
    }
}