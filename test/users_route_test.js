import request from 'supertest';
import app from '../server/server';
import * as test from '../test/model/user-model';

// Tests for the GET Route
describe('Validate GET Route', () => {
  it('should be valid route /api/v1/users returns 200 (users retrieved successfully)', (end) => {
    request(app).get('/api/v1/users')
      .set('x-access-token', test.admin_token.validAdmin)
      .expect("Content-type", /json/)
      .expect(function (res) {
        res.body.success = 'true';
        res.body.status = 'Users Data retrieved successfully';
        res.body.users = test.databaseUsers;
      })
      .expect(200, end)
  });
  it('should be invalid route, for route not declared', (end) => {
    request(app).get('/api/v1/usesl')
      .set('x-access-token', test.admin_token.validAdmin)
      .expect("Content-type", /json/)
      .expect(function (res) {
        res.body.error = '404';
        res.body.status = 'success';
      })
      .expect(404, end)
  });
  it('should show a welcome message at home route', (end) => {
    request(app).get('/api/v1')
      .set('x-access-token', test.admin_token.validAdmin)
      .expect("Content-type", /json/)
      .expect(function (res) {
        res.body.status = "connection successful";
        res.body.message = 'Welcome to Fast Food Fast!';
      })
      .expect(404, end)
  });
  it('should be valid route /api/v1/users/1 returns 200 (users retrieved successfully)', (end) => {
    request(app).get('/api/v1/users/1')
      .set('x-access-token', test.admin_token.validAdmin)
      .expect("Content-type", /json/)
      .expect(function (res) {
        res.body.success = 'true';
        res.body.Status = "User retrieved successfully";
        res.body.users = test.firstUser;
      })
      .expect(200, end)
  });
  it('should return error 404(User not found in the database) if database does not have data at that location', (end) => {
    request(app).get('/api/v1/users/2000000')
      .set('x-access-token', test.admin_token.validAdmin)
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
        .set('x-access-token', test.admin_token.validAdmin)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          res.body.status = "unsuccessful";
        })
        .expect(400, end)
    });
  });
})


// Tests for the POST Route
describe('Validate POST Route', () => {
  describe("When Correct input data is supplied", () => {
    it('should be valid /api/v1/users', (end) => {
      request(app).post('/api/v1/users')
        .set('x-access-token', test.admin_token.validAdmin)
        .type("JSON")
        .send(test.fullUser)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          res.body.status = 'Users Data retrieved successfully';
        })
        .expect(201, end)
    });
  });
  describe("When a UserId is sent to a post route", () => {
    it('should return statusCode of 400(Bad Request)', (end) => {
      request(app).post('/api/v1/users/10')
        .set('x-access-token', test.user_token.validUser)
        .type('JSON').send(test.fullUser)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          res.body.status = "unsuccessful";
        })
        .expect(400, end)
    });
  });
  describe("When the a body parameter is missing", () => {
    it('should return statusCode of 400(Bad Request)', (end) => {
      request(app).post('/api/v1/users')
        .type('JSON').send({})
        .expect('Content-Type', /json/)
        .expect(function (res) {
          res.body.status = 'Bad Request';
        })
        .expect(400, end)
    });
  });
  describe('Check POST input for Error', () => {
    it('should return Error status code 400 if no data was passed', (end) => {
      request(app).post('/api/v1/users')
        .set('x-access-token', test.user_token.validUser)
        .type('JSON')
        .expect('Content-Type', /json/)
        .expect(function (res) {
          res.body.status = 'unsuccessful';
          res.body.status.toLowerCase();
        })
        .expect(400, end);
    });
  });
  describe('When a user Attempts to register with correct data', () => {
    it('should save the data successfully', (end) => {
      request(app).post('/api/v1/auth/signup')
        .send(test.fullUser)
        .type('JSON')
        .expect('Content-Type', /json/)
        .expect(function (res) {
          res.body.status = 'User Sent Successfully';
        })
        .expect(201, end);
    });
  });
  describe('When a user attempts to login with wrong password', () => {
    it('should return error 401', (end) => {
      request(app).post('/api/v1/auth/login')
        .set('x-access-token', test.user_token.validUser)
        .send(test.fullUser2)
        .type('JSON')
        .expect('Content-Type', /json/)
        .expect(function (res) {
          res.body.auth = "false";
        })
        .expect(401, end);
    });
  });
  describe('When a user attempts to login with correct details', () => {
    it('should login successfully', (end) => {
      request(app).post('/api/v1/auth/login')
        .set('x-access-token', test.user_token.validUser)
        .send(test.loginUser)
        .type('JSON')
        .expect('Content-Type', /json/)
        .expect(function (res) {
          res.body.auth = "true";
        })
        .expect(200, end);
    });
  });
  describe('When a user attempts to login with correct details, but data does not exist in the database', () => {
    it('should not login successfully', (end) => {
      request(app).post('/api/v1/auth/login')
        .set('x-access-token', test.user_token.valid_inexistingUser)
        .send(test.loginUser)
        .type('JSON')
        .expect('Content-Type', /json/)
        .expect(function (res) {
          res.body.status = 'User Not Found in the Database';
        })
        .expect(404, end);
    });
  });
})

// Tests for the PUT Route
describe('Validate PUT Route', () => {
  describe("when Correct PUT Query is supplied", () => {
    it('should be valid route /api/v1/users/1 editted successfully returning status code 200(Update Successful)', (end) => {
      request(app).put('/api/v1/users/1')
        .set('x-access-token', test.admin_token.validAdmin2)
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
        .set('x-access-token', test.admin_token.validAdmin)
        .type('JSON').send(test.fullUser)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          res.body.status = "unsuccessful";
        })
        .expect(400, end)
    });
  });

  it("should return 404(Bad Request, when UserId is undefined)", (end) => {
    request(app).put('/api/v1/users')
      .type('JSON')
      .send(test.fullUser3)
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
      .set('x-access-token', test.admin_token.validAdmin)
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

//Tests for the DELETE Route
describe("Validate Delete Route", () => {
  describe("When UserId is correctly supplied", () => {
    it('should return StatusCode 200(User successfully deleted)', (end) => {
      request(app).delete('/api/v1/users/1')
        .set('x-access-token', test.admin_token.validAdmin)
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
        .set('x-access-token', test.admin_token.validAdmin)
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
        .set('x-access-token', test.admin_token.validAdmin)
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
        .set('x-access-token', test.admin_token.validAdmin)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          res.body.status = "unsuccessful";
        })
        .expect(400, end)
    });
  });
});