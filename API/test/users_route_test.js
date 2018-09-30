import request from 'supertest';
import app from '../../server';
import * as test from '../model/user-model';

// Tests for the POST Route
describe('Validate POST Route', () => {
    describe("When Correct input data is supplied", () => {
        it('should be valid /api/v1/users', (end) => {
            request(app).post('/api/v1/users')
                .type("JSON")
                .send(test.fullUser)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.Status = 'User Sent Successfully';
                })
                .expect(201, end)
        });
    });
    describe("When a UserId is sent to a post route", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).post('/api/v1/users/10')
                .type('JSON').send(test.fullUser)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
    describe('Check POST input for Error', () => {
        it('should return Error status code 400 if no data was passed', (end) => {
            request(app).post('/api/v1/users')
                .type('JSON')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.Status = 'unsuccessful';
                    res.body.Status.toLowerCase();
                })
                .expect(400, end);
        });
        it('Should Return Error status code 400 if UserName is missing', (end) => {
            request(app).post('/api/v1/users')
                .type('JSON')
                .send(test.voidName)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = 'Bad Request';
                })
                .expect(400, end);
        });
        it('should return Error status code 400 if userEmail is missing', (end) => {
            request(app).post('/api/v1/users')
                .type('JSON')
                .send(test.voidEmail)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.Status = "Bad Request";
                })
                .expect(400, end);
        });
        it('should return Error status code 400 if userPassword is missing', (end) => {
            request(app).post('/api/v1/users')
                .type('JSON')
                .send(test.voidPassword)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.Status = "Bad Request";
                })
                .expect(400, end);
        });
    });
})

// Tests for the GET Route
describe('Validate GET Route', () => {
    it('should be valid route /api/v1/users returns 200 (users retrieved successfully)', (end) => {
        request(app).get('/api/v1/users')
            .expect("Content-type", /json/)
            .expect(function (res) {
                res.body.success = 'true';
                res.body.Status = "users retrieved successfully";
                res.body.users = test.databaseusers;
            })
            .expect(200, end)
    });
    it('should be valid route /api/v1/users/0 returns 200 (users retrieved successfully)', (end) => {
        request(app).get('/api/v1/users/0')
            .expect("Content-type", /json/)
            .expect(function (res) {
                res.body.success = 'true';
                res.body.Status = "Users retrieved successfully";
                res.body.users = test.firstUser;
            })
            .expect(200, end)
    });
    it('should return error 404(User not found in the database) if database does not have data at that location', (end) => {
        request(app).get('/api/v1/users/2000000')
            .expect('Content-Type', /json/)
            .expect(function (res) {
                res.body.success = "false";
                res.body.status = "User Not Found in the Database";
            })
            .expect(404, end)
    });
    describe("When non interger UserId is sent", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).get('/api/v1/users/A')
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
        it('should be valid route /api/v1/users/0 editted successfully returning status code 200(Update Successful)', (end) => {
            request(app).put('/api/v1/users/0')
                .type('JSON').send(test.fullUser)
                .expect(function (res) {
                    res.body.Status = "Update successful";
                })
                .expect(200, end)
        });
    });
    describe("When non interger UserId is sent", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).put('/api/v1/users/A')
                .type('JSON').send(test.fullUser)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
    
    describe('Check POST input for Error', () => {
        it('should return Error status code 400 if no data was passed', (end) => {
            request(app).put('/api/v1/users')
                .type('JSON')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.Status = 'unsuccessful';
                    res.body.Status.toLowerCase();
                })
                .expect(400, end);
        });
        it('Should Return Error status code 400 if UserName is missing', (end) => {
            request(app).put('/api/v1/users')
                .type('JSON')
                .send(test.voidName)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = 'Bad Request';
                })
                .expect(400, end);
        });
        it('should return Error status code 400 if userEmail is missing', (end) => {
            request(app).put('/api/v1/users')
                .type('JSON')
                .send(test.voidEmail)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.Status = "Bad Request";
                })
                .expect(400, end);
        });
        it('should return Error status code 400 if userPassword is missing', (end) => {
            request(app).put('/api/v1/users')
                .type('JSON')
                .send(test.voidPassword)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.Status = "Bad Request";
                })
                .expect(400, end);
        });
        it("should return 400(Bad request, when input data is missing)", (end) => {
            request(app).put('/api/v1/users/0')
                .type('JSON')
                .send({})
                .expect('Content-Type', /json/)
                .expect(400, end);
        });
        it("should return 404(Bad Request, when UserId is undefined)", (end) => {
            request(app).put('/api/v1/users/')
                .type('JSON')
                .send(test.fullUser)
                .expect(function (res) {
                    res.body.status = 'unsuccessful';
                    res.body.status.toLowerCase();
                })
                .expect(400, end);
        });
    });
    describe("Resolve Conflicts", () => {
        it("should return 410(Previous User not found, when memory has no data to modify)", (end) => {
            request(app).put('/api/v1/users/300')
                .type('JSON')
                .send(test.fullUser)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = 'Requested User is no longer available';
                    res.body.success = "false";
                })
                .expect(410, end);
        });
    });
});

//Tests for the DELETE Route
describe("Validate Delete Route", () => {
    describe("When UserId is correctly supplied", () => {
        it('should return StatusCode 200(User successfully deleted)', (end) => {
            request(app).delete('/api/v1/users/1')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.success = "true";
                    res.body.Status = "User deleted successfuly";
                })
                .expect(200, end)
        });
    });
    describe("When item can not be found in the database", () => {
        it('should return statusCode of 404(User not found)', (end) => {
            request(app).delete('/api/v1/users/300')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.success = "false";
                    res.body.Status = "User Not Found in the Database";
                })
                .expect(404, end)
        });
    });
    describe("When non interger UserId is sent", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).delete('/api/v1/users/A')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
    describe("When User Id is not sent", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).delete('/api/v1/users')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
});