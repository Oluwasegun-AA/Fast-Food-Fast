/**
 * Stage an instance of required data to be pushed to database 
 * @param {*} req - incomming json request with data
 * @param {*} id  - orderId associated with the data
*/
export default {
    populate(req, id) {
        let newOrder = [
            req.body.user_name,
            req.body.user_role,
            req.body.user_email,
            req.body.user_password
        ];
        return newOrder;
    }
}

//Model data for a complete user data
export const fullUser = {
    "user_name": "Random Pat",
    "user_role": "User",
    "user_email": "pat@random.com",
    "user_password": "123pat"
}

//Model data for an order void of req.body.user_name
export const voidUser_name = {
    "user_role": "User",
    "user_email": "pat@random.com",
    "user_password": "123pat"
}

//Model data for an order void of req.body.user_email
export const voiduser_email = {
    "user_name": "Random Pat",
    "user_role": "User",
    "user_password": "123pat"
}

//Model data for an order void of req.body.user_password
export const voidUser_password = {
    "user_name": "Random Pat",
    "user_role": "User",
    "user_email": "pat@random.com",
}


//Model data for an order void of req.body.user_role
export const voidUser_role = {
    "user_name": "Random Pat",
    "user_email": "pat@random.com",
    "user_password": "123pat"
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
