import express from "express";

const router = express.Router();

import { registerUser, loginUser, dashboard } from "../controller/userController.js";

import protect from '../middleware/authUser.js';

router.route('/user').post(registerUser);
router.route('/login').post(loginUser);

//Protected Route
router.route('/dashboard').get(protect, dashboard);

export default router;