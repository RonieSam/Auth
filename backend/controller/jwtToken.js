const jwt=require("jsonwebtoken")
const SIGN="RoNiE(@)"
function getToken(user){
 return jwt.sign({id:user._id},SIGN)
}
function getUser(token){
  try  {return jwt.verify(token,SIGN)}
  catch {return null}
}
module.exports={getToken,getUser}