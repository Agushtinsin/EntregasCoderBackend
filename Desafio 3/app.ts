import express, { Express, Request, Response } from 'express';
import { ProductManager } from './ProductManager';

const app: Express = express();
const port: number = 8080;
const productManager = new ProductManager('./productos.txt');

const product1 = { id: 0, title: "producto prueba", description: "descripcion de prueba", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25 }
const product2 = { id: 1, title: "producto prueba 2", description: "descripcion de prueba 2", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25 }
const product3 = { id: 2, title: "producto prueba 3", description: "descripcion de prueba 3", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25 }
const product4 = { id: 3, title: "producto prueba 4", description: "descripcion de prueba 4", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25 }
const product5 = { id: 4, title: "producto prueba 5", description: "descripcion de prueba 5", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25 }
const product6 = { id: 5, title: "producto prueba 6", description: "descripcion de prueba 6", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25 }
const product7 = { id: 6, title: "producto prueba 7", description: "descripcion de prueba 7", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25 }
const product8 = { id: 7, title: "producto prueba 8", description: "descripcion de prueba 8", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25 }
const product9 = { id: 8, title: "producto prueba 9", description: "descripcion de prueba 9", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25 }
const product10 = { id: 9, title: "producto prueba 10", description: "descripcion de prueba 10", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25 }

const addProducts = async () => {
  console.log(await productManager.addProduct(product1))
  console.log(await productManager.addProduct(product2))
  console.log(await productManager.addProduct(product3))
  console.log(await productManager.addProduct(product4))
  console.log(await productManager.addProduct(product5))
  console.log(await productManager.addProduct(product6))
  console.log(await productManager.addProduct(product7))
  console.log(await productManager.addProduct(product8))
  console.log(await productManager.addProduct(product9))
  console.log(await productManager.addProduct(product10))
}

addProducts().then(r => console.log("Productos agregados con exito!"))

app.get('/products', async (req: Request, res: Response) => {
  let products = await productManager.getProducts();
  if (req.query.limit) {
    products = products.slice(0, req.query.limit);
  }
  res.send(products);
});

app.get("/product/:id", async (req: Request, res: Response) => {
  const product = await productManager.getProductById(parseInt(req.params.id));

  res.send(product);

  if (!product) {
    res.status(404).send({ error: "Producto no encontrado" });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});