import axios from "axios"

async function isMatch(token, id) {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/users/like/${id}`,
      {},  // Corpo da requisição (vazio neste caso)
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      return response.data;
    } catch (error) {
      console.log('error:', error);
    }
  }
export async function useMatchResponse(token, id) {
  if (token !== undefined) {
    try {
      // usersData armazena todos os usuários que possuem interesses em comum
      const matches = await isMatch(token, id);

    return matches
    } catch (error) {
      throw error;
    }
  }
}