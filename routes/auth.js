import express from "express";
import {signup, signin} from '../controllers/auth.js';

//import validators
import {userSignupValidator,userSigninValidator} from '../validators/auth.js'
import {runValidation} from '../validators/index.js'

const authRoutes = express.Router();

authRoutes.post('/signup',userSignupValidator,runValidation, signup)

authRoutes.post('/signin',userSigninValidator,runValidation,signin)





export default authRoutes;