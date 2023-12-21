import axios from "axios"

async function fetchusersData(token) {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/users/matchingUsers', { 
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data; // Retorna diretamente os dados dos usuários
  } catch (error) {
    throw error;
  }
}

async function fetchUserImage(id) {
  try {
    // Substitua pela sua lógica para obter a imagem usando a URL correta
    const imageUrl = `http://localhost:8080/api/v1/image/filepath/${id}`;
    const response = await axios.get(imageUrl);
    return response.data; // Retorna diretamente os dados da imagem
  } catch (error) {
    throw error
  }
}

export async function useMatchData(token) {
  if (token !== undefined) {
    try {
      const usersData = await fetchusersData(token);
      
      const imageRequests = usersData.map(user => fetchUserImage(user.id));

      const imageResponses = await Promise.allSettled(imageRequests);

      const matchedUsersWithImages = usersData.map((user, index) => {
        if (imageResponses[index].status === 'fulfilled') {
          return {
            ...user,
            image: imageResponses[index].value,
          };
        } else {
          console.error(`Erro ao obter imagem para o usuário ${user.id}:`);
            return {
            ...user,
            image: null, 
          };
        }
      });
      return {
        data: matchedUsersWithImages,
      };
    } catch (error) {
      throw error;
    }
  }
}