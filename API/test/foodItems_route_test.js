import request from 'supertest';
import app from '../../server';
import * as test from '../model/foodItems-model';

// Tests for the POST Route
describe('Validate POST Route', () => {
    describe("When Correct input data is supplied", () => {
        it('should be valid /api/v1/foodItems', (end) => {
            request(app).post('/api/v1/foodItems')
                .type("JSON")
                .send(test.fullItem)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = 'Food Item Sent Successfully';
                })
                .expect(201, end)
        });
    });
    describe("When a Food Item Id is sent to a post route", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).post('/api/v1/foodItems/10')
                .type('JSON').send(test.fullItem)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
    describe('Check POST input for Error', () => {
        it('should return Error status code 400 if no data was passed', (end) => {
            request(app).post('/api/v1/foodItems')
                .type('JSON')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.Status = 'unsuccessful';
                    res.body.Status.toLowerCase();
                })
                .expect(400, end);
        });
        it('should return Error status code 400 req.body.itemPrice has the wrong data type', (end) => {
            request(app).post('/api/v1/orders')
                .type('JSON')
                .send(test.wrongDataType_price)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.Status = 'unsuccessful';
                    res.body.Status.toLowerCase();
                })
                .expect(400, end);
        });
        it('Should Return Error status code 400 if Food Item Name is missing', (end) => {
            request(app).post('/api/v1/foodItems')
                .type('JSON')
                .send(test.voidName)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = 'Bad Request';
                })
                .expect(400, end);
        });
        it('should return Error status code 400 if Food Item Image is missing', (end) => {
            request(app).post('/api/v1/foodItems')
                .type('JSON')
                .send(test.voidImage)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "Bad Request";
                })
                .expect(400, end);
        });
        it('should return Error status code 400 if Food Item Price is missing', (end) => {
            request(app).post('/api/v1/foodItems')
                .type('JSON')
                .send(test.voidPrice)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.Status = "Bad Request";
                })
                .expect(400, end);
        });
    });
    it('should return Error status code 400 if Food Item Tag is missing', (end) => {
        request(app).post('/api/v1/foodItems')
            .type('JSON')
            .send(test.voidTag)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                res.body.Status = "Bad Request";
            })
            .expect(400, end);
    });
});

// Tests for the GET Route
describe('Validate GET Route', () => {
    it('should be valid route /api/v1/foodItems returns 200 (Food Items retrieved successfully)', (end) => {
        request(app).get('/api/v1/foodItems')
            .expect("Content-type", /json/)
            .expect(function (res) {
                res.body.success = 'true';
                res.body.Status = "Food Items retrieved successfully";
                res.body.foodItems = test.databaseItems;
            })
            .expect(200, end)
    });
    it('should be valid route /api/v1/foodItems/0 returns 200 (foodItems retrieved successfully)', (end) => {
        request(app).get('/api/v1/foodItems/0')
            .expect("Content-type", /json/)
            .expect(function (res) {
                res.body.success = 'true';
                res.body.Status = "Food Items retrieved successfully";
                res.body.foodItems = test.firstItem;
            })
            .expect(200, end)
    });
    it('should return error 404(Food Item not found in the database) if database does not have data at that location', (end) => {
        request(app).get('/api/v1/foodItems/2000000')
            .expect('Content-Type', /json/)
            .expect(function (res) {
                res.body.success = "false";
                res.body.status = "Food Item Not Found in the Database";
            })
            .expect(404, end)
    });
    describe("When non interger Food ItemId is sent", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).get('/api/v1/foodItems/A')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
})

// Tests for the PUT Route
describe('Validate PUT Route', () => {
    describe("when Correct PUT Query is supplied", () => {
        it('should be valid route /api/v1/foodItems/0 editted successfully returning status code 200(Update Successful)', (end) => {
            request(app).put('/api/v1/foodItems/0')
                .type('JSON').send(test.fullItem)
                .expect(function (res) {
                    res.body.Status = "Update successful";
                })
                .expect(200, end)
        });
    });
    describe("When non interger Food ItemId is sent", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).put('/api/v1/foodItems/A')
                .type('JSON').send(test.fullItem)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
    
    describe('Check POST input for Error', () => {
        it('should return Error status code 400 if no data was passed', (end) => {
            request(app).put('/api/v1/foodItems')
                .type('JSON')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.Status = 'unsuccessful';
                    res.body.Status.toLowerCase();
                })
                .expect(400, end);
        });
        it('should return Error status code 400 req.body.itemPrice has the wrong data type', (end) => {
            request(app).put('/api/v1/orders')
                .type('JSON')
                .send(test.wrongDataType_price)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.Status = 'unsuccessful';
                    res.body.Status.toLowerCase();
                })
                .expect(400, end);
        });
        it('Should Return Error status code 400 if Food Item Name is missing', (end) => {
            request(app).put('/api/v1/foodItems/0')
                .type('JSON')
                .send(test.voidName)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = 'Bad Request';
                })
                .expect(400, end);
        });
        it('should return Error status code 400 if Food Item Image is missing', (end) => {
            request(app).put('/api/v1/foodItems/0')
                .type('JSON')
                .send(test.voidImage)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "Bad Request";
                })
                .expect(400, end);
        });
        it('should return Error status code 400 if Food Item Price is missing', (end) => {
            request(app).put('/api/v1/foodItems/0')
                .type('JSON')
                .send(test.voidPrice)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.Status = "Bad Request";
                })
                .expect(400, end);
        });
    });
    it('should return Error status code 400 if Food Item Tag is missing', (end) => {
        request(app).post('/api/v1/foodItems/0')
            .type('JSON')
            .send(test.voidTag)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                res.body.Status = "Bad Request";
            })
            .expect(400, end);
    });
        it("should return 400(Bad request, when input data is missing)", (end) => {
            request(app).put('/api/v1/foodItems/0')
                .type('JSON')
                .expect('Content-Type', /json/)
                .expect(400, end);
        });
        it("should return 404(Bad Request, when Food ItemId is undefined)", (end) => {
            request(app).put('/api/v1/foodItems/')
                .type('JSON')
                .send(test.fullItem)
                .expect(function (res) {
                    res.body.status = 'unsuccessful';
                    res.body.status.toLowerCase();
                })
                .expect(400, end);
        });
    });
    describe("Resolve Conflicts", () => {
        it("should return 410(Previous Food Item not found, when memory has no data to modify)", (end) => {
            request(app).put('/api/v1/foodItems/300')
                .type('JSON')
                .send(test.fullItem)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = 'Requested Food Item is no longer available';
                    res.body.success = "false";
                })
                .expect(410, end);
        });
    });

//Tests for the DELETE Route
describe("Validate Delete Route", () => {
    describe("When Food ItemId is correctly supplied", () => {
        it('should return StatusCode 200(Food Item successfully deleted)', (end) => {
            request(app).delete('/api/v1/foodItems/1')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.success = "true";
                    res.body.Status = "Food Item deleted successfuly";
                })
                .expect(200, end)
        });
    });
    describe("When item can not be found in the database", () => {
        it('should return statusCode of 404(Food Item not found)', (end) => {
            request(app).delete('/api/v1/foodItems/300')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.success = "false";
                    res.body.Status = "Food Item Not Found in the Database";
                })
                .expect(404, end)
        });
    });
    describe("When non interger Food Item Id is sent", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).delete('/api/v1/foodItems/A')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
    describe("When Food Item Id is not sent", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).delete('/api/v1/foodItems')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
});