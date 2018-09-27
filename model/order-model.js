    /**
     * Stage an instance of required data to be pushed to database 
     * @param {*} req - incomming json data
     * @param {*} id  - orderId associated with the data
    */
   export default{
       populate(req, id){
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

     export const fullOrder = {
        "orderId": 1,
        "food": 'fufu',
        "quantity": 10,
        "price": 10,
        "orderStatus": "uncompleted",
        "userAddress": "address"

    }

    export const voidFood= {
        "orderId": 1,
        "quantity": 10,
        "price": 10,
        "orderStatus": "uncompleted",
        "userAddress": "address"
    }

    export const  voidPrice= {
        "orderId": 1,
        "food": 'fufu',
        "quantity": 10,
        "orderStatus": "uncompleted",
        "userAddress": "address"
    }

    export const voidQuantity= {
        "orderId": 1,
        "food": 'fufu',
        "price": 10,
        "orderStatus": "uncompleted",
        "userAddress": "address"
    }

    export const voidOrderStatus={
        "orderId": 1,
        "food": 'fufu',
        "quantity": 10,
        "price": 10,
        "userAddress": "address"
    }

    export const voidUserAddress={
        "orderId": 1,
        "food": 'fufu',
        "quantity": 10,
        "price": 10,
        "orderStatus": "uncompleted",
    }

    export const invalidOrderId= {
        "orderId": 300,
        "food": 'pizza',
        "quantity": 10,
        "price": 9500,
        "orderStatus": "completed",
        "userAddress": "address"
    }