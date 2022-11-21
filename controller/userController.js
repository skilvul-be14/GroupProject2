import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../Model/userModel.js';
import Artikel from '../Model/artikelModel.js';


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
            message: 'Invalid email/password'
        })
    }
})


//get user by id
const getUserById = asyncHandler (async (req, res) => {
    const userExist = await User.findOne({ _id: req.params.id})
    if(userExist){
        res.status(200).json({
            success: true,
            data: userExist,
            message: 'User is fetched successfully',
        })
    } else{
        res.status(400).json({
            success: false,
            data: null,
            message: 'User is Not Found'
        })
    }
})


//get all user
const getAllUser = asyncHandler (async (req, res) => {
    const allUser = await User.find({})
    if(allUser){
        res.status(200).json({
            success: true,
            data: allUser,
            message: 'All users are fetched successfully',
        })
    } else{
        res.status(400).json({
            success: false,
            data: null,
            message: 'Users are not found'
        })
    }
})


const dashboard = asyncHandler(async (req, res) => {
    res.send('Dashboard')
})


export {
    registerUser,
    loginUser,
    dashboard,
    getUserById,
    getAllUser
}