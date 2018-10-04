/**
 * Stage an instance of required data to be pushed to database 
 * @param {*} req - incomming json data
 * @param {*} id  - orderId associated with the data
*/
export default {
    populate(req, id) {
        let newItem = {
            item_name: req.body.item_name,
            item_image: req.body.item_image,
            item_price: req.body.item_price,
            item_tag: req.body.item_tag
        };
        return newItem;
    }
}

//Model data for a complete Item
export const fullItem = {
    "item_name": "doughnut",
    "item_image": "imageSrc",
    "item_price": "20",
    "item_tag": "snacks"
}

//Model data for an order void of req.body.item_image
export const voidItem_image = {
    "item_name": "doughnut",
    "item_price": "20",
    "item_tag": "snacks"
}

//Model data for an order void of req.body.item_name
export const voidItem_name = {
    "item_image": "imageSrc",
    "item_price": "20",
    "item_tag": "snacks"
}

//Model data for an order void of req.body.item_price
export const voidPrice = {
    "item_name": "doughnut",
    "item_image": "imageSrc",
    "item_tag": "snacks"
}

//Model data for an order void of req.body.item_tag
export const voidItem_tag = {
    "item_name": "doughnut",
    "item_image": "imageSrc",
    "item_price": "20"
}

//Model data for an order with string where an interger is required
export const wrongDataType= {
    "item_name": "doughnut",
    "item_image": "imageSrc",
    "item_price": "A",
    "item_tag": "snacks"
}

//Instance of the database content
export const databaseItems = [
    {
        "itemId": "0",
        "itemImage": "imageSrc",
        "itemName": "doughnut",
        "itemPrice": "20",
        "itemTag": "snacks"
    },
    {
        "ItemId": "1",
        "itemImage": "imageSrc",
        "itemName": "Amala",
        "itemPrice": "200",
        "itemTag": "local dishes"
    }
]
//Instance of the database foodData[1]
export const firstItem = {
    "itemId": "0",
    "itemImage": "imageSrc",
    "itemName": "doughnut",
    "itemPrice": "20",
    "itemTag": "snacks"
}

//Instance of the database for push test
export const updatedOrder = [
    {
        "itemId": "0",
        "itemImage": "imageSrc",
        "itemName": "doughnut",
        "itemPrice": "20",
        "itemTag": "snacks"
    },
    {
        "ItemId": "1",
        "itemImage": "imageSrc",
        "itemName": "Amala",
        "itemPrice": "200",
        "itemTag": "local dishes"
    },
    {
        "itemId": "2",
        "itemImage": "imageSrc",
        "itemName": "doughnut",
        "itemPrice": "20",
        "itemTag": "snacks"
    }
]
