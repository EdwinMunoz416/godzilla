const { v4: uuidv4 } = require('uuid');

// Mock database
const productsDB = [];

module.exports = async function (context, req) {
  const action = req.query.action || (req.body && req.body.action);
  const { id, name, description, price, category } = req.body;

  try {
    switch (action) {
      case 'add':
        if (!name || !description || !price) throw new Error('Name, description, and price are required');

        const newProduct = {
          id: uuidv4(),
          name,
          description,
          price,
          category: category || 'General',
        };

        productsDB.push(newProduct);

        context.res.status(201).json({
          success: true,
          product: newProduct,
        });
        break;

      case 'update':
        if (!id) throw new Error('Product ID is required for updating');

        const productIndex = productsDB.findIndex((p) => p.id === id);
        if (productIndex === -1) throw new Error('Product not found');

        if (name) productsDB[productIndex].name = name;
        if (description) productsDB[productIndex].description = description;
        if (price) productsDB[productIndex].price = price;
        if (category) productsDB[productIndex].category = category;

        context.res.json({
          success: true,
          product: productsDB[productIndex],
        });
        break;

      case 'delete':
        if (!id) throw new Error('Product ID is required for deletion');

        const deleteIndex = productsDB.findIndex((p) => p.id === id);
        if (deleteIndex === -1) throw new Error('Product not found');

        productsDB.splice(deleteIndex, 1);

        context.res.json({
          success: true,
          message: 'Product deleted successfully',
        });
        break;

      case 'get':
        if (id) {
          const product = productsDB.find((p) => p.id === id);
          if (!product) throw new Error('Product not found');

          context.res.json({
            success: true,
            product,
          });
        } else {
          context.res.json({
            success: true,
            products: productsDB,
          });
        }
        break;

      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    context.res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
