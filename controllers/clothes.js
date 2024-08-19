import { ObjectId } from 'mongodb';
import ClothesModel from '../models/clothes.js';

class ClothesController {
    async getAll(req, res) {
        try {
            const { id, color, size } = req.query;
            const query = {};
            if (id) query._id = new ObjectId(id);
            if (color) query.color = color;
            if (size) query.size = size;

            const options = { sort: { color: 1 } };
            const result = await ClothesModel.find(query, options);

            res.status(result.length === 0 ? 200 : 200).json({
                success: true,
                data: result.length === 0 ? "No clothes available" : result
            });
        } catch (err) {
            console.error("Error retrieving clothes:", err);
            res.status(500).send("Failed to retrieve the clothes from the Database");
        }
    }

    async getOutOfStock(req, res) {
        try {
            const result = await ClothesModel.find({ stock: 0 }, { sort: { color: 1 } });
            res.status(result.length === 0 ? 200 : 200).json({
                success: true,
                data: result.length === 0 ? "No clothes are out of stock." : result
            });
        } catch (err) {
            console.error("Error retrieving out of stock clothes:", err);
            res.status(500).send("Failed to retrieve out of stock clothes from the Database");
        }
    }

    async getLowStock(req, res) {
        try {
            const result = await ClothesModel.find({ stock: { $lt: 5 } }, { sort: { color: 1 } });
            res.status(result.length === 0 ? 200 : 200).json({
                success: true,
                data: result.length === 0 ? "No clothes with low stock." : result
            });
        } catch (err) {
            console.error("Error retrieving low stock clothes:", err);
            res.status(500).send("Failed to retrieve low stock clothes from the Database");
        }
    }

    async addStock(req, res) {
        try {
            const { id } = req.params;
            const { amount } = req.body;

            if (amount <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Amount to add must be greater than 0"
                });
            }

            const result = await ClothesModel.update(id, { $inc: { stock: amount } });
            res.status(result.matchedCount > 0 ? 200 : 200).json({
                success: true,
                message: result.matchedCount > 0 ? "Stock added successfully." : "No clothes matched the ID."
            });
        } catch (err) {
            console.error("Error adding stock:", err);
            res.status(500).send("Failed to update stock in the Database");
        }
    }

    async reduceStock(req, res) {
        try {
            const { id } = req.params;
            const { amount } = req.body;

            if (amount <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Amount to reduce must be greater than 0"
                });
            }

            const currentCloth = await ClothesModel.findOne(id);

            if (!currentCloth) {
                return res.status(400).json({
                    success: false,
                    message: "No clothes matched the ID."
                });
            } else {
                if (currentCloth.stock < amount) {
                    return res.status(400).json({
                        success: false,
                        message: "Not enough stock to reduce"
                    });
                }

                const result = await ClothesModel.update(id, { $inc: { stock: -amount } });
                res.status(result.matchedCount > 0 ? 200 : 200).json({
                    success: true,
                    message: result.matchedCount > 0 ? "Stock reduced successfully." : "No clothes matched the ID."
                });
            }
        } catch (err) {
            console.error("Error reducing stock:", err);
            res.status(500).send("Failed to update stock in the Database");
        }
    }

    async add(req, res) {
        try {
            const cloth = req.body;
            const result = await ClothesModel.insert(cloth);
            res.status(200).json({
                success: true,
                message: `${cloth.color} clothes has been added to the Database with ID: ${result.insertedId}`
            });
        } catch (err) {
            console.error("Error inserting cloth:", err);
            res.status(500).send("Failed to add the cloth to the Database");
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { color, size, price, stock } = req.body;

            const updateDoc = { $set: {} };

            if (color) updateDoc.$set.color = color;
            if (size) updateDoc.$set.size = size;
            if (price) updateDoc.$set.price = price;
            if (stock) updateDoc.$set.stock = stock;

            const result = await ClothesModel.update(id, updateDoc);
            res.status(result.matchedCount === 1 ? 200 : 200).json({
                success: true,
                message: result.matchedCount === 1 ? `${result.matchedCount} clothes matched the filter, updated ${result.modifiedCount} clothes.` : "No clothes matched the ID. Updated 0 clothes."
            });
        } catch (err) {
            console.error("Error updating cloth:", err);
            res.status(500).send("Failed to update the clothes from the Database");
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await ClothesModel.delete(id);
            res.status(result.deletedCount === 1 ? 200 : 200).json({
                success: true,
                message: result.deletedCount === 1 ? "Successfully deleted the clothes." : "No clothes matched the ID. Deleted 0 clothes."
            });
        } catch (err) {
            console.error("Error deleting cloth:", err);
            res.status(500).send("Failed to deleted the clothes from the Database");
        }
    }
}

export default new ClothesController();
