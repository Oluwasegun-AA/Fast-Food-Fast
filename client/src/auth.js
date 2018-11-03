import Controller from './controller';
let controller = new Controller('https://fast-food-fast1.herokuapp.com/api/v1');

export default async (link) => {
    let token = localStorage.getItem('token');
    let method = {
        method: 'POST',
        headers: {
            'Accept': 'text/plain, application/json, */*',
            'Content-type': 'application/json',
            'x-access-token': token
        },
    };
    if (token !== null) {
        try {
            let data = await controller.post('/auth/', method);
            if (data.auth === "true") {
                localStorage.setItem('token', data.token);
            }
            window.location.replace('https://fast-food-fast1.herokuapp.com/front-page.html');
            // window.location.href(link);
        } catch (err) {
            if (err) {
                window.location.replace('https://fast-food-fast1.herokuapp.com/');
                // window.location.href('./index.html');
            }
        }
     } else 
     window.location.replace('https://fast-food-fast1.herokuapp.com/');
    //  window.location.href('./index.html');
}