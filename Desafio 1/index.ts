class ProductManager {
    products: {id: number; title: string; description: string; price: number; thumbnail: string; code: string;
        stock: number}[] = [];

    getProducts() {
        console.log(this.products);
    }

    addProducts(title: string, description: string, price: number, thumbnail: string, code: string, stock: number) {
        let agregar: boolean = true;
        for (let i = 0; i < this.products.length;i++) {
            if (this.products[i].code == code) {
                agregar = false;
                console.error('El producto ya existe, no ha sido agregado');
            }
        }
        if (title == '' || description == '' || price == 0 || thumbnail == '' || code == '' || stock == 0) {
            agregar = false;
            console.error('Debe ingresar datos en todos los campos');
        }
        if (agregar) {
            this.products.push({
                id: this.products.length, title: title, description: description, price: price,
                thumbnail: thumbnail, code: code, stock: stock
            });
            console.log('Producto agregado correctamente');
        }
    }

    getProductById = (id: number) => {
        let producto: {id: number; title: string; description: string; price: number; thumbnail: string; code: string;
            stock: number} = {id: 0, title: '', description: '', price: 0, thumbnail: '', code: '', stock: 0};
        for (let i = 0; i < this.products.length;i++) {
            if (this.products[i].id == id) {
                producto = this.products[i];
                console.log(producto);
            }
            else {
                console.error('Producto no encontrado');
            }
        }
    }
}


let productManager = new ProductManager();
productManager.getProducts();
productManager.addProducts("producto prueba", "Este es un producto prueba", 200,
    "Sin imagen", "abc123", 25);
productManager.getProducts();
productManager.addProducts("producto prueba", "Este es un producto prueba", 200,
    "Sin imagen", "abc123", 25);
productManager.getProductById(0);
productManager.getProductById(5);
