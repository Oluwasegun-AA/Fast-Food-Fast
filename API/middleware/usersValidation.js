/**
* Validate post and Put request contains all required parameters
* @param {*} req - incomming API Request
* @param {*} res - response to the validity of the data
*/
function validation(req, res, next) {
    let error = {};
    let numbers = /[0-9]|[0-9][0-9]/g;
   if (!(req.body.userName)) {error.UserName_Error = 'userName is Required';}
    if (!(req.body.userEmail)) {error.Email_Error ='Email is Required';}
    if (!(req.body.userPassword)) {error.Password_Error = 'Password is Required';}
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
    const id = req.params.userId;
    if (id === undefined || id === null || id === "") { error.userId_Error = 'Bad Request, User ID is Required'; }
    else { if (!(id.match(numbers))) { error.status = 'unsuccessful'; error.userId_Error = 'Bad Request, User ID is not Valid'; } }
    if ((Object.keys(error).length) > 0) { return res.status(400).send({ status: "unsuccessful", Error_Log: error }); }
    next();
}

function postIdValidation(req, res, next) {
    return res.status(400).send({ status: "unsuccessful", Error: "Bad Request, User ID is not Required" });
}

//export statement
export default {
    Validation: validation,
    userIdValidation: idValidation,
    PostIdValidation: postIdValidation
};