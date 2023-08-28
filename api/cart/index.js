const { v4: uuidv4 } = require('uuid');

// Mock data
const cart = {};

module.exports = async function (context, req) {
    const action = req.query.action || (req.body && req.body.action);
    const productId = req.query.productId || (req.body && req.body.productId);
    const quantity = req.query.quantity || (req.body && req.body.quantity);

    switch (action) {
        case 'add':
            if (!productId || !quantity) {
                return (context.res = { status: 400, body: 'Product ID and quantity are required' });
            }
            cart[productId] = (cart[productId] || 0) + quantity;
            context.res = { body: { success: true, cart } };
            break;
        
        case 'update':
            if (!productId || !quantity) {
                return (context.res = { status: 400, body: 'Product ID and quantity are required' });
            }
            cart[productId] = quantity;
            context.res = { body: { success: true, cart } };
            break;
        
        case 'remove':
            if (!productId) {
                return (context.res = { status: 400, body: 'Product ID is required' });
            }
            delete cart[productId];
            context.res = { body: { success: true, cart } };
            break;
        
        case 'clear':
            for (let id in cart) {
                delete cart[id];
            }
            context.res = { body: { success: true, cart } };
            break;
        
        case 'view':
        default:
            context.res = { body: { success: true, cart } };
            break;
    }
};
