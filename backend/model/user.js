const mongoose=require("mongoose")
const crypto=require("crypto")
const { timeStamp } = require("console")
const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
  },
  salt:{
    type:String,
    unique:true
  }
},{timeStamp:true})
userSchema.pre("save",function(next){
  const user=this
  if (!user.isModified("password"))next()
  const salt=crypto.randomBytes(16).toString('hex')
  const hashedPassword=crypto.createHmac('sha256', salt).update(user.password).digest("hex");
  this.password=hashedPassword
  this.salt=salt
  next()
})

const userModel=mongoose.model("user",userSchema)

module.exports={userModel}