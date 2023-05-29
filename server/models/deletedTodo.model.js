import mongoose from "mongoose";

const Schema = mongoose.Schema;
const deletedTodoSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    completed: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

mongoose.set('strictPopulate', false);

const DeletedTodo = mongoose.model('DeletedTodo', deletedTodoSchema);

export default DeletedTodo;