// import { UserModel } from "../models/User.js";
// import jwt from "jsonwebtoken"
// import dotenv from "dotenv"
// dotenv.config({path: "../.env"})

// const SignUp = async (req, res) => {
//     const { email, password } = req.body;
//     // console.log(email, password);
  
//     try {
//       const userExist = await UserModel.findOne({ email });
//       if (userExist) {
//         // console.log("user exist");
//         return res.json({ success: false, error: "existing user found with the same email address." });
//       }
//       else {
//         //Creating a new user in the database
//         const newUser = new UserModel({
//           email: email,
//           password: password,
//         });
//         const result = await newUser.save();
//         // console.log(result._id);
//         return res.json({ success: true, id: result._id });
//       }
//     }
//     catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: err.message });
//     }
//   }
  
//   const SignIn = async (req, res) => {
//     const { email, password } = req.body;
//     // console.log(email, password);
//     let user = await UserModel.findOne({ email: email });
//     if (user) {
//       const passwordCompare = password === user.password;
  
//       if (passwordCompare) {
//         // Generate token for the existing user
//         const token = jwt.sign(
//           { _id: user._id },
//           process.env.JWT_SECRET_KEY,
//           { expiresIn: "3d" }
//         );
//         // console.log(token);
//         return res.status(201).json({ success: true, token });
  
//       }
//       else{
//         res.json({success:false, error:"Wrong Password"});
//       }
//     }
//     else{
//       res.json({success:false, error:"Wrong Email ID"});
//     }
//   }
  
  
//   const GetProfile = async (req, res) => {
//     const { id } = req.params;
  
  
//     if (!id) {
//       return res.status(401).json({ error: "No Id specified" })
//     }
  
//     try {
//       // console.log(id);
  
//       const profile = await UserModel.findOne({ _id: id })
  
//       // console.log(profile);
  
//       return res.status(200).json({ success: true, ...profile._doc })
//     } catch (err) {
//       return res.status(500).json({ error: err.message })
//     }
//   }
  
// //   const UpdateProfile = async (req, res) => {
// //     try {
// //       // console.log("in update profile");
// //       // console.log(req.body);
// //       const result = await UserModel.findOneAndUpdate({ _id: req.body._id }, { ...req.body }, { new: true })
// //       const token = jwt.sign(
// //         { _id: result._id },
// //         process.env.JWT_SECRET_KEY,
// //         { expiresIn: "3d" }
// //       );
  
// //       // console.log(token);
// //       return res.status(200).json({ success: true, ...result._doc, token })
// //     } catch (err) {
// //       return res.status(500).json({ error: err.message })
// //     }
  
// //   }

// export { GetProfile, SignUp, SignIn } 