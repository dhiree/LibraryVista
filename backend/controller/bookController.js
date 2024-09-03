import bookModel from '../models/bookMode.js';

const createBook = async (req, res) => {
    try {
        const book = req.body;
        const newBook = await bookModel.create(book);
        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllBook = async (req, res) => {
    try {
        const getBook = await bookModel.find();
        res.status(200).json(getBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const findBook = await bookModel.findById(id);
        if (!findBook) {
            return res.status(404).json({ error: 'Book Not Found' });
        }
        res.status(200).json(findBook);
    } catch (error) {
        console.error("Book Not Found......", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = req.body;
        const updateBook = await bookModel.findByIdAndUpdate(id, book, { new: true });
        if (!updateBook) {
            return res.status(404).json({ error: 'Book Not Found' });
        }
        res.status(200).json(updateBook);
    } catch (error) {
        console.error("Book Not Update......", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBook = await bookModel.findByIdAndDelete(id);
        if (!deleteBook) {
            return res.status(404).json({ error: 'Book Not Found' });
        }
        res.status(200).json(deleteBook);
    } catch (error) {
        console.error("Book Not Delete......", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

export default {
    createBook,
    getAllBook,
    getBookById,
    updateBookById,
    deleteBookById
};
