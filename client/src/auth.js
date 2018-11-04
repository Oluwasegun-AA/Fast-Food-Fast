import Controller from './controller';
let controller = new Controller('https://fast-food-fast1.herokuapp.com/api/v1');

let token = localStorage.getItem('token');
let method = {
    method: 'POST',
    headers: {
        'Accept': 'text/plain, application/json, */*',
        'Content-type': 'application/json',
        'x-access-token': token
    }
};

export default async () => {
    try {
        let data = await controller.post('/auth', method);
        console.log(data);
        if (data.auth === "false") {
            return 'Failed'
        } else if (data.auth === "true") {
            localStorage.setItem('token', data.token);
        }
        if (data.user.user_role === "User") {
            return "User";
        } else return 'Admin';
    } catch (err) {
        if (err) {
            return 'Failed';
        }
    }
}
