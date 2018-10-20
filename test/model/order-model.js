//Model data for a complete Order
export const fullOrder = {
    "item_id": "1",
    "quantity": "2",
    "total_price": "2000",
    "order_status": "New",
    "customer_address": "Andela EPIC Tower, Lagos",
    "customer_id": "1"
}

//Model data for an order void of req.body.customer_id
export const invalidCustomer_id = {
    "item_id": "1",
    "quantity": "2",
    "total_price": "2000",
    "order_status": "New",
    "customer_address": "Andela EPIC Tower, Lagos",
    "customer_id": "600"
}

//Model data for an order with string where an interger is required
export const wrongDataType = {
    "item_id": "A",
    "quantity": "A",
    "total_price": "A",
    "order_status": "New",
    "customer_address": "Andela EPIC Tower, Lagos",
    "customer_id": "A"
}

//Instance of the database content
export const databaseOrders = [
    {
        "order_id": "1",
        "item_id": "1",
        "quantity": "2",
        "total_price": "2000",
        "order_status": "New",
        "customer_address": "Andela EPIC Tower, Lagos",
        "customer_id": "1",
        "created_at": "2018-10-18T07:13:56.584Z",
        "modified_date": null
    },
    {
        "order_id": "2",
        "item_id": "2",
        "quantity": "1",
        "total_price": "1000",
        "order_status": "Processing",
        "customer_address": "Andela EPIC Tower, Ibadan",
        "customer_id": "2",
        "created_at": "2018-10-18T07:13:56.584Z",
        "modified_date": null
    }
]

//Instance of the database[1]
export const firstOrder = {
    "order_id": "1",
    "item_id": "1",
    "quantity": "2",
    "total_price": "2000",
    "order_status": "New",
    "customer_address": "Andela EPIC Tower, Lagos",
    "customer_id": "1",
    "created_at": "2018-10-18T07:13:56.584Z",
    "modified_date": null
}