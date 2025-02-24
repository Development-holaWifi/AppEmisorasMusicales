import axios from 'axios';
import {HttpAdapter} from './http.adapter';

export class AxiosAdapter extends HttpAdapter {
  async get(url: string): Promise<any> {
    try {
      const {data} = await axios.get(url);
      return data;
    } catch (error) {
      console.log(error);
      return await axios.get(url);
    }
  }
}
