import request from 'supertest';
import app from '../server';
import * as test from '../test/model/foodItems-model';
import * as user from '../test/model/user-model';

// Tests for the GET Route
describe('Validate GET Route', () => {
    it('should be valid route /api/v1/menu returns 200 (Food Items retrieved successfully)', (end) => {
        request(app).get('/api/v1/menu')
            .expect("Content-type", /json/)
            .expect(function (res) {
                res.body.success = 'true';
                res.body.Status = "Food Items retrieved successfully";
                res.body.Food_Items = test.databaseItems;
            })
            .expect(200, end)
    });
    it('should be valid route /api/v1/menu/1 returns 200 (foodItems retrieved successfully)', (end) => {
        request(app).get('/api/v1/menu/1')
            .expect("Content-type", /json/)
            .expect(function (res) {
                res.body.success = 'true';
                res.body.Status = "Food Items retrieved successfully";
                res.body.foodItems = test.firstItem;
            })
            .expect(200, end)
    });
    it('should return error 404(Food Item not found in the database) if database does not have data at that location', (end) => {
        request(app).get('/api/v1/menu/2000000')
            .expect('Content-Type', /json/)
            .expect(function (res) {
                res.body.success = "false";
                res.body.status = "Food Item Not Found in the Database";
            })
            .expect(404, end)
    });
    describe("When non interger Food ItemId is sent", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).get('/api/v1/menu/A')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
});

// Tests for the POST Route
describe('Validate POST Route', () => {
    describe("When Correct input data is supplied", () => {
        it('should be valid /api/v1/menu', (end) => {
            request(app).post('/api/v1/menu')
                .set('x-access-token', user.admin_token.validAdmin)
                .send(test.fullItem)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "Item Sent Successfully";
                })
                .expect(201, end);
        });
    });
    describe("When a Food Item Id is sent to a post route", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).post('/api/v1/menu/10')
                .set('x-access-token', user.admin_token.validAdmin)
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
            request(app).post('/api/v1/menu')
                .set('x-access-token', user.admin_token.validAdmin)
                .type('JSON')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.Status = 'unsuccessful';
                    res.body.Status.toLowerCase();
                })
                .expect(400, end);
        });
    });
    describe('Check POST input for Error', () => {
        it('should return Error status code 400 if a wrong data type ID was parsed', (end) => {
            request(app).post('/api/v1/menu')
                .set('x-access-token', user.admin_token.validAdmin)
                .send(test.wrongItemDataType)
                .type('JSON')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.Status = 'unsuccessful';
                    res.body.Status.toLowerCase();
                })
                .expect(400, end);
        });
    });
});


// Tests for the PUT Route
describe('Validate PUT Route', () => {
    describe("when Correct PUT Query is supplied", () => {
        it('should be valid route /api/v1/menu/1 editted successfully returning status code 200(Update Successful)', (end) => {
            request(app).put('/api/v1/menu/1')
                .set('x-access-token', user.admin_token.validAdmin)
                .type('JSON').send(test.fullItem2)
                .expect(function (res) {
                    res.body.Status = "Update successful";
                })
                .expect(200, end)
        });
    });
    describe("When non interger Food ItemId is sent", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).put('/api/v1/menu/A')
                .set('x-access-token', user.admin_token.validAdmin)
                .type('JSON').send(test.fullItem)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });

    describe('Check Put input for Error', () => {
        it('should return Error status code 400 if no data was passed', (end) => {
            request(app).put('/api/v1/menu')
                .type('JSON')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = 'Bad Request';
                    res.body.success = 'false';
                })
                .expect(400, end);
        });
        it('should return Error status code 400 if wrong data type is parsed', (end) => {
            request(app).put('/api/v1/menu')
                .type('JSON')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = 'Bad Request';
                    res.body.success = 'false';
                })
                .expect(400, end);
        });

        it("should return 404(Bad Request, when Food ItemId is undefined)", (end) => {
            request(app).put('/api/v1/menu/')
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
        it(`should return 410(Previous Food Item not found, when memory has no data to modify)`, (end) => {
            request(app).put('/api/v1/menu/300')
                .set('x-access-token', user.admin_token.validAdmin)
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
});


//Tests for the DELETE Route
describe("Validate Delete Route", () => {
    describe("When Food ItemId is correctly supplied", () => {
        it('should return StatusCode 200(Food Item successfully deleted)', (end) => {
            request(app).delete('/api/v1/menu/1')
                .set('x-access-token', user.admin_token.validAdmin)
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
            request(app).delete('/api/v1/menu/300')
                .set('x-access-token', user.admin_token.validAdmin)
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
            request(app).delete('/api/v1/menu/A')
                .set('x-access-token', user.admin_token.validAdmin)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
    describe("When Food Item Id is not sent", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).delete('/api/v1/menu')
                .set('x-access-token', user.admin_token.validAdmin)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
});