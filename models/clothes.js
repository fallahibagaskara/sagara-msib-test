import { ObjectId } from 'mongodb';
import connectToDatabase from '../utils/connection.js';

class ClothesModel {
    async find(query, options) {
        const clothes = await connectToDatabase();
        return clothes.find(query, options).toArray();
    }

    async findOne(id) {
        const clothes = await connectToDatabase();
        return clothes.findOne({ _id: new ObjectId(id) });
    }

    async insert(cloth) {
        const clothes = await connectToDatabase();
        return clothes.insertOne(cloth);
    }

    async delete(id) {
        const clothes = await connectToDatabase();
        return clothes.deleteOne({ _id: new ObjectId(id) });
    }

    async update(id, updateDoc) {
        const clothes = await connectToDatabase();
        return clothes.updateOne({ _id: new ObjectId(id) }, updateDoc);
    }
}

export default new ClothesModel();
