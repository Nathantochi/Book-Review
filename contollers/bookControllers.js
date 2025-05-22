import Book from '../models/bookModels.js'


// Create a new book
export const createBook = async (req, res) => {
    const { title, author, year, summary } = req.body
    const file = req.file
    const filePath = file ? file.path : null
    const fileName = file ? file.filename : null
        const book = await Book.create({
            title,
            author,
            year,
            summary,
            filePath,
            fileName
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

    const LIMIT = 7;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * LIMIT;

    const books = await Book.findAndCountAll(
        {limit: LIMIT, offset: offset}
    )

    if (books.count === 0) {
        return res.status(400).json({
            status: 'false',
            message: 'No books found',
            data: []
        })
    }

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
        data: { books: books.rows, total: books.count, Pages: Math.ceil(books.count / LIMIT), currentPage: page }
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
    await book.update(req.body)
    res.status(200).json({
        status: 'true',
        message: 'Book updated successfully',
        data: book
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