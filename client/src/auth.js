import Controller from './controller';
let controller = new Controller('https://fast-food-fast1.herokuapp.com/api/v1');

export default async (link) => {
    let url = `https://fast-food-fast1.herokuapp.com${link}`;
    let adminUrl= `https://fast-food-fast1.herokuapp.com/admin.html`;
    let token = localStorage.getItem('token');
    let method = {
        method: 'POST',
        headers: {
            'Accept': 'text/plain, application/json, */*',
            'Content-type': 'application/json',
            'x-access-token': token
        }
    };
    try {
        console.log(token);
        const data = await controller.post('/auth', method);
        console.log(data);
    //     if (data.auth === "true") {
    //         localStorage.setItem('token', data.token);
    //     }
    //     if (data.user.user_role === "User"){
    //     window.location.replace(url);
    // } else window.location.replace(adminUrl);
        // window.location.href(link);
    } catch (err) {
        if (err) {
            console.log(data);
            // window.location.replace('https://fast-food-fast1.herokuapp.com/');
            // window.location.href('./index.html');
        }
    }
}