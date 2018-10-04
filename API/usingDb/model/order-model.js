/**
 * Stage an instance of required data to be pushed to database 
 * @param {*} req - incomming json data
 * @param {*} id  - orderId associated with the data
*/
export default {
    populate(req) {
        let newOrder = {
            item_id: req.body.item_id,
            quantity: req.body.quantity,
            total_price: req.body.total_price,
            order_status: req.body.order_status,
            customer_id: req.body.customer_id,
            customer_address: req.body.customer_address
        };
        return newOrder;
    }
}

//Model data for a complete Order
export const fullOrder = {
    "item_id": "1",
    "quantity": "10",
    "total_price": "100",
    "order_status": "New",
    "customer_id": "1",
    "customer_address": "House 10, test street, Lagos"
}

//Model data for an order void of req.body.item_id
export const voidItem_id = {
    "quantity": "10",
    "total_price": "100",
    "order_status": "New",
    "customer_id": "1",
    "customer_address": "House 10, test street, Lagos"
}

//Model data for an order void of req.body.quantity
export const voidQuantity = {
    "item_id": "1",
    "total_price": "100",
    "order_status": "New",
    "customer_id": "1",
    "customer_address": "House 10, test street, Lagos"
}

//Model data for an order void of req.body.total_price
export const voidTotal_price = {
    "item_id": "1",
    "quantity": "10",
    "order_status": "New",
    "customer_id": "1",
    "customer_address": "House 10, test street, Lagos"
}

//Model data for an order void of req.body.order_status
export const voidOrder_status = {
    "item_id": "1",
    "quantity": "10",
    "total_price": "100",
    "customer_id": "1",
    "customer_address": "House 10, test street, Lagos"
}

//Model data for an order void of req.body.customer_Address
export const voidCustomer_address = {
    "item_id": "1",
    "quantity": "10",
    "total_price": "100",
    "order_status": "New",
    "customer_id": "1"
}

//Model data for an order void of req.body.customer_id
export const invalidCustomer_id = {
    "item_id": "1",
    "quantity": "10",
    "total_price": "100",
    "order_status": "New",
    "customer_address": "House 10, test street, Lagos"
}

//Model data for an order with string where an interger is required
export const  wrongDataType= {
    "item_id": "A",
    "quantity": "A",
    "total_price": "A",
    "order_status": "New",
    "customer_id": "A",
    "customer_address": "House 10, test street, Lagos"
}

//Instance of the database content
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
