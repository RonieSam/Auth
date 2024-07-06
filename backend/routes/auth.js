const express=require("express")
const validator=require("express-validator")
authRoute=express()

const {handleSignIn,handleSignUp}=require("../controller/auth")
authRoute
.post("/signup",[
  validator.body('email','Enter a valid Email').isEmail(),
  validator.body('name','Name is required').exists(),
  validator.body('password','Password should contain atleast 6 characters').isLength({min:6})
],handleSignUp)
.post("/signin",[
  validator.body('email','Enter a valid Email').isEmail(),
  validator.body('password','Password should contain atleast 6 characters').isLength({min:6})],handleSignIn)

module.exports=authRoute