import expressAsyncHandler from "express-async-handler";
import { isValidObjectId } from "mongoose";

//import models
import Todo from '../models/todo.model.js';
import User from '../models/user.model.js';
import DeletedTodo from "../models/deletedTodo.model.js";


//get all of todos of the user
const getAllTodos = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const { sortBy } = req.query;

    const sort = {};
    if(sort){
        sort[sortBy.split(':')[[0]]] = sortBy.split(':')[1]
    }

    const results = {};
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;

    
    //get all the todos of a user with filters applied to it
    const allTodos = await Todo.find({user: user.id});
    const todos = await Todo.find({user: user.id})
    .sort(sort ? sort : {createdAt: 'desc'})
    .limit(limit || 10)
    .skip(startIndex || 0)
    .lean()
    .exec();
    
    const deletedTodos = await DeletedTodo.find({}).populate('user', '-password').sort({createdAt: -1}).lean().exec();
    
    if(!(todos.length > 0 || allTodos > 0)) return res.status(404).json({message: 'No todos found', deletedTodos});
    
    results.totalTodos = allTodos.length;
    if(endIndex < allTodos.length){
        results.next = {
            page: page + 1,
            limit
        }
    }

    if(startIndex > 0){
        results.previous = {
            page: page - 1,
            limit
        }
    }

    results.todos = todos;

    res.status(200).json({message: `all todos for ${user.username} found`, todos: results, deletedTodos});
});


//get single todo of the user
const getTodo = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const { id } = req.params;

    //check if the id from the client is a valid mongodb object id
    if(!isValidObjectId(id)) return res.status(400).json({message: 'invalid object id provided'});

    const todo = await Todo.findOne({$and: [{user: user.id}, {_id: id}]}).lean().exec();

    if(!todo) return res.status(404).json({message: 'No todo found'});

    res.status(200).json({message: `todo for ${user.username} with id ${id} found`, todo});
});


//create a new todo
const createTodo = expressAsyncHandler(async (req, res) => {
    const user = req.user;

    //get todo data from request body
    const {title, completed, description} = req.body;

    if(!title || !description) res.status(400).json({message: 'All fields marked with * are required!'});

    const todo = await Todo.create({
        title,
        description,
        completed: completed ? completed : false,
        user: user.id
    });

    if(!todo) return res.status(500).json({message: 'Unable to add a new todo'});

    //find user model data to update
    const userInfo = await User.findOne({username: user.username}).lean().exec();
    if(!userInfo) return res.status(500).json({message: 'user does not exist'});

    //update user with the newly created todo id
    const userUpdated = await User.findOneAndUpdate({username: user.username}, {
        todos: [...userInfo.todos, todo._id]
    }, {new: true})
    if(!userUpdated) return res.status(500).json({message: 'user does not exist'});

    res.status(200).json({message: "new todo created", todo});
});


//update existing todo
const updateTodo = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const { id } = req.params;

     //check if the id from the client is a valid mongodb object id
     if(!isValidObjectId(id)) return res.status(400).json({message: 'invalid object id provided'});

    //get todo data from request body
    const {title, completed, description} = req.body;

    //get the specific todo and compare
    const existingTodo = await Todo.findOne({$and: [{user: user.id}, {_id: id}]}).lean().exec();
    if(!existingTodo) return res.status(404).json({message: 'No todo found with id ' + id});

    const todo = await Todo.findOneAndUpdate({$and: [{user: user.id}, {_id: id}]}, {
        title: title ? title : existingTodo.title,
        description: description ? description : existingTodo.description,
        completed: completed ? completed : existingTodo.completed
    }, {new: true}).lean().exec();

    if(!todo) return res.status(500).json({message: 'todo requested does not exist'});

    res.status(200).json({message: "todo updated successfully", todo});
});


//delete an existing todo
const deleteTodo = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const { id } = req.params;

    //check if the id from the client is a valid mongodb object id
    if(!isValidObjectId(id)) return res.status(400).json({message: 'invalid object id provided'});

    //delete the todo
    const deletedTodo = await Todo.findOneAndDelete({$and: [{user: user.id}, {_id: id}]}).lean().exec();
    if(!deletedTodo) return res.status(500).json({message: 'todo requested to delete does not exist'});

    //update the todos with the deleted one
    const createDeletedTodo = await DeletedTodo.create({
        _id: deletedTodo._id,
        title: deletedTodo.title,
        description: deletedTodo.description,
        completed: deletedTodo.completed,
        user: deletedTodo.user
    });
    if(!createDeletedTodo) return res.status(500).json({message: 'Unable to add deleted todo to deleted todo model'});

    //find user model to update
    const userInfo = await User.findOne({username: user.username}).lean().exec();
    if(!userInfo) return res.status(500).json({message: 'user does not exist'});

    //update user with the newly deleted todo id
    const userUpdated = await User.findOneAndUpdate({username: user.username}, {
        deletedTodos: [...userInfo.deletedTodos.filter(todo => todo.toString() !== deletedTodo.toString()), createDeletedTodo._id],
        todos: userInfo.todos?.filter(
            todo => todo.toString() !== deletedTodo._id.toString())
    }, {new: true}).select('-password').lean().exec();
    if(!userUpdated) return res.status(500).json({message: 'todo requested does not exist'});

    res.status(200).json({message: `todo for ${user.username} with id ${id} deleted successfully`});
});


//restore deleted todo
const restoreTodo = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const { id } = req.params;

    //check if the id from the client is a valid mongodb object id
    if(!isValidObjectId(id)) return res.status(400).json({message: 'invalid object id provided'});

    //retrieve todo from deleted model
    const restoredTodo = await DeletedTodo.findOne({$and: [{user: user.id}, {_id: id}]}).lean().exec();
    if(!restoredTodo) return res.status(500).json({message: 'todo requested does not exist', user, id});

    // send todo to main todo model and delete it from the deleted model
    const newTodoFromDeleted = await Todo.create({
        title: restoredTodo.title,
        description: restoredTodo.description,
        completed: restoredTodo.completed,
        user: restoredTodo.user
    });

    if(!newTodoFromDeleted) return res.status(500).json({message: 'Unable to add a new todo from deleted model'});

    //delete todo from deleted model
    const deletedTodo = await DeletedTodo.findOneAndDelete({$and: [{user: user.id}, {_id: id}]}).lean().exec();
    if(!deletedTodo) return res.status(500).json({message: 'todo requested does not exist', user, id});

    //find user model data to update
    const userInfo = await User.findOne({username: user.username}).lean().exec();
    if(!userInfo) return res.status(500).json({message: 'user does not exist'});

    //update user
    const updatedUserInfo = await User.findOneAndUpdate({username: user.username}, {
        todos: [...userInfo.todos.filter(todo => todo.toString() !== restoredTodo.toString()), newTodoFromDeleted._id],
        deletedTodos: userInfo.deletedTodos?.filter(
            todo => todo.toString() !== restoredTodo._id.toString())
    }, {new: true}).lean().exec();

    if(!updatedUserInfo) return res.status(500).json({message: 'user does not exist', user, id});

    //send success response to client
    res.status(200).json({message: "todo restored successfully", todo: restoredTodo});
});

export {
    getAllTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    restoreTodo
}