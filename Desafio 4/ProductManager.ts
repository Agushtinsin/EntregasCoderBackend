import fs from 'fs';
import { Product } from './types';

type Params = {
	limit: string;
};

class ProductManager {
	private path: string;

	constructor(path: string) {
		this.path = path;
	}

	async addProduct(newProduct: Product) {
		try {
			let products: Product[] = [];
			let data: string | undefined = undefined;

			if (fs.existsSync(this.path)) {
				data = await fs.promises.readFile(this.path, 'utf-8');
			}
			if (!data) {
				newProduct.id = 1;
				if (!newProduct.status) {
					newProduct.status = true;
				}
				products.push(newProduct);
				await fs.promises.writeFile(this.path, JSON.stringify(products));
				return newProduct.id;
			} else {
				products = JSON.parse(data);
				newProduct.id = products[products.length - 1].id + 1;
				if (!newProduct.status) {
					newProduct.status = true;
				}
				products.push(newProduct);
				await fs.promises.writeFile(this.path, JSON.stringify(products));
				return newProduct.id;
			}
		} catch (error) {
			console.error(`Error añadiendo productos: ${error}`);
		}
	}

	async getProducts(limit?: Params) {
		try {
			if (fs.existsSync(this.path)) {
				const productsFromFile = await fs.promises.readFile(this.path, 'utf-8');
				const products = JSON.parse(productsFromFile);
				if (limit) {
					return products.slice(0, Number(limit));
				}
				return products;
			} else {
				return [];
			}
		} catch (error) {
			console.error(`Error recuperando productos: ${error}`);
		}
	}

	async getProductById(pid: string) {
		try {
			const products = await this.getProducts();
			return products.filter(
				(product: { id: number }) => product.id === Number(pid)
			);
		} catch (error) {
			console.error(`Error recuperando productos por id: ${error}`);
		}
	}

	async updateProduct(pid: string, updatedProduct: Product) {
		try {
			let products = await this.getProducts();
			const filteredProducts = products.filter(
				(product: { id: number }) => product.id !== Number(pid)
			);
			updatedProduct.id = Number(pid);
			filteredProducts.push(updatedProduct);
			await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts));
			return updatedProduct;
		} catch (error) {
			console.error(`Error actualizando el producto: ${error}`);
		}
	}

	async deleteProduct(pid: string) {
		try {
			const products = await this.getProducts();
			const filteredProducts = products.filter(
				(product: { id: number }) => product.id !== Number(pid)
			);
			await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts));
			return pid;
		} catch (error) {
			console.error(`Error eliminando el producto: ${error}`);
		}
	}
}

export { ProductManager };

