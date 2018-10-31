export default class Controller {
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }

   async get(get_route){
        this.getUrl = this.baseUrl + get_route;
        await fetch(this.getUrl)
        .then((res) => res.json())
        .then((data)=>{
            this.data = data;
        })
        return this.data;
    }

    async post(post_route, method){
        this.postUrl = this.baseUrl + post_route;
        this.method = method
        await fetch(this.postUrl, method)
        .then((res) => res.json())
        .then((data)=>{
            this.data = data;
        })
        return this.data;
    }

    async put(put_route, method){
        this.puUrl = this.baseUrl + put_route;
        this.method = method;
        await fetch(this.putUrl, method)
        .then((res) => res.json())
        .then((data)=>{
            this.data = data;
        })
        return this.data;
    }

    async delete(delete_route, method){
        this.deleteUrl = this.baseUrl + delete_route;
        this.method = method
        await fetch(this.deleteUrl, method)
        .then((res) => res.json())
        .then((data)=>{
            this.data = data;
        })
        return this.data;
    }
}