import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_KEY,
});

class BaseService {
    get(url: string) {
        return axiosInstance.get(url);
    }

    delete(url: string) {
        return axiosInstance.delete(url);
    }

    head(url: string) {
        return axiosInstance.head(url);
    }

    options(url: string) {
        return axiosInstance.options(url);
    }

    post(url: string, data: object = {}) {
        return axiosInstance.post(url, data);
    }

    put(url: string, data: object = {}) {
        return axiosInstance.put(url, data);
    }

    patch(url: string, data = {}) {
        return axiosInstance.patch(url, data);
    }
}

export default BaseService;
