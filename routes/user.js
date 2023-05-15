import express from "express";
import {  requireSignin } from "../controllers/auth.js";
import {read} from '../controllers/user.js';


const userRoutes = express.Router();
// users relate routes
userRoutes.get('/user/:id',requireSignin,read);

export default userRoutes;
