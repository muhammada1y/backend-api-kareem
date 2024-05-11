import AsyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js";
import token from "../utils/genrateToken.js";
import bcrypt from 'bcrypt';


// register user controller
// post "/api/user"
// jwt 

const registerUser = AsyncHandler(async (req, res) => {
   const { name, email, password } = req.body;
   const hashPassword = bcrypt.hashSync(password, 10); // Hash the password
   const checkEmail = await User.findOne({ email });

   if (checkEmail) {
      res.status(400);
      throw new Error("User already exists");
   }

   const user = await User.create({
      name,
      email,
      password: hashPassword,
   });

   if (user) {
      token(res, user._id);
      res.status(200).json({
         id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
      });
   } else {
      res.status(404);
      throw new Error('Invalid user data');
   }
});





// login user controller
// post "/api/user/login"
// jwt 

const logInUser = AsyncHandler(async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email });
   if (user && (await user.matchPassword(password))) {
      token(res, user._id);
      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         IsAdmin: user.isAdmin,
      });
   } else {
      res.status(404);
      throw Error('wrong passwor and email')
   }
});


// register user controller
// post "/api/user"
// jwt 

const logOutUser = AsyncHandler(async (req, res) => {
   res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0)
   });
   res.status(200).json({ message: "successfully log out" })


});


export {
   registerUser,
   logInUser,
   logOutUser
};
