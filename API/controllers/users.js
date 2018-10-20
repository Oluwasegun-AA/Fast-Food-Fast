//Import statments
import model from '../seed/populate';
import database from '../db/Index';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
dotenv.config();

// create a token
async function createToken(data) {
    const token = await jwt.sign({
        user_id: data.user_id,
        user_password: data.user_password,
        user_role: data.user_role,
        user_email: data.user_email,
        user_name: data.user_name
    }, process.env.User_Secret, {
            expiresIn: 4000000000000 // expires in 1 hour
        });
    return token;
}

export default class Controller {
    async signup(req, res) {
        const hashedPassword = await bcrypt.hashSync(req.body.user_password, 10);
        const newUser = await model.populate(req, hashedPassword);
        // Save User Data
        const command = `INSERT INTO
        user_accounts(user_name,user_role,user_email,user_password)
          VALUES($1, $2, $3, $4) returning *`;
        const { rows } = await database.query(command, newUser);
        const token = await createToken(rows[0]);
        return res.status(201).send({
            status: 'User Sent Successfully',
            auth: "true",
            token: token,
            User_sent: rows[0]
        });
    };

    async login(req, res) {
        const command = 'SELECT * FROM user_accounts WHERE user_email=$1';
        const { rows } = await database.query(command, [req.body.user_email]);
        if (!rows[0]) {
            return res.status(404).send({
                success: 'false',
                status: 'User Not Found in the Database'
            });
        }
        const passwordIsValid = await bcrypt.compareSync(req.body.user_password, rows[0].user_password);
        if (!passwordIsValid) return res.status(401).send({ auth: "false", token: null });
        const token = await createToken(req.body);
        res.status(200).send({ auth: "true", token: token, message: "Login Successful", user: rows[0] });
    }

    /**
        * Gets All user_accounts in the database and sends as response
        * @param {*} req - incomming request data
        * @param {*} res - response to the validity of the data 
    */
    async getUsers(req, res) {
        const command = 'SELECT * FROM user_accounts';
        const { rows, rowCount } = await database.query(command);
        return res.status(200).send({
            success: 'true',
            status: 'Users Data retrieved successfully',
            user_accounts: rows,
            total_user_accounts: rowCount
        });
    }

    /**
         * Gets a particular User in the database and send as response
         * @param {*} req - incomming Request data
         * @param {*} res - response to the validity of the data
    */
    async getUser(req, res) {
        const command = 'SELECT * FROM user_accounts WHERE user_id=$1';
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
    }

    /**
        * Add an User to existing user_accounts in the database
        *  @param {*} req - incomming json data
        *  @param {*} res - response to the sucess of the event
    */
    async addUser(req, res) {
        const hashedPassword = req.body.user_password;
        let newUser = model.populate(req, hashedPassword);
        const command = `INSERT INTO
    user_accounts(user_name,user_role,user_email,user_password)
      VALUES($1, $2, $3, $4) returning *`;
        const { rows } = await database.query(command, newUser);
        return res.status(201).send({
            User_sent: rows[0],
            status: 'User Sent Successfully'
        });
    }

    /**
     * Update an User in the database
     *  @param {*} req - incomming json data
     * @param {*} res - response to the success of the event 
     */
    async updateUser(req, res) {
        const hashedPassword = req.body.user_password;
        let user = model.populate(req, hashedPassword);
        let date = new Date();
        user.push(date);
        user.push(req.params.userId);
        const findQuery = `SELECT * FROM user_accounts WHERE user_id=$1`;
        const updateQuery = `UPDATE user_accounts SET user_name=$1,user_role=$2,user_email=$3,user_password=$4, modified_date=$5 WHERE user_id=$6 returning *`;
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
    }

    /**
    * Delete an User in the database
    *  @param {*} req - incomming request data
    * @param {*} res - response to the validity of the data
    */
    async deleteUser(req, res) {
        const deleteQuery = 'DELETE FROM user_accounts WHERE user_id=$1 returning *';
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
    }
}