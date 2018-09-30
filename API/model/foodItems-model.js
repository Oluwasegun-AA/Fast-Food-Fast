/**
 * Stage an instance of required data to be pushed to database 
 * @param {*} req - incomming json data
 * @param {*} id  - orderId associated with the data
*/
export default {
    populate(req, id) {
        let newItem = {
            itemId: id,
            itemImage: req.body.itemImage,
            itemName: req.body.itemName,
            itemPrice: req.body.itemPrice,
            itemTag: req.body.itemTag
        };
        return newItem;
    }
}

//Model data for a complete Item
export const fullItem = {
    "itemId": "0",
    "itemImage": "imageSrc",
    "itemName": "doughnut",
    "itemPrice": "20",
    "itemTag": "snacks"
}

//Model data for an order void of req.body.itemImage
export const voidImage = {
    "itemId": "0",
    "itemName": "doughnut",
    "itemPrice": "20",
    "itemTag": "snacks"
}

//Model data for an order void of req.body.itemName
export const voidName = {
    "itemId": "0",
    "itemImage": "imageSrc",
    "itemPrice": "20",
    "itemTag": "snacks"
}

//Model data for an order void of req.body.itemPrice
export const voidPrice = {
    "itemId": "0",
    "itemImage": "imageSrc",
    "itemName": "doughnut",
    "itemTag": "snacks"
}

//Model data for an order void of req.body.itemTag
export const voidTag = {
    "itemId": "0",
    "itemImage": "imageSrc",
    "itemName": "doughnut",
    "itemPrice": "20",
}


//Model data for an order void of req.body.itemId
export const invalidItemId = {
    "itemId": "300",
    "itemImage": "imageSrc",
    "itemName": "doughnut",
    "itemPrice": "20",
    "itemTag": "snacks"
}

//Model data for an order with string where an interger is required
export const  wrongDataType_price= {
    "itemId": "0",
    "itemImage": "imageSrc",
    "itemName": "doughnut",
    "itemPrice": "A",
    "itemTag": "snacks"
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
