import axios from "axios"
import api from '../api/axiosConfig';


async function fetchData() {
    try {
      const response = await axios.get(api + '/endpoint');
      return response;
    } catch (er) {
      throw er;
    }
}
export function useMatchData () {
    const query = fetchData()
    .then((response) => {
      return {
        data: response.data.data, // Acesse os dados na resposta
      };
    })
    .catch((error) => {
      return {
        error: error.message, // Manipule erros, se houver
      };
    });
    return query;
}

/* usando useQuery, tecnicamente typescript
const fetchData = async () => {
    const response = axios.get(api+"/endpoint");
    return response;
}
export function useMatchData () {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['match-data'],
        retry:2
    })
    return {
        ...query,
        data: query.data?.data
    }
}*/