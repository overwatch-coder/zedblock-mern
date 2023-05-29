import express from "express";

//import todo controller functions
import { 
    createTodo, 
    deleteTodo, 
    getAllTodos, 
    getTodo, 
    restoreTodo, 
    updateTodo 
} from "../controllers/todos.controller.js";

//import middleware
import { authenticateUser } from "../middleware/authUser.js";

const router = express.Router();

//user must be authenticated to access todo routes
router.use(authenticateUser);

router.route('/').get(getAllTodos).post(createTodo);
router.route('/:id').get(getTodo).patch(updateTodo).delete(deleteTodo);
router.get('/:id/restore', restoreTodo);

export default router;