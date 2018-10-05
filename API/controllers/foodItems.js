//Import statments
import storage from '../data/database';
import model from '../model/foodItems-model';

/**
 * Adds a foodItem to the database
 * @param {*} req - incomming json request with data
 * @param {*} res - response to the validity of the data
 * @param {*} id  - itemId associated with the data
 */
let pushFoodItem = (req, res, id) => {
    let newFoodItem = model.populate(req, id);
    storage.foodItemsData.push(newFoodItem);
    return newFoodItem;
}

/**
 * Updates a foodItem in the database
 * @param {*} req   - incomming json request with data
 * @param {*} res   - response to the validity of the data
 * @param {*} index - the index of the foodItem being Updated
 * @param {*} id    - itemId associated with the data
 */
let putFoodItem = (req, index, id) => {
    let newFoodItem = model.populate(req, id);
    storage.foodItemsData[index] = newFoodItem;
    return newFoodItem;
}


export default class Controller {
    /**
        * Gets All foodItems in the database and sends as response
        * @param {*} req - incomming request data
        * @param {*} res - response to the validity of the data
    */
    getFoodItems(req, res) {
        res.status(200).send({
            success: 'true',
            Status: 'Food Items retrieved successfully',
            food_Items: storage.foodItemsData
        });
    }

    /**
         * Gets a particular foodItem in the database and send as response
         * @param {*} req - incomming Request data
         * @param {*} res - response to the validity of the data
    */
    getFoodItem(req, res) {
        const id = parseInt(req.params.itemId, 10);
        let foodItemIndex;
        storage.foodItemsData.map((foodItem, index) => {
            if (foodItem.itemId == id) {
                foodItemIndex = index;
                let value = storage.foodItemsData[index];
                res.status(200).send({
                    success: 'true',
                    status: 'Food Item retrieved successfully',
                    food_Item: value
                });
            };
        });
        if (foodItemIndex == undefined) {
            return res.status(404).send({
                success: 'false',
                status: 'Food Item Not Found in the Database'
            })
        }
    }

    /**
        * Add a foodItem to existing foodItems in the foodData
        *  @param {*} req - incomming json request with data
        *  @param {*} res - response to the sucess of the event
    */
    addFoodItem(req, res) {
        let id = storage.foodItemsData.length;
        let sentFoodItem = pushFoodItem(req, res, id);
        res.status(201).send({
            itemId: id,
            food_item_sent: sentFoodItem,
            status: 'Food Item Sent Successfully'
        });
    }

    /**
     * Update a foodItem in the foodItemsData
     *  @param {*} req - incomming json request with data
     * @param {*} res - response to the success of the event 
     */
    updateFoodItem(req, res) {
        let map = 0;
        const id = parseInt(req.params.itemId, 10);
        let oldFoodItem = storage.foodItemsData[id];
        storage.foodItemsData.map((foodItem, index) => {
            map++;
            if (foodItem.itemId == id) {
                map--;
                let state = putFoodItem(req, index, id);
                res.status(200).send({
                    itemId: id,
                    old_foodItem: oldFoodItem,
                    update: state,
                    Status: "Update successful"
                });
            } else {
                if (map == storage.foodItemsData.length) {
                    return res.status(410).send({
                        success: 'false',
                        Status: 'Requested Food Item is no longer available'
                    });
                } else return;
            }
        });
    }


    /**
    * Delete a foodItem in the foodItemsData
    *  @param {*} req - incomming request data
    * @param {*} res - response to the validity of the data
    */
    deleteFoodItem(req, res) {
        const id = parseInt(req.params.itemId, 10)
        let foodItemIndex;
        storage.foodItemsData.map((foodItem, index) => {
            if (foodItem.itemId == id) {
                foodItemIndex = index
                storage.foodItemsData.splice(index, 1)
                res.status(200).send({
                    success: 'true',
                    Status: 'Food Item deleted successfuly'
                });
            }
        });
        if (foodItemIndex == undefined) {
            return res.status(404).send({
                success: 'false',
                Status: 'Food Item Not Found in the Database'
            });
        }
    }
}