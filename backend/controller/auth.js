const { validationResult } = require("express-validator")
const { userModel } = require("../model/user")
const crypto=require("crypto")
const {getToken}=require("./jwtToken")

async function handleSignUp(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ msg:errors.errors[0].msg, success: false })
    const { email, name, password } = req.body
    const dupEmail = await userModel.findOne({ email: email })
    if (dupEmail) return res.status(400).json({ msg: "Email already exisits", success: false })
    const result = await userModel.create({
      email: email,
      name:name,
      password:password
    })
    const jwtToken=getToken(result)
    return res.status(200).json({result:result,msg:"User has been registered",success:true,auth:jwtToken})
  }
  catch(error) {
    console.log(error)
    return res.status(500).json({msg:"Some Internal Server error",success:false})
  }
}

async function handleSignIn(req,res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ msg: errors.errors[0].msg, success: false })
    const { email, password } = req.body
    const user = await userModel.findOne({
      email: email,
    })
    if(!user)return res.status(400).json({msg:"Email Id is not registered",success:false})
    const hashedPassword=crypto.createHmac("sha256",user.salt).update(password).digest('hex')
    if(hashedPassword!==user.password)return res.status(400).json({msg:"Email Id and Password do not match",success:false})
    const jwtToken=getToken(user)
    return res.status(200).json({msg:"Successfully Signed In",success:true,auth:jwtToken,user:user})
  }
  catch(error) {
    console.log(error)
    return res.status(500).json({msg:"Some Internal Server error",success:false})
  }
}

module.exports = { handleSignUp, handleSignIn }