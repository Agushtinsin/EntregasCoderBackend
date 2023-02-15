import { Request, Response, Router } from 'express';
import { ProductManager } from './ProductManager';

const productManager = new ProductManager('./products.json');
const router = Router();

router.get('/', async (req: Request, res: Response) => {
	try {
		const products = await productManager.getProducts(req.query.limit as any);
		res.json(products);
	} catch (error) {
		console.error(`Error recuperando productos: ${error}`);
		res.status(500).json({ error: 'Error recuperando productos' });
	}
});

router.get('/:pid', async (req: Request, res: Response) => {
	try {
		const product = await productManager.getProductById(req.params.pid);
		if (product.length === 0) {
			res.status(404).json({ error: 'Producto no encontrado' });
		} else {
			res.json(product);
		}
	} catch (error) {
		console.error(`Error recuperando productos: ${error}`);
		res.status(500).json({ error: 'Error recuperando productos' });
	}
});

router.post('/', async (req: Request, res: Response) => {
	try {
		const newProduct = req.body;
		newProduct.id = await productManager.addProduct(newProduct);

		res.json({ id: 'agregado el producto con id:' + newProduct.id });
	} catch (error) {
		console.error(`Error cargando productos: ${error}`);
		res.status(500).json({ error: 'Error cargando productos' });
	}
});

router.put('/:pid', async (req: Request, res: Response) => {
	try {
		const newProductValues = req.body;
		const updatedProduct = await productManager.updateProduct(
			req.params.pid,
			newProductValues
		);

		res.json({ id: 'actualizado el producto con id:' + updatedProduct?.id });
	} catch (error) {
		console.error(`Error cargando productos: ${error}`);
		res.status(500).json({ error: 'Error cargando productos' });
	}
});

router.delete('/:pid', async (req: Request, res: Response) => {
	try {
		const productId = await productManager.deleteProduct(req.params.pid);

		res.json({ id: `Producto con id: ${productId} eliminado con exito!` });
	} catch (error) {
		console.error(`Error cargando productos: ${error}`);
		res.status(500).json({ error: 'Error cargando productos' });
	}
});

export { router as productRouter };

