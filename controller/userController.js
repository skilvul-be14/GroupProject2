import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../Model/userModel.js';


//@desc create register usuer
const registerUser = asyncHandler( async (req, res) => {
    const { nama, email, password } = req.body;

    const userExist = await User.findOne({email})

    if (userExist){
        res.status(400).json({
            success: false,
            message: 'User already exist'
        })
    } else{
        const user = await User.create({ nama, email, password })
        if (user){
            res.status(201).json({
                success: true,
                message: 'User has created',
                user: user,
                token: generateToken(user._id)
            })
        } else{
            res.status(400).json({
                success: false,
                message: 'Something went wrong'
            })
        }
    }
})


//@desc login usuer
const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({email})

    if (userExist && await userExist.matchPassword(password)){
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            email: email,
            token: generateToken(userExist._id)
        })
    } else{
        res.status(400).json({
            success: false,
            message: 'Invalid user/password'
        })
    }
})


const dashboard = asyncHandler(async (req, res) => {
    res.send('Dashboard')
})


export {
    registerUser,
    loginUser,
    dashboard
}