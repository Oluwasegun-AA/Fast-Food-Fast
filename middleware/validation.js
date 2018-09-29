/**
* Validate post and Put request contains all required parameters
* @param {*} req - incomming API Request
* @param {*} res - response to the validity of the data
*/
function validation(req, res, next) {
    let error = {};
    if (!(req.body.food)) { error.Food_Error = 'Bad Request, Food Name is Required'; }
    if (!(req.body.price)) { error.Price_Error = 'Bad Request, Price is Required'; }
    if (!(req.body.quantity)) { error.Quantity_Error = 'Bad Request,Quantity is Required'; }
    if (!(req.body.orderStatus)) { error.Order_status_Error = 'Bad Request, Order Status is Required'; }
    if (!(req.body.userAddress)) { error.Address_Error = 'Bad Request, User Address is Required'; }
    if ((Object.keys(error).length) > 0) { return res.status(400).send({ Status: 'unsuccessful', Error_Log: error }); }
    next();
}

/**
* Validate post and Put request contains a valid interger ID
* @param {*} req - incomming API request
* @param {*} res - response to the request Validity
*/
function idValidation(req, res, next) {
    let error = {};
    console.log('was here');
    let numbers = /[0-9]|[0-9][0-9]/g;
    const id = req.params.orderId;
    if (id === undefined || id === null || id === "") { error.orderId_Error = 'Bad Request, Order ID is Required'; }
    else { if (!(id.match(numbers))) { error.status = 'unsuccessful'; error.orderId_Error = 'Bad Request, Order ID is not Valid'; } }
    if ((Object.keys(error).length) > 0) { return res.status(400).send({ status: "unsuccessful", Error_Log: error }); }
    next();
}

function postIdValidation(req, res, next) {
    return res.status(400).send({ status: "unsuccessful", Error: "Bad Request, Order ID is not Required" });
}

//export statement
export default {
    Validation: validation,
    orderIdValidation: idValidation,
    PostIdValidation: postIdValidation
};