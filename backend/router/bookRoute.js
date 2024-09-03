import express from "express";
import bookController from "../controller/bookController.js";

const router = express.Router();

router.post('/', bookController.createBook);
router.get('/', bookController.getAllBook);
router.get('/:id', bookController.getBookById);
router.put('/:id', bookController.updateBookById);
router.delete('/:id', bookController.deleteBookById);

export default router;
