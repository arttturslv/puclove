import axios from "axios"
import api from '../api/axiosConfig';

const token = localStorage.getItem("authToken");

async function fetchData() {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/users/matchingUsers', { 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response;
    } catch (er) {
      throw er;
    }
}

export function useMatchData () {
    const resposta = fetchData()
    .then((response) => {
      return {
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        error: error.message, 
      };
    });
    return resposta;
}
