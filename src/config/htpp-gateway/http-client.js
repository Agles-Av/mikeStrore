import axios from "axios";

//archivos.env

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

export const AxiosCliente = axios.create({
    baseURL: SERVER_URL,
    withCredentials:false

});
const requestHandler = (request) => {
    request.headers["Accept"] = "application/json";
    request.headers["Content-Type"] = "application/json";
    const session = JSON.parse(localStorage.getItem("user")) || null;

    if (session?.token) 
        request.headers["Authorization"] = `Bearer ${session.token}`;
        return request
};

//por cada request se le pasa un comportamiento
AxiosCliente.interceptors.request.use(
(req) => requestHandler(req),
(err) => Promise.reject(err)
);

AxiosCliente.interceptors.response.use(
(res) => Promise.resolve(res.data),
(err) => Promise.reject(err)
);

export default AxiosCliente