import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    todos: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Todo'
    },
    deletedTodos: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'DeletedTodo'
    }
}, {
    timestamps: true
});

mongoose.set('strictPopulate', false);

const User = mongoose.model('User', userSchema);

export default User;