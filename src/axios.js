import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://evening-hollows-62807.herokuapp.com/api/polls',
    validateStatus: status=> status >= 200 && status < 300
  });

export default instance;