/**
 * Stage an instance of required data to be pushed to database 
 * @param {*} req - incomming json data
 * @param {*} id  - orderId associated with the data
*/
export default {
    populate(req, id) {
        let newOrder = {
            orderId: id,
            food: req.body.food,
            price: req.body.price,
            quantity: req.body.quantity,
            orderStatus: req.body.orderStatus,
            userAddress: req.body.userAddress
        };
        return newOrder;
    }
}

//Model data for a complete Order
export const fullOrder = {
    "orderId": "1",
    "food": 'fufu',
    "quantity": "10",
    "price": "10",
    "orderStatus": "uncompleted",
    "userAddress": "address"
}

//Model data for an order void of req.body.food
export const voidFood = {
    "orderId": "1",
    "quantity": "10",
    "price": "10",
    "orderStatus": "uncompleted",
    "userAddress": "address"
}

//Model data for an order void of req.body.price
export const voidPrice = {
    "orderId": "1",
    "food": 'fufu',
    "quantity": "10",
    "orderStatus": "uncompleted",
    "userAddress": "address"
}

//Model data for an order void of req.body.quantity
export const voidQuantity = {
    "orderId": "1",
    "food": 'fufu',
    "price": "10",
    "orderStatus": "uncompleted",
    "userAddress": "address"
}

//Model data for an order void of req.body.orderStatus
export const voidOrderStatus = {
    "orderId": "1",
    "food": 'fufu',
    "quantity": "10",
    "price": "10",
    "userAddress": "address"
}

//Model data for an order void of req.body.userAddress
export const voidUserAddress = {
    "orderId": "1",
    "food": 'fufu',
    "quantity": "10",
    "price": "10",
    "orderStatus": "uncompleted",
}

//Model data for an order void of req.body.orderId.
export const invalidOrderId = {
    "orderId": "300",
    "food": 'pizza',
    "quantity": "10",
    "price": "9500",
    "orderStatus": "completed",
    "userAddress": "address"
}

//Model data for an order with string where an interger is required
export const  wrongDataType_price= {
    "orderId": "0",
    "food": "peperony pizza",
    "price": "A",
    "quantity": "10",
    "orderStatus": "uncompleted",
    "userAddress": "Address"
}

//Model data for an order with string where an interger is required.
export const  wrongDataType_quantity= {
    "orderId": "0",
    "food": "peperony pizza",
    "price": "10",
    "quantity": "A",
    "orderStatus": "uncompleted",
    "userAddress": "Address"
}

//Instance of the database content.
export const databaseOrders = [
    {
        "orderId": "0",
        "food": "peperony pizza",
        "price": "10",
        "quantity": "10",
        "orderStatus": "uncompleted",
        "userAddress": "Address"
    },
    {
        "orderId": "1",
        "food": "grilled Chicken",
        "price": "20",
        "quantity": "20",
        "orderStatus": "uncompleted",
        "userAddress": "Address"
    }
]

//Instance of the database[1]
export const firstOrder = {
    "orderId": "0",
    "food": "peperony pizza",
    "price": 10,
    "quantity": "10",
    "orderStatus": "uncompleted",
    "userAddress": "Address"
}

//Instance of the database for push test
export const updatedOrder = [
    {
        "orderId": "0",
        "food": "peperony pizza",
        "price": "10",
        "quantity": "10",
        "orderStatus": "uncompleted",
        "userAddress": "Address"
    },
    {
        "orderId": "1",
        "food": "grilled Chicken",
        "price": "20",
        "quantity": "20",
        "orderStatus": "uncompleted",
        "userAddress": "Address"
    },
    {
        "orderId": "2",
        "food": 'fufu',
        "quantity": "10",
        "price": "10",
        "orderStatus": "uncompleted",
        "userAddress": "address"
    }
]
