import fs from 'fs';
import { Cart } from './types';

class CartManager {
	private path: string;

	constructor(path: string) {
		this.path = path;
	}

	async addCart(newCart: Cart) {
		try {
			let carts: Cart[] = [];
			let data: string | undefined = undefined;

			if (fs.existsSync(this.path)) {
				data = await fs.promises.readFile(this.path, 'utf-8');
			}
			if (!data) {
				newCart.id = 1;
				carts.push(newCart);
				await fs.promises.writeFile(this.path, JSON.stringify(carts));
				return newCart.id;
			} else {
				carts = JSON.parse(data);
				newCart.id = carts[carts.length - 1].id + 1;
				carts.push(newCart);
				await fs.promises.writeFile(this.path, JSON.stringify(carts));
				return newCart.id;
			}
		} catch (error) {
			console.error(`Error añadiendo carrito: ${error}`);
		}
	}

	async getCarts() {
		try {
			if (fs.existsSync(this.path)) {
				const cartsFromFile = await fs.promises.readFile(this.path, 'utf-8');
				const carts = JSON.parse(cartsFromFile);
				return carts;
			} else {
				return [];
			}
		} catch (error) {
			console.error(`Error recuperando carritos: ${error}`);
		}
	}

	async getCartById(cid: string) {
		try {
			const carts = await this.getCarts();
			return carts.filter(
				(newCart: { id: number }) => newCart.id === Number(cid)
			);
		} catch (error) {
			console.error(`Error recuperando carritos por id: ${error}`);
		}
	}

	async addProductToCart(cartId: string, productId: string) {
		try {
			const carts = await this.getCarts();
			const cart = await this.getCartById(cartId);
			carts.push(cart);
			await fs.promises.writeFile(this.path, JSON.stringify(carts));
			return { cartId, productId };
		} catch (error) {
			console.error(`Error añadiendo carrito: ${error}`);
		}
	}
}

export { CartManager };

