/**
* Validate post and Put request contains all required parameters
* @param {*} req - incomming API Request
* @param {*} res - response to the validity of the data
*/
function validation(req, res, next) {
    let error = {};
    let numbers = /[0-9]|[0-9][0-9]/g;
    if ((req.body.price) != undefined){if (!((req.body.price).match(numbers))) {  return res.status(400).send({status: 'unsuccessful', Error_Log: 'Bad Request, Price is not Valid'});}}
    if ((req.body.quantity) != undefined){if (!((req.body.quantity).match(numbers))) {  return res.status(400).send({status: 'unsuccessful', Error_Log: 'Bad Request, Quantity is not Valid'});}}
    if (!(req.body.food)) {error.Food_Error = 'Food Name is Required';}
    if (!(req.body.price)) {error.Price_Error ='Price is Required';}
    if (!(req.body.quantity)) {error.Quantity_Error = 'Quantity is Required';}
    if (!(req.body.orderStatus)) {error.Order_status_Error = 'Order Status is Required';}
    if (!(req.body.userAddress)){error.Address_Error = 'User Address is Required';}
    if ((Object.keys(error).length) > 0){ return res.status(400).send({status: 'Bad Request', success:"false",  Error_Log: error});}
    next();
}

/**
* Validate post and Put request contains a valid interger ID
* @param {*} req - incomming API request
* @param {*} res - response to the request Validity
*/
function idValidation(req, res, next) {
    let error = {};
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