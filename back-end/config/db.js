// import mongoose from "mongoose";
// const connectDB = async () =>{
//     try{
//         await mongoose.connect(process.env.mongo_URI)
//         console.log("MongoDB connected successfully")
//     }catch(err){    
//         console.error("MongoDB connection failed", err.message)
//         process.exit(1)
//     }
// };
// export default connectDB;


import mongoose from "mongoose";

const connectDB = async () => {
  const uri =
    process.env.NODE_ENV === "test"
      ? process.env.MONGO_TEST_URI
      : process.env.MONGO_URI;

  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${uri}`);
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
