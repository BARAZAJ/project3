const User = require('../models/User');
const Joi = require('joi');

// Validation schema
const userSchema = Joi.object({
    email: Joi.string().required().messages({
        'string.base': `"username" should be a type of 'text'`,
        'string.empty': `"username" cannot be an empty field`,
        'any.required': `"username" is a required field`
    }),
    firstname: Joi.string().required().messages({
        'string.base': `"name" should be a type of 'text'`,
        'string.empty': `"name" cannot be an empty field`,
        'any.required': `"name" is a required field`
    }),
    lastname:Joi.string().required().messages({
        'string.base': `"name" should be a type of 'text'`,
        'string.empty': `"name" cannot be an empty field`,
        'any.required': `"name" is a required field`
    }),
    favoritecolor:Joi.string().required().messages({
        'string.base': `"name" should be a type of 'text'`,
        'string.empty': `"name" cannot be an empty field`,
        'any.required': `"name" is a required field`
    }),
    birthdate: Joi.string().required().messages({
        'string.base': `"name" should be a type of 'text'`,
        'string.empty': `"name" cannot be an empty field`,
        'any.required': `"name" is a required field`
    })
});

// Get all users
const getAll = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(204).send(); // No content
        }
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get single user
const getSingle = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        console.error('Error fetching user:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create user
const createUser = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            errors: error.details.map(err => ({
                type: 'field',
                msg: err.message,
                path: err.path.join('.'),
                location: 'body'
            }))
        });
    }

    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        console.error('Error creating user:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update user
const updateUser = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            errors: error.details.map(err => ({
                type: 'field',
                msg: err.message,
                path: err.path.join('.'),
                location: 'body'
            }))
        });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).send();
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        console.error('Error updating user:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).send();
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        console.error('Error deleting user:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };
