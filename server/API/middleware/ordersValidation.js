/**
* Validate post and Put request contains all required parameters
* @param {*} req - incomming API Request
* @param {*} res - response to the validity of the data
* @param {*} next 
*/
function orderValidation(req, res, next) {
    let wrong = {};
    let digits = /[0-9]/;
    if ((req.body.total_price) != undefined) { if (!((digits).test(req.body.total_price))) {wrong.Price_Error = 'Total Price is not Valid';}} 
    if (!(req.body.total_price)) { wrong.Price_Error = 'Total Price is Required'; }
    if ((req.body.quantity) != undefined) { if (!((digits).test(req.body.quantity))) {wrong.Quantity_Error = 'Quantity is not Valid';}} 
    if (!(req.body.quantity)) { wrong.Quantity_Error = 'Quantity is Required'; }
    if ((req.body.customer_id) != undefined) { if (!((digits).test(req.body.customer_id))) {wrong.CustomerId_Error = 'Customer Id is not Valid';}}
    if (!(req.body.customer_id)) { wrong.CustomerId_Error = 'Customer ID is Required'; }
    if (!(req.body.order_status)) { wrong.Status_Error = 'Order Status is Required'; }
    if (!(req.body.customer_address)) { wrong.Price_Error = 'Customer Address is Required'; }
    if ((req.body.item_id) != undefined) { if (!((digits).test(req.body.item_id))) { wrong.ItemId_Error = 'Item Id is not Valid';}}
    if (!(req.body.item_id)) { wrong.ItemId_Error = 'Item ID is Required'; }
    if ((Object.keys(wrong).length) > 0) { return res.status(400).send({ status: 'Bad Request', success: 'false', Error_Log: wrong }); }
    next();
}

/**
* Validate post and Put request contains a valid interger ID
* @param {*} req - incomming API request
* @param {*} res - response to the request Validity
* @param {*} next 
*/
function orderIdValidation(req, res, next) {
    let wrong = {};
    let digits = /[0-9]|[0-9][0-9]/g;
    const id = req.params.orderId;
    if (id === undefined || id === null || id === "") { wrong.orderId_Error = 'Bad Request, Order ID is Required'; }
    else { if (!(id.match(digits))) { wrong.status = 'unsuccessful'; wrong.orderId_Error = 'Bad Request, Order ID is not Valid'; } }
    if ((Object.keys(wrong).length) > 0) { return res.status(400).send({ status: "unsuccessful", Error_Log: wrong }); }
    next();
}

function orderPostIdValidation(req, res, next) {
    return res.status(400).send({ status: "unsuccessful", Error: "Bad Request, Order ID is not Required" });
}

//export statement
export default {
    Validation: orderValidation,
    orderIdValidation: orderIdValidation,
    PostIdValidation: orderPostIdValidation
};