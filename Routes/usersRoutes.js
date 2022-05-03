import express from "express";
import {getAllUsers, userSignUp, loginUser} from "../Controllers/userControllers"; 

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", userSignUp);
userRoutes.post("/login", loginUser);

export default userRoutes; 