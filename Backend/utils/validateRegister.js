import {body} from 'express-validator';

const validateRegister = [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("fullname.firstname").isLength({min:3}).withMessage("First name must be at least 3 characters long"),  
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long")   
]

const validateLogin = [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long")   
]
export {validateRegister,validateLogin} ;