import express from 'express';
import ClothesController from '../controllers/clothes.js';

const router = express.Router();

router.get('/', ClothesController.getAll.bind(ClothesController));
router.get('/out-of-stock', ClothesController.getOutOfStock.bind(ClothesController));
router.get('/low-stock', ClothesController.getLowStock.bind(ClothesController));
router.post('/', ClothesController.add.bind(ClothesController));
router.delete('/:id', ClothesController.delete.bind(ClothesController));
router.patch('/:id', ClothesController.update.bind(ClothesController));
router.patch('/add-stock/:id', ClothesController.addStock.bind(ClothesController));
router.patch('/reduce-stock/:id', ClothesController.reduceStock.bind(ClothesController));

export default router;
