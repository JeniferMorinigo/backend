class ProductManager {
    constructor() {
        this.products = [];
    }

    generateUniqueId() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }

    getProducts() {
        return this.products;
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        const codeExists = this.products.some(product => product.code === code);

        if (codeExists) {
            throw new Error("El código del producto ya está en uso.");
        }

        const productId = this.generateUniqueId();

        const newProduct = {
            id: productId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this.products.push(newProduct);

        return productId;
    }
    getProductById(productId) {
        const product = this.products.find(product => product.id === productId);

        if (!product) {
            throw new Error("Producto no encontrado");
        }

        return product;
    }
}

const productManager = new ProductManager();

console.log(productManager.getProducts());

const productId = productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
});

console.log(productManager.getProducts());

try {
    productManager.addProduct({
        title: "producto prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25,
    });
} catch (error) {
    console.error(error.message);
}

try {
    const foundProduct = productManager.getProductById(productId);
    console.log(foundProduct);
} catch (error) {
    console.error(error.message);
}
