import axios from '../../services/axios';
import errorHandler from '../../utils/errorHandler';

export default async function getUser() {
  try {
    const response = await axios.get('/user/search');

    return response.data.data;
  } catch(err: unknown) {
    errorHandler(err);
  }
}