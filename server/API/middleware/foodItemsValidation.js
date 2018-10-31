/**
* Validate post and Put request contains all required parameters
* @param {*} req - incomming API Request
* @param {*} res - response to the validity of the data
*/
function menuValidation(req, res, next) {
    let err = {};
    let num = /[0-9]|[0-9][0-9]/g;
    if ((req.body.item_price) != undefined) { if (!((num).test(req.body.item_price))) {err.Price_Error = 'Price is not Valid' } }
    if (!(req.body.item_name)) { err.Name_Error = 'Item Name is Required'; }
    if (!(req.body.item_price)) { err.Price_Error = 'Item Price is Required'; }
    if (!(req.body.item_tag)) { err.Tag_Error = 'Item Tag is Required'; }
    if (!(req.body.item_image)) { err.Tag_Error = 'Item Image is Required'; }
    if ((Object.keys(err).length) > 0) { return res.status(400).send({ status: 'Bad Request', success: "false", Error_Log: err }); }
    next();
}

/**
* Validate post and Put request contains a valid interger ID
* @param {*} req - incomming API request
* @param {*} res - response to the request Validity
*/
function menuIdValidation(req, res, next) {
    let err = {};
    let num = /[0-9]|[0-9][0-9]/g;
    const id = req.params.itemId;
    if (id === undefined || id === null || id === "") { err.Id_Error = 'Bad Request, food Item ID is Required'; }
    else { if (!(id.match(num))) { err.status = 'unsuccessful'; err.Id_Error = 'Bad Request, food Item ID is not Valid'; } }
    if ((Object.keys(err).length) > 0) { return res.status(400).send({ status: "unsuccessful", Error_Log: err }); }
    next();
}

function menuPostIdValidation(req, res, next) {
    return res.status(400).send({ status: "unsuccessful", Error: "Bad Request, food Item ID is not Required" });
}

//export statement
export default {
    Validation: menuValidation,
    foodItemIdValidation: menuIdValidation,
    PostIdValidation: menuPostIdValidation
};