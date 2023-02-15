import express, { Express } from 'express';
import { productRouter } from './productRouter';
import { cartRouter } from './cartRouter';

const app: Express = express();
app.use(express.json());

const PORT = 8080;

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

