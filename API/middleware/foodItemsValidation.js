/**
* Validate post and Put request contains all required parameters
* @param {*} req - incomming API Request
* @param {*} res - response to the validity of the data
*/
function validation(req, res, next) {
    let error = {};
    let numbers = /[0-9]|[0-9][0-9]/g;
    if ((req.body.itemPrice) != undefined){if (!((req.body.itemPrice).match(numbers))) {return res.status(400).send({status: 'unsuccessful', Error_Log: 'Bad Request, Price is not Valid'});}}
    if (!(req.body.itemName)) {error.Name_Error = 'Food Name is Required';}
    if (!(req.body.itemPrice)) {error.Price_Error ='Item Price is Required';}
    if (!(req.body.itemTag)) {error.Tag_Error = 'Item Tag is Required';}
    if (!(req.body.itemImage)) {error.Tag_Error = 'Item Tag is Required';}
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
    const id = req.params.itemId;
    if (id === undefined || id === null || id === "") { error.Id_Error = 'Bad Request, food Item ID is Required'; }
    else { if (!(id.match(numbers))) { error.status = 'unsuccessful'; error.Id_Error = 'Bad Request, food Item ID is not Valid'; } }
    if ((Object.keys(error).length) > 0) { return res.status(400).send({ status: "unsuccessful", Error_Log: error }); }
    next();
}

function postIdValidation(req, res, next) {
    return res.status(400).send({ status: "unsuccessful", Error: "Bad Request, food Item ID is not Required" });
}

//export statement
export default {
    Validation: validation,
    foodItemIdValidation: idValidation,
    PostIdValidation: postIdValidation
};