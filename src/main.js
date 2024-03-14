const express = require('express');
const ProductManager = require('./clases/productManager');

const app = express();
const PUERTO = 8080; // Puedes cambiar el puerto si lo deseas

const productManager = new ProductManager('products.json');

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
    let products = await productManager.getProducts();

    // Verificar si se proporciona un límite de resultados
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        products = products.slice(0, limit);
    }

    res.json({ products });
});

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);

    // Verificar si el ID proporcionado es un número válido
    if (!isNaN(productId)) {
        const product = await productManager.getProductById(productId);
        if (product) {
            res.json({ product });
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } else {
        res.status(400).json({ message: "ID de producto no válido" });
    }
});


app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`);

    // Lógica de ejecución directa
    (async () => {
        await productManager.loadProducts();

        await productManager.addProduct("Arroz", "producto de prueba", 300, "Imagen 1", "abc1234", 10);
        await productManager.addProduct("Carne", "producto de prueba", 1000, "Imagen 2", "abc12345", 20);
        await productManager.addProduct("Sopa", "producto de prueba", 200, "Imagen 2", "abc123456", 40);
        await productManager.addProduct("Chocolate", "producto de prueba", 100, "Imagen 2", "abc1234567", 20);
        await productManager.addProduct("Alfajor", "producto de prueba", 150, "Imagen 2", "abc12345678", 50);
        await productManager.addProduct("Coca", "producto de prueba", 300, "Imagen 2", "abc123456789", 100);
        await productManager.addProduct("Agua", "producto de prueba", 100, "Imagen 2", "abd123", 150);
        await productManager.addProduct("Chicles", "producto de prueba", 50, "Imagen 2", "abd1234", 20);
        await productManager.addProduct("Pollo", "producto de prueba", 800, "Imagen 2", "abd12345", 15);
       
    })();
});
