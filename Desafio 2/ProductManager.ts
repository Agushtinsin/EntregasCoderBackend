/*
Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. Éste debe poder:
agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos (basado en entregable 1).

*   Aspectos a incluir

La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a
trabajar desde el momento de generar su instancia.

Debe guardar objetos con el siguiente formato:
id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
title (nombre del producto)
description (descripción del producto)
price (precio)
thumbnail (ruta de imagen)
code (código identificador)
stock (número de piezas disponibles)



* Aspectos a incluir

Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, asignarle un id
autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).

Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos
en formato de arreglo.

Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el
id especificado y devolverlo en formato objeto

Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a
actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo.
NO DEBE BORRARSE SU ID

Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.
Formato del entregable

Archivo de javascript con el nombre ProductManager.js
 */


const fs = require("fs")


class ProductManager {
    private path: string;
    constructor(path: string){
        this.path = path
        fs.writeFileSync(path, "")
    }
    async addProduct(Product: {id: number, title: string, description: string, price: number, thumbnail: string, code: string, stock: number}){
        try {
            let products = []
            const data = await fs.promises.readFile(this.path, 'utf-8')
            if(!data){
                Product.id = 1
                products.push(Product)
                await fs.promises.writeFile(this.path, JSON.stringify(products))
                return Product.id
            }
            else{
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
    async getProducts(){
        try {
            const products = await fs.promises.readFile(this.path, "utf-8")
            return JSON.parse(products)
        } catch (error) {
            console.error(`Error recuperando productos: ${error}`)
        }
    }
    async getProductById(id: number){
        try {
            const products = await this.getProducts()
            return products.filter((product: { id: number; }) => product.id === Number(id))
        } catch (error) {
            console.error(`Error recuperando productos por id: ${error}`)
        }
    }
    async updateProduct(id: number, key: string, value: string | number){
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
    async deleteProduct(id: number){
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


const productManager = new ProductManager("./productos.txt")

const product1 = {id: 0,title: "producto prueba", description: "descripcion de prueba", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25}

const testProductManager = async () => {
    console.log(await productManager.getProducts())
    console.log(await productManager.addProduct(product1))
    console.log(await productManager.getProducts())
    console.log(await productManager.getProductById(1))
    await productManager.updateProduct(1, "price", 500)
    console.log(await productManager.getProductById(1))
    await productManager.deleteProduct(1)
    console.log(await productManager.getProductById(1))
}


testProductManager().then(r => console.log("Test finalizado con exito!"))