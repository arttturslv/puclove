import axios from "axios"

async function likingUser(token, id) {
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

/**
 * Calls a function that sends a request than returns true if it's a match.
 * @param {*} token Current user token
 * @param {*} id ID from user how is being liked
 * @returns 
 */
export async function useLikingUserMatch(token, id) {
  if (token !== undefined) {
    try {
      const response = await likingUser(token, id);
      if(response.message == "It's a match!") {
        return true;
      }
      return false;

    } catch (error) {
      throw error;
    }
  }
}