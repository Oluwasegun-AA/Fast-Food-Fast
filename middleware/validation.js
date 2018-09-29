 /**
* Validate post and Put request contains all required parameters
* @param {*} req - incomming json data
* @param {*} res - response to the validity of the data
*/
export default (req, res, next)=> {
    let error = {};
    let numbers = /[0-9]|[0-9][0-9]/g;
    if (!((req.body.price).match(numbers))) {  return res.status(400).send({Status: 'unsuccessful', Error_Log: 'Bad Request, Price is not Valid'});}
    if (!((req.body.quantity).match(numbers))) {  return res.status(400).send({Status: 'unsuccessful', Error_Log: 'Bad Request, Quantity is not Valid'});}
    if (!(req.body.food)) {error.Food_Error = 'Food Name is Required';}
    if (!(req.body.price)) {error.Price_Error ='Price is Required';}
    if (!(req.body.quantity)) {error.Quantity_Error = 'Quantity is Required';}
    if (!(req.body.orderStatus)) {error.Order_status_Error = 'Order Status is Required';}
    if (!(req.body.userAddress)){error.Address_Error = 'User Address is Required';}
    if ((Object.keys(error).length) > 0){ return res.status(400).send({Status: 'unsuccessful', Error_Log: error});}
    next();
}