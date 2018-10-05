//Import statments
import storage from '../data/database';
import model from '../model/user-model';

/**
 * Adds an Order to the database
 * @param {*} req - incomming json data
 * @param {*} res - response to the validity of the data
 * @param {*} id  - orderId associated with the data
 */
let pushUser = (req, res, id) => {
    let newOrder = model.populate(req, id);
    storage.userData.push(newOrder);
    return newOrder;
}

/**
 * Updates an Order in the database
 * @param {*} req   - incomming json data
 * @param {*} res   - response to the validity of the data
 * @param {*} index - the index of the order being Updated
 * @param {*} id    - orderId associated with the data
 */
let putUser = (req, index, id) => {
    let newOrder = model.populate(req, id);
    storage.userData[index] = newOrder;
    return newOrder;
}

export default class Controller {
    /**
        * Gets All Users in the database and sends as response
        * @param {*} req - incomming request data
        * @param {*} res - response to the validity of the data 
    */
    getUsers(req, res) {
        res.status(200).send({
            success: 'true',
            status: 'Users retrieved successfully',
            users_data: storage.userData
        });
    }

    /**
         * Gets a particular User in the database and send as response
         * @param {*} req - incomming Request data
         * @param {*} res - response to the validity of the data
    */
    getUser(req, res) {
        const id = parseInt(req.params.userId, 10);
        let userIndex;
        storage.userData.map((user, index) => {
            if (user.userId == id) {
                userIndex = index;
                let value = storage.userData[index];
                res.status(200).send({
                    success: 'true',
                    status: 'User retrieved successfully',
                    user_data: value
                });
            };
        });
        if (userIndex == undefined) {
            return res.status(404).send({
                success: 'false',
                Status: 'User Not Found in the Database'
            })
        }
    }

    /**
        * Add an user to existing Users in the database
        *  @param {*} req - incomming json data
        *  @param {*} res - response to the sucess of the event
    */
    addUser(req, res) {
        let id = storage.userData.length;
        let sentuser = pushUser(req, res, id);
        res.status(201).send({
            userId: id,
            userData_sent: sentuser,
            status: 'User Sent Successfully'
        });
    }

    /**
     * Update an user in the database
     *  @param {*} req - incomming json data
     * @param {*} res - response to the success of the event 
     */
    updateUser(req, res) {

        let map = 0;
        const id = parseInt(req.params.userId, 10);
        let olduser = storage.userData[id];
        storage.userData.map((user, index) => {
            map++;
            if (user.userId == id) {
                map--;
                let state = putUser(req, index, id);
                res.status(200).send({
                    userId: id,
                    old_user: olduser,
                    user_update: state,
                    status: "Update successful"
                });
            } else {
                if (map == storage.userData.length) {
                    return res.status(410).send({
                        success: 'false',
                        status: 'Requested User is no longer available'
                    });
                } else return;
            }
        });
    }

    /**
    * Delete an user in the database
    *  @param {*} req - incomming request data
    * @param {*} res - response to the validity of the data
    */
    deleteUser(req, res) {
        const id = parseInt(req.params.userId, 10)
        let userIndex;
        storage.userData.map((user, index) => {
            if (user.userId == id) {
                userIndex = index;
                storage.userData.splice(index, 1)
                res.status(200).send({
                    success: 'true',
                    status: 'User deleted successfuly'
                });
            }
        });
        if (userIndex == undefined) {
            return res.status(404).send({
                success: 'false',
                Status: 'User Not Found in the Database'
            });
        }
    }
}