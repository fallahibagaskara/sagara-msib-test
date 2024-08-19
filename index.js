import { config } from 'dotenv';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import clothRoutes from './routes/clothes.js'

config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
const PORT = process.env.PORT

app.use(bodyParser.json());
app.use('/api/clothes', clothRoutes);
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

export default app;