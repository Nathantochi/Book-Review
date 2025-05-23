import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// Create a new User
export const createUser = async (req, res) => {
    const { email, password, name} = req.body

    const checkEmail = await User.findOne({ where: { email } })
    if (checkEmail) {
        return res.status(400).json({
            status: 'false',
            message: 'Email already exists',
            data: []
        })
    }
    
    const hashedPassword = await bcrypt.hashSync(password, 10)

    // Check if all fields are provided
        const newUser = await User.create({
            email, 
            password : hashedPassword,
            name
        })

        if (!newUser) {
            return res.status(400).json({
                status: 'false',        
                message: 'User not created',
                data: []
            })
        }
       res.status(201).json({
            status: 'true',
            message: 'User created successfully',
            data : newUser
        })
    
}

// Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) {
        return res.status(404).json({
            status: 'false',
            message: 'Invalid Password or Email',
            data: []
        })
    }

    const isPasswordValid = await bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
        return res.status(401).json({
            status: 'false',
            message: 'Invalid password or email',
            data: []
        })
    }

    let payload = {
        id: user.id,
        email: user.email,
        name: user.name
    }
    //const { password: _, ...userWithoutPassword } = user.toJSON()
    let token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: '1h' })
    payload.token = token
    
    res.status(200).json({
        status: 'true',
        message: 'Login successful',
        data: payload
    })
}

// Get user profile
export const userProfile = async (req, res) => {

        return res.status(200).json({
            status: 'true',
            message: 'User profile retrieved successfully',
            data: req.user
        })
    
}

// Get all reviews
export const getAllUsers = async (req, res) => {
    const  bookId  = Number(req.params.bookId)
    const checkBook = await Book.findByPk(bookId)
    const {year, author} = req.query

    if (!checkBook) {
        return res.status(404).json({
            status: 'false',
            message: 'Book not found',
            data: []
        })
    }

    const where = { bookId};
    if (year) {
        where.year = year;
}

    if (author) {
        where.author = author;
    }

    const users = await User.findAll({where: where})

    if (!users) {
        return res.status(400).json({
            status: 'false',
            message: 'No users found',
            data: []
        })
    }
    res.status(200).json({
        status: 'true',
        message: 'Users retrieved successfully',
        data: users
    })
}

//get a single User
export const getUser = async (req, res) => {
    const { reviewid } = req.params
    const foundUser = await User.findByPk(Number(reviewid))
    if (!foundUser) {
        return res.status(404).json({
            status: 'false',
            message: 'User not found',
            data: []
        })
    }
        return res.status(200).json({
            status: 'true',
            message: 'User retrieved successfully',
            data: foundUser
    })
}

// Update a User
export const updateUser = async (req, res) => {
    const { userid } = req.params
    const foundUser = await User.findByPk(Number(userid))
    if (!foundUser) {
        return res.status(400).json({
            status: 'false',
            message: 'User not found',
            data: []
        })
    }
    await User.update(req.body)
    res.status(200).json({
        status: 'true',
        message: 'User updated successfully',
        data: foundUser
    })
}

// Delete a User
export const deleteUser = async (req, res) => {
    const { userid } = req.params
    const foundUser = await User.findByPk(Number(userid))
    if (!foundUser) {
        return res.status(400).json({
            status: 'false',
            message: 'User not found',
            data: []
        })
    }
    await User.destroy()
    return res.status(200).json({
        status: 'true',
        message: 'User deleted successfully',
        data: []
    })
}