export interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	status: boolean;
	category: string;
	thumbnails: Array<String>;
	code: string;
	stock: number;
}

export interface Cart {
	id: number;
	products: [productId: number, quantity: number];
}

