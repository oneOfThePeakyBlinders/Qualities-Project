import axios from "axios";
import logger from "./logService";
import {toast} from "react-toastify";
import config from '../config.json';

axios.defaults.baseURL = config.apiEndPoint;
// Это у нас дефолтный адрес для axios, используется он только в том случае, если мы в приложении обращаемся только к бэкенду;
// Благодоря такому подходу в компаненте editQuality нам не нужно писать "config.apiEndPoint + `quality/${id}`";
// Мы можем просто указать `quality/${id}`;


axios.interceptors.response.use((res) => res,
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            logger.log(error)
            toast.error('Something went terribly wrong');
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete,
}

export default httpService;