import express from "express";

const router = express.Router();

import { registerUser, loginUser, dashboard, getUserById, getAllUser } from "../controller/userController.js";

import protect from '../middleware/authUser.js';

//all user
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/dashboard').get(dashboard);

//admin
router.route('/user/:id').get(protect, getUserById)
router.route('/user').get(protect, getAllUser);

export default router;