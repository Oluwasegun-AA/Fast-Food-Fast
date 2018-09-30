/**
 * Stage an instance of required data to be pushed to database 
 * @param {*} req - incomming json request with data
 * @param {*} id  - orderId associated with the data
*/
export default {
    populate(req, id) {
        let newOrder = {
            userId: id,
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword,
        };
        return newOrder;
    }
}

//Model data for a complete user data
export const fullUser = {
    "userID": "0",
    "userName": "pat",
    "userEmail": "pat@gmail.com",
    "userPassword": "123pat"
}

//Model data for an order void of req.body.userName
export const voidName = {
    "userID": "0",
    "userEmail": "pat@gmail.com",
    "userPassword": "123pat"
}

//Model data for an order void of req.body.userEmail
export const voidEmail = {
    "userID": "0",
    "userName": "pat",
    "userPassword": "123pat"
}

//Model data for an order void of req.body.userPassword
export const voidPassword = {
    "userID": "0",
    "userName": "pat",
    "userEmail": "pat@gmail.com",
}


//Model data for an order void of req.body.userId
export const invalidOrderId = {
    "userID": "300",
    "userName": "pat",
    "userEmail": "pat@gmail.com",
    "userPassword": "123pat"
}

//Instance of the database content
export const databaseOrders = [
    {
        "userID": "0",
        "userName": "pat",
        "userEmail": "pat@gmail.com",
        "userPassword": "123pat"
    },
    {
        "userID": "1",
        "userName": "rose",
        "userEmail": "rose@gmail.com",
        "userPassword": "123rose"
    }
]

//Instance of the database userData[1]
export const firstUser = {
    "userID": "0",
    "userName": "pat",
    "userEmail": "pat@gmail.com",
    "userPassword": "123pat"
}

//Instance of the database for push test
export const updatedUser = [
    {
        "userID": "0",
        "userName": "pat",
        "userEmail": "pat@gmail.com",
        "userPassword": "123pat"
    },
    {
        "userID": "1",
        "userName": "rose",
        "userEmail": "rose@gmail.com",
        "userPassword": "123rose"
    },
    {
        "userID": "1",
        "userName": "pat",
        "userEmail": "pat@gmail.com",
        "userPassword": "123pat"
    }
]
