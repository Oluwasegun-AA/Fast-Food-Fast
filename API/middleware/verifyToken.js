import  jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function verifyUserToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: "false", message: "No token provided" });
  await jwt.verify(token, process.env.User_Secret, function(err, decoded) {
    if (err){return res.status(500).send({ auth: "false", message: "Failed to authenticate token" });}
    // update body with the Id 
    req.body.user_id = decoded.user_id;
    req.body.user_role = decoded.user_role;
    req.body.user_email = decoded.user_email;
    req.body.user_name = decoded.user_name;
    next();
  });
}

export function verifyAdmin(req, res, next){
if (req.body.user_role === "User"){
  return res.status(401).send({success: "false", Message: "Forbidden Route, User not Authorised"})
}
next();
} 