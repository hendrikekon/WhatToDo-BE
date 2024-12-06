const moongoose = require('mongoose');
const {Schema, model} = moongoose;

const todosSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Task name is required'],
    },
    done: {
        type: Boolean,
        default: false,
        required: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},{timestamps: true});

module.exports = model('Todos', todosSchema);