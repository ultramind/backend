import UsersModel from "../Models/UsersModel";
import bcrypt from "bcrypt";
const salt = 10;

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await UsersModel.find();
  } catch (error) {
    console.log(error);
  }

  if (!users) {
    res.status(404).json({ msg: "Could not find any user" });
  }

  res.status(200).json({ users });
};

export const userSignUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  let exitingUser;
  try {
    exitingUser = await UsersModel.find({ email });
  } catch (error) {
    return console.log(error);
  }

  if (exitingUser.length !== 0) {
    return res.status(400).json({ msg: "User already exist just login" });
  }

  //   /password encrt
  const hashPassword = bcrypt.hashSync(password, salt, (hash) => (password = hash));
//   return res.status(200).json({hash});

  const newUser = new UsersModel({
    name,
    email,
    password:hashPassword,
    blogs:[]
  });
  try {
    await newUser.save();
  } catch (error) {
    return console.log(error);
  }

  return res.status(200).json({ newUser });
};

// Login routes
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let isAuthenticated;
  try {
    isAuthenticated = await UsersModel.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!isAuthenticated) {
    return res
      .status(404)
      .json({ msg: "We dont have such user with the email address" });
  }

  // return res.status(200).json({isAuthenticated})
  // checking password martch
  const passwordCompare = bcrypt.compareSync(password, isAuthenticated.password);
  if (!passwordCompare) {
    return res.status(404).json({ msg: "Invalid Login details" });
  }

  return res.status(200).json({ msg: "Login successfull!" });
};
