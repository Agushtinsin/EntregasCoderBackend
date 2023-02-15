import { Request, Response, Router } from 'express';
import { CartManager } from './CartManager';

const cartManager = new CartManager('./carts.json');
const router = Router();

router.get('/:cid', async (req: Request, res: Response) => {
	try {
		const cart = await cartManager.getCartById(req.params.cid);
		if (cart.length === 0) {
			res.status(404).json({ error: 'Carrito no encontrado' });
		} else {
			res.json(cart);
		}
	} catch (error) {
		console.error(`Error recuperando carritos: ${error}`);
		res.status(500).json({ error: 'Error recuperando carritos' });
	}
});

router.post('/', async (req: Request, res: Response) => {
	try {
		const newCart = req.body;
		newCart.id = await cartManager.addCart(newCart);

		res.json({ id: 'agregado el carrito con id:' + newCart.id });
	} catch (error) {
		console.error(`Error cargando carrito: ${error}`);
		res.status(500).json({ error: 'Error cargando carrito' });
	}
});

router.post('/:cid/product/:pid', async (req: Request, res: Response) => {
	try {
		const info = await cartManager.addProductToCart(
			req.params.cid,
			req.params.pid
		);

		res.json({
			id: `agregado el producto ${info?.productId} al carrito con id: ${info?.cartId}`,
		});
	} catch (error) {
		console.error(`Error cargando carrito: ${error}`);
		res.status(500).json({ error: 'Error cargando carrito' });
	}
});

export { router as cartRouter };

