import request from 'supertest';
import app from '../server';

// Tests for the POST Route
describe('Validate POST Route', () => {
    describe("When Correct input data is supplied", () => {
        it('should be valid /api/v1/orders', (end) => {
            request(app).post('/api/v1/orders')
                .type("JSON")
                .send({
                    "orderId": 1,
                    "food": 'fufu',
                    "quantity": 10,
                    "price": 10,
                    "orderStatus": "uncompleted",
                    "userAddress": "address"
                })
                .expect(201, end)
        });
    });
    describe('Check POST input for Error', () => {
        it('should return Error code 400 if no data was passed', (end) => {
            request(app).post('/api/v1/orders')
                .type('JSON')
                .expect(400, end);
        });
        it('Should Return Error code 400 if food name is missing', (end) => {
            request(app).post('/api/v1/orders')
                .type('JSON')
                .send({
                    "orderId": 1,
                    "quantity": 10,
                    "price": 10,
                    "orderStatus": "uncompleted",
                    "userAddress": "address"
                })
                .expect(400, end);
        });
        it('should return Error code 400 if price is missing', (end) => {
            request(app).post('/api/v1/orders')
                .type('JSON')
                .send({
                    "orderId": 1,
                    "food": 'fufu',
                    "quantity": 10,
                    "orderStatus": "uncompleted",
                    "userAddress": "address"
                })
                .expect(400, end);
        });
        it('should return Error code 400 if quantity is missing', (end) => {
            request(app).post('/api/v1/orders')
                .type('JSON')
                .send({
                    "orderId": 1,
                    "food": 'fufu',
                    "price": 10,
                    "orderStatus": "uncompleted",
                    "userAddress": "address"
                })
                .expect(400, end);
        });
        it('should return Error code 400 if orderStatus is missing', (end) => {
            request(app).post('/api/v1/orders')
                .type('JSON')
                .send({
                    "orderId": 1,
                    "food": 'fufu',
                    "quantity": 10,
                    "price": 10,
                    "userAddress": "address"
                })
                .expect(400, end);
        });
        it("should return statuscose 400 if food name is missing", (end) => {
            request(app).post("/api/v1/orders").type('JSON').send({
                "orderId": 1,
                "food": 'fufu',
                "quantity": 10,
                "price": 10,
                "orderStatus": "uncompleted"
            }).expect(400, end);
        });
    });
});

// Tests for the GET Route
describe('Validate GET Route', () => {
    it('should be valid route /api/v1/orders returns 200 (orders retrieved successfully)', (end) => {
        request(app).get('/api/v1/orders')
            .expect("Content-type", /json/)
            .expect(200, end)
    });
    it('should be valid route /api/v1/orders/0 returns 200 (orders retrieved successfully)', (end) => {
        request(app).get('/api/v1/orders/0')
            .expect("Content-type", /json/)
            .expect(200, end)
    });
    it('should return error 404(order not found in the database) if database does not have data at that location', (end) => {
        request(app).get('/api/v1/orders/2000000')
            .expect(404, end)
    });
})

// Tests for the PUT Route
describe('Validate PUT Route', () => {
    describe("when Correct PUT Query is supplied", () => {
        it('should be valid route /api/v1/orders/0 editted successfully returning status code 200(Update Successful)', (end) => {
            request(app).put('/api/v1/orders/0')
                .type('JSON').send({
                    "orderId": 0,
                    "food": 'pizza',
                    "quantity": 10,
                    "price": 9500,
                    "orderStatus": "completed",
                    "userAddress": "address"
                })
                .expect(200, end)
        });
    });
    describe("Check PUT input for Error", () => {
        it("should return 400(Bad request, when food is missing in the input data)", (end) => {
            request(app).put('/api/v1/orders/0')
                .type('JSON')
                .send({
                    "orderId": 0,
                    "quantity": 10,
                    "price": 9500,
                    "orderStatus": "completed",
                    "userAddress": "address"
                })
                .expect(400, end);
        });
        it("should return 400(Bad request, when quantity is missing in the input data)", (end) => {
            request(app).put('/api/v1/orders/0')
                .type('JSON')
                .send({
                    "orderId": 0,
                    "food": 'pizza',
                    "price": 9500,
                    "orderStatus": "completed",
                    "userAddress": "address"
                })
                .expect(400, end);
        });
        it("should return 400(Bad request, when userAddress is missing in the input data)", (end) => {
            request(app).put('/api/v1/orders/0')
                .type('JSON')
                .send({
                    "orderId": 0,
                    "food": 'pizza',
                    "quantity": 10,
                    "price": 9500,
                    "orderStatus": "completed",
                })
                .expect(400, end);
        });
        it("should return 400(Bad request, when price is missing in the input data)", (end) => {
            request(app).put('/api/v1/orders/0')
                .type('JSON')
                .send({
                    "orderId": 0,
                    "food": 'pizza',
                    "quantity": 10,
                    "orderStatus": "completed",
                    "userAddress": "address"
                })
                .expect(400, end);
        });
        it("should return 400(Bad request, when input data is missing)", (end) => {
            request(app).put('/api/v1/orders/0')
                .type('JSON')
                .send({})
                .expect(400, end);
        });
        it("should return 404(Previous order not found, when orderId is undefined)", (end) => {
            request(app).put('/api/v1/orders/')
                .type('JSON')
                .send({
                    "orderId": 0,
                    "food": 'pizza',
                    "quantity": 10,
                    "price": 9500,
                    "orderStatus": "completed",
                    "userAddress": "address"
                })
                .expect(404, end);
        });
    });
    describe("Resolve Conflicts", () => {
        it("should return 410(Previous order not found, when memory has no data to modify)", (end) => {
            request(app).put('/api/v1/orders/300')
                .type('JSON')
                .send({
                    "orderId": 300,
                    "food": 'pizza',
                    "quantity": 10,
                    "price": 9500,
                    "orderStatus": "completed",
                    "userAddress": "address"
                })
                .expect(410, end);
        });
    });
});

//Tests for the DELETE Route
describe("Validate Delete Route", () => {
    describe("When orderId is correctly supplied", () => {
        it('should return StatusCode 200(Order successfully deleted)', (end) => {
            request(app).delete('/api/v1/orders/1')
                .expect(200,end)
        });
    });
    describe("When item can not be found in the database", () => {
        it('should return statusCode of 404(Order not found)', (end) => {
            request(app).delete('/api/v1/orders/300')
                .expect(404,end)
        });
    });
});