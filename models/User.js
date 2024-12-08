const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email format'], // Matches Swagger description
        },
        firstname: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
        },
        lastname: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
        },
        favoritecolor: {
            type: String,
            required: [true, 'Favorite color is required'],
            trim: true,
        },
        birthdate: {
            type: Date, // Directly uses a Date type for consistent validation
            required: [true, 'Birthdate is required'],
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt timestamps
    }
);

// Export the model
module.exports = mongoose.model('User', userSchema);
