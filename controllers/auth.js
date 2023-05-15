import User from "../models/user.js";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import _ from "lodash";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const expressJwt = require("express-jwt");

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// handle signup
export const signup = (req, res) => {
  // get new user data
  const { name, email, password } = req.body;
  console.log({ name, email, password })
  // check if user already exist
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const newuser = new User({ name, email, password });
    
        // saving the user
    newuser.save((err, user) => {
          if (err) {
            return res.status(401).json({
              error: "Error saving user in database. Try signup again",
            });
          }
          return res.json({
            token,
            user
          });
        });
   
  });
};

// handle signin
export const signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }
    // authentication of user
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }

    // generate a toke and send to client
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { _id, name, email } = user;

    return res.json({
      token,
      user: { _id, name, email },
    });
  });
};

//middleware
// check if user is signed in
export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});


