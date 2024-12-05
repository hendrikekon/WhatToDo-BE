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
    }
});

module.exports = model('Todos', todosSchema);