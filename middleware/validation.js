 /**
* Validate post and Put request contains all required parameters
* @param {*} req - incomming json data
* @param {*} res - response to the validity of the data
*/
export default (req, res, next)=> {
    let error = {};
    if (!(req.body.food)) {error.Food_Error = 'Food Name is Required';}
    if (!(req.body.price)) {error.Price_Error ='Price is Required';}
    if (!(req.body.quantity)) {error.Quantity_Error = 'Quantity is Required';}
    if (!(req.body.orderStatus)) {error.Order_status_Error = 'Order Status is Required';}
    if (!(req.body.userAddress)){error.Address_Error = 'User Address is Required';}
    if ((Object.keys(error).length) > 0){ return res.status(400).send({Status: 'unsuccessful', Error_Log: error});}
    next();
}