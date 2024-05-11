import {registerUser,logInUser,logOutUser} from "../controller/userController.js"; 
import express from 'express';

export const router = express.Router()

router.post('/',registerUser);
router.post('/logIn',logInUser);
router.post('/logOut',logOutUser);

export default router;
