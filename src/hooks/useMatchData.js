import axios from "axios"

async function fetchUserData(token) {
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
    throw error;
  }
}

export async function useMatchData(token) {
  var resposta=null;
  if(token!=undefined) {
  try {
    const userData = await fetchUserData(token);
    
    // Array de promessas para as requisições de imagens
    const imageRequests = userData.map(user => fetchUserImage(user.id));

    // Usa axios.all para lidar com todas as promessas de imagens
    const imageResponses = await axios.all(imageRequests);

    // Adiciona as imagens aos dados dos usuários
    const matchedUsersWithImages = userData.map((user, index) => ({
      ...user,
      image: imageResponses[index],
    }));

    return {
      data: matchedUsersWithImages,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
}
}