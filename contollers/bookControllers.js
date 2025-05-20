import Book from '../models/bookModels.js'


// Create a new book
export const createBook = async (req, res) => {
    const { title, author, year, summary } = req.body
    // Check if all fields are provided
        const book = await Book.create({
            title,
            author,
            year,
            summary
        })

        if (!book) {
            return res.status(400).json({
                status: 'false',
                message: 'Book not created',
                data: []
            })
        }
       res.status(201).json({
            status: 'true',
            message: 'Book created successfully',
            data : book
        })
    
}

// Get all books
export const getAllBooks = async (req, res) => {
    const books = await Book.findAll()
    if (!books) {
        return res.status(400).json({
            status: 'false',
            message: 'No books found',
            data: []
        })
    }
    res.status(200).json({
        status: 'true',
        message: 'Books retrieved successfully',
        data: books
    })
}

//get a single book
export const getbook = async (req, res) => {
    const { id } = req.params
    const book = await Book.findByPk(Number(id))
    if (!book) {
        return res.status(400).json({
            status: 'false',
            message: 'Book not found',
            data: []
        })
    }
        return res.status(200).json({
            status: 'true',
            message: 'Book retrieved successfully',
            data: book
    })
}

// Update a book
export const updateBook = async (req, res) => {
    const { id } = req.params
    const { title, author, year, summary } = req.body
    const book = await Book.findByPk(Number(id))
    if (!book) {
        return res.status(400).json({
            status: 'false',
            message: 'Book not found',
            data: []
        })
    }
    const updatedBook = await book.update({
        title,
        author,
        year,
        summary
    })
    res.status(200).json({
        status: 'true',
        message: 'Book updated successfully',
        data: updatedBook
    })
}

// Delete a book
export const deleteBook = async (req, res) => {
    const { id } = req.params
    const book = await Book.findByPk(Number(id))
    if (!book) {
        return res.status(400).json({
            status: 'false',
            message: 'Book not found',
            data: []
        })
    }
    await book.destroy()
    res.status(200).json({
        status: 'true',
        message: 'Book deleted successfully',
        data: []
    })
}