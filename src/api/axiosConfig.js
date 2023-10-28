import axios from "axios"

const token = localStorage.getItem("authToken");

export default axios.create({
    baseURL:"http://localhost:8080/api/v1",
    "ngrok-skip-browser-warning": "true"
});

