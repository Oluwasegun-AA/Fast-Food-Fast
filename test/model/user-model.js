//instance of Admin token
export const admin_token = {
    expiredAdmin : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJ1c2VyX3Bhc3N3b3JkIjoiJDJhJDEwJDl3VExKbnJ3SHRCbmJCajBXM082aGVHRmRKb1JGNFMzRXBWUjZTNFFoY2dGWW9TMXRYZHllIiwidXNlcl9yb2xlIjoiQWRtaW4iLCJ1c2VyX2VtYWlsIjoiZmZ4a2ZhYWFAYWRkcmVzcy5jb20iLCJ1c2VyX25hbWUiOiJ0ZXN0ZGZzck5hbWUiLCJpYXQiOjE1Mzk4NTA5NzYsImV4cCI6MTUzOTg1NDU3Nn0.LVlWDsGqv9NOVujeFr9At7PwL0kW-PA6bzZkbevwR2Q",
    validAdmin : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJ1c2VyX3Bhc3N3b3JkIjoiJDJhJDEwJGFnVFdjdnVNRERJMHM5Si81c05HNWVieDc3THB1WTFtU2xiZFA3c2ZuekVTOHg1WEx1TVU2IiwidXNlcl9yb2xlIjoiQWRtaW4iLCJ1c2VyX2VtYWlsIjoiZmZ4a2ZhYWFAYWRkcmVzcy5jb20iLCJ1c2VyX25hbWUiOiJ0ZXN0ZGZzck5hbWUiLCJpYXQiOjE1Mzk4NTUzNzcsImV4cCI6MTY2NTk5OTM3N30.s02F2HjYrFnX6ZolxcRZexhgXwIc1uCqweeblGivlo8"
}

// instance of User token
export const user_token = {
    expiredUser : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJ1c2VyX3Bhc3N3b3JkIjoiJDJhJDEwJDl3VExKbnJ3SHRCbmJCajBXM082aGVHRmRKb1JGNFMzRXBWUjZTNFFoY2dGWW9TMXRYZHllIiwidXNlcl9yb2xlIjoiQWRtaW4iLCJ1c2VyX2VtYWlsIjoiZmZ4a2ZhYWFAYWRkcmVzcy5jb20iLCJ1c2VyX25hbWUiOiJ0ZXN0ZGZzck5hbWUiLCJpYXQiOjE1Mzk4NTA5NzYsImV4cCI6MTUzOTg1NDU3Nn0.LVlWDsGqv9NOVujeFr9At7PwL0kW-PA6bzZkbevwR2Q",
    validUser : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJ1c2VyX3Bhc3N3b3JkIjoiJDJhJDEwJDRHRDh0dnE3ckFtSUFidS9valZxSGVhRzVvRE01cWJNZmhWZ1pjaXJKSElzMXVIUHRGeUJPIiwidXNlcl9yb2xlIjoiVXNlciIsInVzZXJfZW1haWwiOiJiYWNrZW5kdGVzdGVyMUBhZGRyZXNzLmNvbSIsInVzZXJfbmFtZSI6ImJhY2tFbmRUZXN0ZXIiLCJpYXQiOjE1Mzk5OTg3MDEsImV4cCI6MTY2NjE0MjcwMX0.Xl2Jm-Iub5YOCZ2JgbYowkOCH5Hen-TZ5HxM8DNZ8Cc",
    valid_inexistingUser : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJ1c2VyX3Bhc3N3b3JkIjoiJDJhJDEwJEhaR0xWM2dOT0FoWkQ5a3J4cWJjak9mbXhNYnJuWjdUZlVtWkdBVTZ4RDM1R2pUVlpHN2FTIiwidXNlcl9yb2xlIjoiVXNlciIsInVzZXJfZW1haWwiOiJ1bmV4aXN0aW5ndXNlckB1c2VyYWRkcmVzcy5jb20iLCJ1c2VyX25hbWUiOiJ1bmV4aXN0aW5ndXNlciIsImlhdCI6MTU0MDAwMjA2NywiZXhwIjo0MDAxNTQwMDAyMDY3fQ.jAb0Wngs_eeeL9j5QMqQk9_aCCbbSACPZztL9qHwCfA"
}

//Model data for a complete user data
export const fullUser = {
    "user_name": "testUser",
    "user_role": "User",
    "user_email": "testUser1@address.com",
    "user_password": "P@ssword"
}

//Model data for a complete user data
export const fullUser2 = {
    "user_name": "testUser123",
    "user_role": "User",
    "user_email": "testUserEmail123@address.com",
    "user_password": "P@ssword"
}

//Model data for login purpose
export const loginUser = {
    "user_name": "backEndTester",
    "user_role": "User",
    "user_email": "backendtester1@address.com",
    "user_password": "backendtester123"
}

//Instance of the database content
export const databaseUsers = [
    {
        "user_id": 1,
        "user_name": "testName",
        "user_role": "User",
        "user_email": "testEmail@address.com",
        "user_password": "$2a$10$J0z2RiL5aydsZ0nPMsnzP.VPrDNtoOdVwuizVEh5Lcee2CLSLy2iC",
        "created_date": "2018-10-18T07:41:21.968Z",
        "modified_date": null
    },
    {
        "user_id": 2,
        "user_name": "tester",
        "user_role": "Admin",
        "user_email": "tester@owner.com",
        "user_password": "$2a$10$7qdGCg3JmA1uKeSBqD7r2.OikOuJQOEpCVdzz3A33mU/1jRPTCeJy",
        "created_date": "2018-10-18T07:41:21.968Z",
        "modified_date": null
    }
]

//Instance of the database userData[1]
export const firstUser = {
    "user_id": 1,
    "user_name": "testName",
    "user_role": "User",
    "user_email": "testEmail@address.com",
    "user_password": "$2a$10$J0z2RiL5aydsZ0nPMsnzP.VPrDNtoOdVwuizVEh5Lcee2CLSLy2iC",
    "created_date": "2018-10-18T07:41:21.968Z",
    "modified_date": null
}