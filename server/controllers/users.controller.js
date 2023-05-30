//dependency imports
import expressAsyncHandler from "express-async-handler";
import validator from 'validator';

//import models
import User from '../models/user.model.js';
import Todo from '../models/todo.model.js';
import DeletedTodo from "../models/deletedTodo.model.js";

//custom function imports
import { generateToken, hashPassword, verifyPassword } from '../utils/index.js';

//desc REGISTER user
//@method POST
const register = expressAsyncHandler(async (req, res) => {
    const {username, password} = req.body;

    //check if user provided empty values
    if(!username || !password) return res.status(400).json({message: "All fields are required"});

    //check if password is strong enough
    if(!(validator.isStrongPassword(password))) return res.status(400).json({message: "Password should be at least 6 chars long, has at least one uppercase, one special character and one lowercase character"});

    //check if username already exists
    const existingUser = await User.findOne({username: username.toLowerCase()}).lean().exec();
    if(existingUser) return res.status(400).json({message: "username already taken"});

    //create a user and save in database
    const user = await User.create({
        username: username.toLowerCase(),
        password: await hashPassword(password)
    });

    //check if user is successfully created
    if(!user) return res.status(500).json({message: "There was a problem creating your account"});

    //generate user token and send to response cookies
    res.cookie('token', await generateToken({username: user.username, id: user._id}), {
        httpOnly: true,
        expires: new Date(Date.now() + 86400000) //expires in 1day
    })
    .status(200)
    .json({message: 'Account created successfully', user: {username: user.username, id: user._id}});
});

//desc LOGIN user
//@method POST
const login = expressAsyncHandler(async (req, res) => {
    const {username, password} = req.body;

    //check if user provided empty values
    if(!username || !password) return res.status(400).json({message: "All fields are required"});

    //check if username already exists
    const existingUser = await User.findOne({username: username.toLowerCase()}).lean().exec();
    if(!existingUser) return res.status(404).json({message: "user not found"});

    //hash password
    const isVerified = await verifyPassword(password, existingUser.password);

    //check if user is successfully created
    if(!isVerified) return res.status(400).json({message: "incorrect password"});

    //generate user token and send to response cookies
    res.cookie('token', await generateToken({username: existingUser.username, id: existingUser._id}), {
        httpOnly: true,
        expires: new Date(Date.now() + 86400000) //expires in 1day
    })
    .status(200)
    .json({message: 'You have successfully logged in!', user: {
        username: existingUser.username,
        id: existingUser._id
    }});
});

//desc DELETE user
//@method DELETE
const removeUser = expressAsyncHandler(async (req, res) => {
    //get the correctly signed in user from request headers
    const user = req?.user

    //check if user provided empty values
    if(!user) return res.status(403).json({message: "Not authorized to delete this user"});

    //delete user and all of the user's todos
    const deletedUser = await User.findOneAndDelete({username: user.username}).lean().exec();
    if(!deletedUser) return res.status(500).json({message: "User not found"});

    //get deleted user's todos and delete them
    const todos = await Todo.find({user: deletedUser._id}).lean().exec();
    const removeFromDeletedTodo = await DeletedTodo.find({user: deletedUser._id}).lean().exec();
    if(todos.length > 0){
        todos.map(async (todo) => {
            await Todo.findOneAndDelete({_id: todo._id});
        })
    }

    if(removeFromDeletedTodo.length > 0){
        removeFromDeletedTodo.map(async (todo) => {
            await DeletedTodo.findOneAndDelete({_id: todo._id});
        })
    }

    //send response to user
    res.clearCookie('token', {
        httpOnly: true,
        expires: new Date(Date.now() + 86400000) //expires in 1day
    })
    .status(200).json({message: 'User deleted successfully', user: deletedUser.username});
});


export {
    login,
    register,
    removeUser
}