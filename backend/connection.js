const mongoose=require("mongoose")

const connectDB=(MongoURL)=>{
  mongoose.connect(MongoURL)
  .then(()=>{console.log("MongoDB is connected")})
  .catch((err)=>{console.log(err)})
}
module.exports={connectDB}