export function generateRevenue(orders) {
    let total = 0;
    orders.myOrders.forEach(order => {
        let orderTotal = 0;
        order.items.forEach(item => {
            orderTotal += item.quantity * item.price;
        });
        order.comboItems.forEach(combo => {
            orderTotal -= combo.discount;
        });
        orderTotal += orderTotal * (order.vendor.taxRate / 100);
        total += orderTotal;
    });
    return total;
}

export function generateMonthlySales(orders, month) {
    let total = 0;
    orders.myOrders.forEach(order => {
        let createdAt = new Date(order.createdAt);
        // Check if the order was placed this month
        if (createdAt.getMonth() === month) {
            let orderTotal = 0;
            order.items.forEach(item => {
                orderTotal += item.quantity * item.price;
            });
            order.comboItems.forEach(combo => {
                orderTotal -= combo.discount;
            });
            orderTotal += orderTotal * (order.vendor.taxRate / 100);
            total += orderTotal;   
        }
    });
    return total;
}

export function getCustomers(orders, month) {
    let customers = [];
    orders.myOrders.forEach(order => {
        let createdAt = new Date(order.createdAt);
        // Check if the order was placed this month
        if (createdAt.getMonth() === month) {
            if (!customers.indexOf(order.customerId) > -1) {
                customers.push(order.customerId);
            }
        }
    });
    return customers.length;
}