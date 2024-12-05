const Todos = require('./model');


const store = async(req, res, next) =>{
    try {
        let payload = req.body;
        let todo = new Todos(payload);
        await todo.save();
        return res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({
            error: 1,
            message: error.message,
            fields: error.errors
        });
        next(error);
    }
}

const show = async(req,res,next) => {
    try {
        let todo = await Todos.find();
        return res.status(200).json({
            success: true,
            data: todo,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 1,
            message: error.message,
            fields: error.errors
        })
        next(error);
    }
}

const update = async(req,res,next) => {
    try {
        let { id } = req.params;
        let payload = req.body;
        let todo = await Todos.findByIdAndUpdate(id,payload, {new: true});
        return res.status(201).json({
            success: true,
            data: todo,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 1,
            message: error.message,
            fields: error.errors
        });
        next(error);
    }
}

const destroy = async(req,res,next) => {
    try {
        let { id } = req.params;
        if (!id) return res.status(404).json({ error: 'No todo with the ID' });
        let todo = await Todos.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: 'Todo deleted successfully',
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 1,
            message: error.message,
            fields: error.errors
        })
        next(error);
    }
};

module.exports={
    store,
    show,
    update,
    destroy
}