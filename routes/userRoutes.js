const express = require('express');
const {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/users');
const { body, param, validationResult } = require('express-validator');

const router = express.Router();

// Helper function for validation error handling
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get(
    '/:id',
    param('id', 'Invalid user ID').isMongoId(),
    validate,
    getSingle
);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post(
    '/',
    body('email', 'Invalid email').isEmail(),
    body('firstname', 'First name is required').notEmpty(),
    body('lastname', 'Last name is required').notEmpty(),
    body('favoritecolor', 'Favorite color is required').notEmpty(),
    body('birthdate', 'Invalid birthdate').isISO8601(),
    validate,
    createUser
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update an existing user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put(
    '/:id',
    param('id', 'Invalid user ID').isMongoId(),
    body('email', 'Invalid email').optional().isEmail(),
    body('firstname', 'First name is required').optional().notEmpty(),
    body('lastname', 'Last name is required').optional().notEmpty(),
    body('favoritecolor', 'Favorite color is required').optional().notEmpty(),
    body('birthdate', 'Invalid birthdate').optional().isISO8601(),
    validate,
    updateUser
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 */
router.delete(
    '/:id',
    param('id', 'Invalid user ID').isMongoId(),
    validate,
    deleteUser
);

module.exports = router;
