const fs = require("fs")

class ProductManager {
  private path: string;
  constructor(path: string) {
    this.path = path
    fs.writeFileSync(path, "")
  }

  async addProduct(Product: { id: number, title: string, description: string, price: number, thumbnail: string, code: string, stock: number }) {
    try {
      let products: any[] = []
      const data = await fs.promises.readFile(this.path, 'utf-8')
      if (!data) {
        Product.id = 1
        products.push(Product)
        await fs.promises.writeFile(this.path, JSON.stringify(products))
        return Product.id
      }
      else {
        products = JSON.parse(data)
        Product.id = products[products.length - 1].id + 1
        products.push(Product)
        await fs.promises.writeFile(this.path, JSON.stringify(products))
        return Product.id
      }
    } catch (error) {
      console.error(`Error añadiendo productos: ${error}`)
    }
  }

  async getProducts() {
    try {
      const products = await fs.promises.readFile(this.path, "utf-8")
      return JSON.parse(products)
    } catch (error) {
      console.error(`Error recuperando productos: ${error}`)
    }
  }
  async getProductById(id: number) {
    try {
      const products = await this.getProducts()
      return products.filter((product: { id: number; }) => product.id === Number(id))
    } catch (error) {
      console.error(`Error recuperando productos por id: ${error}`)
    }
  }

  async updateProduct(id: number, key: string, value: string | number) {
    try {
      let products = await this.getProducts();
      let product = products.find((item: { id: number; }) => item.id === id);
      product[key] = value;

      let index = products.indexOf(product);
      products[index] = product;
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    }
    catch (error) {
      console.error(`Error actualizando el producto: ${error}`);
    }
  }

  async deleteProduct(id: number) {
    try {
      const products = await this.getProducts()
      const index = products.indexOf((product: { id: number; }) => product.id === Number(id))
      products.splice(index, 1)
      await fs.promises.writeFile(this.path, JSON.stringify(products))
      return console.log(`Producto con id: ${id} eliminado con exito!`)
    } catch (error) {
      console.error(`Error eliminando el producto: ${error}`)
    }
  }
}

/*
const productManager = new ProductManager("./productos.txt")



const product1 = { id: 0, title: "producto prueba", description: "descripcion de prueba", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25 }
const product2 = { id: 0, title: "producto prueba 2", description: "descripcion de prueba 2", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25 }

const testProductManager = async () => {
  console.log(await productManager.getProducts())
  console.log(await productManager.addProduct(product1))
  console.log(await productManager.addProduct(product2))
  console.log(await productManager.getProducts())
  console.log(await productManager.getProductById(1))
  await productManager.updateProduct(1, "price", 500)
  console.log(await productManager.getProductById(1))
  console.log(await productManager.getProductById(1))
}


testProductManager().then(r => console.log("Test finalizado con exito!"))
*/

export { ProductManager }


