import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5182/api/";
axios.defaults.withCredentials=true;

axios.interceptors.response.use(response=>{
    return response;
}, (error: AxiosError)=>{
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            toast.error(data.title);
            break;
        
        case 401:
            toast.error(data.title);
            break;

        case 404:
            toast.error(data.title);
            break;

        case 500:
            toast.error(data.title);
            break;  
    
        default:
            break;
    }
    return Promise.reject(error.response)
})

const queries = {
    get: (url: string) => axios.get(url).then((response:AxiosResponse) => response.data),
    post: (url: string, body:{}) => axios.post(url, body).then((response:AxiosResponse) => response.data),
    put: (url: string, body:{}) => axios.put(url,body).then((response:AxiosResponse) => response.data),
    delete: (url: string) => axios.delete(url).then((response:AxiosResponse) => response.data),
}

const Errors = {
    get400Error: () => queries.get("/error/bad-request"),
    get401Error: () => queries.get("/error/unauthorized"),
    get404Error: () => queries.get("/error/not-found"),
    get500Error: () => queries.get("/error/server-error"),
    getValidationError: () => queries.get("/error/validation"),
}

const Catalog = {
    list: () => queries.get("product"),
    details: (id:number) => queries.get(`product/${id}`)
}

const Cart = {
    get: () => queries.get("cart"),
    addItem: (productId:number, quantity = 1) => queries.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
    deleteItem: (productId:number, quantity = 1) => queries.delete(`cart?productId=${productId}&quantity=${quantity}`)
}

const requests = {
    Catalog , Errors, Cart
}

export default requests;