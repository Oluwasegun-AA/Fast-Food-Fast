class Orders {
    constructor() {
        this.database = [
            {
                orderId: 0,
                food: 'peperony pizza',
                price: 10,
                quantity: 10,
                orderStatus: 'uncompleted',
                userAddress: "Address"
            }
        ]
    }

    getAllOrder() {
        let value = this.database;
        return value;
    }

    returnOrder(index) {
        let value = this.database[index];
        return value;
    }

    pushOrder(newOrder) {
        this.database.push(newOrder);
        return this.database;
    }

    putOrder(index, newOrder) {
        this.database[index] = newOrder;
        return this.database;
    }

    spliceOrder(index) {
        this.database.splice(index, 1);
        return this.database;
    }

}
export default Orders;
