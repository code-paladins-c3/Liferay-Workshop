import axios from 'axios';

class API {
  static async getProducts() {
    const response = await axios.get('/api/products');
    return response.data;
  }
};