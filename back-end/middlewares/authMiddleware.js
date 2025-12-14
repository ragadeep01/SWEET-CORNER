import jwt from 'jsonwebtoken';
import user from '../models/user.js';
import asyncHandler from "./asyncHandler.js";
// ??chech if user is authen or not
const authenticate = asyncHandler(async (req, res, next)=> {
  const token = req.cookies.jwt;
  if (!token) {
     res.status(401);
     throw new Error("not authorized,no token" );
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);
    req.user = await user.findById(decoded.id).select("-password");
    console.log("User from DB:", req.user); 
    next();
  } catch (error) {
     res.status(401);
     throw new Error ("not authorised , token failed.");
  }
});
export default authenticate ;