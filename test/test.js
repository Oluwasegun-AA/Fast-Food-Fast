import request from 'supertest';
import app from '../server';

// Tests for the POST Route
describe('Validate POST Route', () => {
    describe("When Correct input data is supplied", () => {
        it('the route /api/v1/orders should be valid', () => {
            request(app).post('/api/v1/orders')
                .type('JSON')
                .send({
                    "orderId": 1,
                    "food": 'fufu',
                    "quantity": 10,
                    "price": 10,
                    "orderStatus": "uncompleted",
                    "userAddress": "address"
                })
                .expect(201)
        });
    });
    describe('Check POST input for Error', () => {
        it('Should Return Error code 400 if food name is missing', () => {
            request(app).post('/api/v1/orders')
                .type('JSON')
                .send({
                    "orderId": 1,
                    "quantity": 10,
                    "price": 10,
                    "orderStatus": "uncompleted",
                    "userAddress": "address"
                })
                .expect(400);
        });
        it('Return Error code 400 if price is missing', () => {
            request(app).post('/api/v1/orders')
                .type('JSON')
                .send({
                    "orderId": 1,
                    "food": 'fufu',
                    "quantity": 10,
                    "orderStatus": "uncompleted",
                    "userAddress": "address"
                })
                .expect(400);
        });
        it('Return Error code 400 if quantity is missing', () => {
            request(app).post('/api/v1/orders')
                .type('JSON')
                .send({
                    "orderId": 1,
                    "food": 'fufu',
                    "price": 10,
                    "orderStatus": "uncompleted",
                    "userAddress": "address"
                })
                .expect(400);
        });
        it('Return Error code 400 if orderStatus is missing', () => {
            request(app).post('/api/v1/orders')
                .type('JSON')
                .send({
                    "orderId": 1,
                    "food": 'fufu',
                    "quantity": 10,
                    "price": 10,
                    "userAddress": "address"
                })
                .expect(400);
        });
        it("should return statuscose 400 if food name is missing", () => {
            request(app).post("/api/v1/orders").type('JSON').send({
                "orderId": 1,
                "food": 'fufu',
                "quantity": 10,
                "price": 10,
                "orderStatus": "uncompleted"
            }).expect(400);
        });
    });
});

// Tests for the GET Route
describe('Validate GET Route', () => {
    it('the route /api/v1/orders should be valid, returns 200 (orders retrieved successfully)', () => {
        request(app).get('/api/v1/orders')
            .expect("Content-type", /json/)
            .expect(200)
    });
    it('the route /api/v1/orders/0 should be valid, returns 200 (orders retrieved successfully)', () => {
        request(app).get('/api/v1/orders/0')
            .expect("Content-type", /json/)
            .expect(200)
    });
    it('should return error 404(order not found in the database) if database does not have data at that location', () => {
        request(app).get('/api/v1/orders/2000000')
            .expect(404)
    });
})

// Tests for the PUT Route
describe('Validate PUT Route', () => {
    describe("when Correct PUT Query is supplied", () => {
        it('the route /api/v1/orders/0 should be editted successfully returning status code 200(Update Successful)', () => {
            request(app).put('/api/v1/orders/0')
                .type('JSON').send({
                    "orderId": 0,
                    "food": 'pizza',
                    "quantity": 10,
                    "price": 9500,
                    "orderStatus": "completed",
                    "userAddress": "address"
                })
                .expect(200)
        })
    })
    describe("Check PUT input for Error", () => {
        it("should return 400(Bad request, when food is missing in the input data)", () => {
            request(app).put('/api/v1/orders/0')
                .type('JSON')
                .send({
                    "orderId": 0,
                    "quantity": 10,
                    "price": 9500,
                    "orderStatus": "completed",
                    "userAddress": "address"
                })
                .expect(400);
        });
        it("should return 400(Bad request, when quantity is missing in the input data)", () => {
            request(app).put('/api/v1/orders/0')
                .type('JSON')
                .send({
                    "orderId": 0,
                    "food": 'pizza',
                    "price": 9500,
                    "orderStatus": "completed",
                    "userAddress": "address"
                })
                .expect(400);
        });
        it("should return 400(Bad request, when userAddress is missing in the input data)", () => {
            request(app).put('/api/v1/orders/0')
                .type('JSON')
                .send({
                    "orderId": 0,
                    "food": 'pizza',
                    "quantity": 10,
                    "price": 9500,
                    "orderStatus": "completed",
                })
                .expect(400);
        });
        it("should return 400(Bad request, when price is missing in the input data)", () => {
            request(app).put('/api/v1/orders/0')
                .type('JSON')
                .send({
                    "orderId": 0,
                    "food": 'pizza',
                    "quantity": 10,
                    "orderStatus": "completed",
                    "userAddress": "address"
                })
                .expect(400);
        });
        it("should return 400(Bad request, when input data is missing)", () => {
            request(app).put('/api/v1/orders/0')
                .type('JSON')
                .send({})
                .expect(400);
        });
        it("should return 404(Previous order not found, when orderId is undefined)", () => {
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
                .expect(404);
        });
    });
    describe("Resolve Conflicts", () => {
        it("should return 404(Previous order not found, when memory has no data to modify)", () => {
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
                .expect(410);
        });
    })
})

//Tests for the DELETE Route
describe("Validate Delete Route", () => {
    describe("When orderId is correctly supplied", () => {
        it('should return StatusCode 200(Order successfully deleted)', () => {
            request(app).delete('/api/orders/0')
                .expect(200)
        });
    })
    describe("When item can not be found in the database", () => {
        it('should return statusCode of 404(Order not found)', () => {
            request(app).delete('/api/v1/orders/300')
                .expect(404)
        })
    })
})
