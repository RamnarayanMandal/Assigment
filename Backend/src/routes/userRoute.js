import express from 'express';
import { loginUser,signupController  } from '../controller/UserController.js';

const router = express.Router();


router.post(
    '/register',
   
    signupController
);

router.post('/login', loginUser);


export default router;
