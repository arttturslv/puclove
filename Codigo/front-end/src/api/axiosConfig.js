import axios from "axios";

const token = localStorage.getItem("authToken");

const instance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    "ngrok-skip-browser-warning": "true"
});

const auth = axios.create({
    baseURL: "http://localhost:8080/auth",
    "ngrok-skip-browser-warning": "true"
});

const API = {
    login: (loginInfo) => auth.post('/login', loginInfo),
    register: (registerInfo) => auth.post('/register', registerInfo),
    interests: instance.get('/interests')
};

export default API;